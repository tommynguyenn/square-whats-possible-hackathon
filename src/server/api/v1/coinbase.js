const router = require( 'express' ).Router();
const { STATUS_CODES } = require('../../utils/constants');
const Coinbase = require('../../utils/coinbase');
const Square = require('../../utils/square');

router.post('/notification-webhook', async (req, res) => {
	console.log('POST /api/v1/coinbase/notification-webhook called');
	const rawBody = JSON.stringify(req.body);
	const signature = req.headers['x-cc-webhook-signature'];

	const event = await Coinbase.verifyWebhook(rawBody, signature);

	if ( event.status === STATUS_CODES.FAIL ) {
		console.log(event.data)
	}

	switch (event.data.type) {
		case 'charge:pending':
			Coinbase.addPendingTransaction(event.data.data);
			break;
		case 'charge:confirmed':
			const confirmedTransaction = Coinbase.confirmTransaction(event.data.data);

			if ( confirmedTransaction.status === STATUS_CODES.FAIL ) {
				console.log(confirmedTransaction.data)
			} else {
				console.log(`Confirmed charge: ${event.data.data.code} -> ${confirmedTransaction.data.txnCode}`)

				const locations = await Square.getLocations();
				if ( locations.status === STATUS_CODES.FAIL ) {
					return res.json({
						status: STATUS_CODES.FAIL,
						data: 'Failed to get locations from Square.'
					});
				}
				
				const args = [
					// Default location ID
					locations.data[0].id,
					// Gift card ID
					confirmedTransaction.data.giftCardId || 'gftc:1ecf6fb47124481fb2997bf720000589',
					// Payment value
					event.data.data.payments[0].value.local
				]

				const activity = Square.createGiftCardActivity( ...args, req.session.user.email );
				if ( activity.status === STATUS_CODES.FAIL ) {
					return res.json({
						status: STATUS_CODES.FAIL,
						data: 'Failed to create gift card activity in Square.'
					});
				}
			}
			break;
		// case 'charge:failed':
		// 	break;
		default:
			console.log(`Unhandled charge type: ${event.data.type}`);
	}
	res.json({
		status: STATUS_CODES.OK,
		data: event.data.code
	});
});

router.post('/checkout', async (req, res) => {
	console.log('POST /api/v1/coinbase/checkout called');

	const checkoutData = {
		name: `$${req.body.amount} Gift Card to Amazing Store`,
		description: 'Amazing Store - Buy Gift Cards',
		pricing_type: 'fixed_price',
		local_price: {
			amount: req.body.amount,
			currency: 'CAD'
		},
		requested_info: ['name', 'email']
	};

	const checkoutResponse = await Coinbase.createCheckout(checkoutData, req.body.giftCardId);
	if ( checkoutResponse.status === STATUS_CODES.FAIL ) {
		console.log(checkoutResponse.data);
	}

	res.json({
		status: STATUS_CODES.OK,
		data: checkoutResponse.data.id
	});
});

module.exports = router;