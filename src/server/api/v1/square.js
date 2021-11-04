const router = require( 'express' ).Router();
const { v4: uuidv4 } = require('uuid');
const { Client, Environment } = require('square');
const CoinbaseClient = require('coinbase').Client;

const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
})

const cbClient = new CoinbaseClient({ 
	apiKey: process.env.CB_API_KEY, 
	apiSecret: process.env.CB_API_SECRET,
	strictSSL: false
});

const listGiftCards = async () => {
	const response = await client.giftCardsApi.listGiftCards();
	// console.log(response);
	return response;
}

const createGiftCard = async ( locationId ) => {
	const response = await client.giftCardsApi.createGiftCard({
		idempotencyKey: uuidv4(),
		locationId,
		giftCard: { type: 'DIGITAL' }
	});
	console.log(response);
}

const createGiftCardActivity = async ( locationId ) => {
	const response = await client.giftCardActivitiesApi.createGiftCardActivity({
		idempotencyKey: uuidv4(),
		giftCardActivity: {
			type: 'ACTIVATE',						// ACTIVATE, LOAD, REDEEM
			locationId,
			giftCardId: 'gftc:1ecf6fb47124481fb2997bf720000589', 		// ID of gift card
			activateActivityDetails: {				// only present for ACTIVATE type
				amountMoney: {
					amount: 1000,
					currency: "CAD"
				}
			},
			buyerPaymentInstrumentIds: [
				'example-1'
			]
		}
	});
	console.log(response);
}

const getAccounts = () => new Promise(function(resolve, reject) {
	cbClient.getAccounts({}, (err, accounts) => {
		if (err) { 
			reject(err);
		} else {
			resolve(accounts.map( acc => ( {
				name: acc.name,
				currency: acc.currency,
				balance: acc.balance,
				id: acc.id
			} ) ) );
		}
	});
});

router.get('/', async (req, res) => {
	console.log('/api/square/ called');

	const response = await listGiftCards();
	// createGiftCard();
	// createGiftCardActivity('LNAMS88P1QWF7');

	// cbClient.getCurrentUser(function(err, user) {
	// 	console.log(user);
	// });
	
	const accounts = await getAccounts();
	console.log(accounts);

	cbClient.getAccount('a4a3a1c5-c3cc-5e0a-aa15-b2f63262655a', function(err, account) {
		console.log(account);
		account.createAddress(null, function(err, address) {
			console.log(address);
		});
	});


	if (response.statusCode === 200) {
		const data = JSON.parse(response.body);
		res.status(200).json(data.gift_cards);	
	}
} );



module.exports = router;
