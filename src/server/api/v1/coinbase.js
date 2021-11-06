const router = require( 'express' ).Router();
const coinbase = require('coinbase-commerce-node');
const { STATUS_CODES } = require('../../utils/constants');

const coinbaseApiKey = process.env.CC_CB_API_KEY;
const webhookSecret = process.env.CC_SHARED_SECRET;

const client = coinbase.Client;
client.init(coinbaseApiKey);

const checkoutApi = coinbase.resources.Checkout;
const webhookApi = coinbase.Webhook;

router.post('/notification-webhook', async (req, res) => {
	const rawBody = req.rawBody;
	const signature = req.headers['x-cc-webhook-signature'];
	
	try {
		const event = webhookApi.verifyEventBody(rawBody, signature, webhookSecret);
		console.log(event);
		switch (event.type) {
			case 'charge:pending':
				// user paid, but transaction not confirm on blockchain yet
				console.log(event);
				break;
			case 'charge:confirmed':
				// all good, charge confirmed
				console.log(event);
				break;
			case 'charge:failed':
				break;
			default:
				console.log(event.type);
		}

		res.json({
			status: STATUS_CODES.OK,
			data: event.id
		});
	} catch (err) {
		console.log(err);
		res.json({
			status: STATUS_CODES.FAIL,
			data: 'Failed to process Coinbase Commerce event.'
		});
	}
});

router.get('/createCheckout', async (req, res) => {
	console.log('/api/v1/coinbase/notification-webhook called');

	const checkoutData = {
		name: '$50 Gift Card to Amazing Store',
		description: 'Amazing Store - Buy Gift Cards',
		pricing_type: 'fixed_price',
		local_price: {
			amount: '100.00',
			currency: 'USD'
		},
		requested_info: ['name', 'email']
	};

	checkoutApi.create(checkoutData, (err, response) => {
		if (err) console.log(err)
		res.json({
			status: STATUS_CODES.OK,
			data: response
		});
	});
});

module.exports = router;