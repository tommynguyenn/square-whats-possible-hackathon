const router = require( 'express' ).Router();
const { v4: uuidv4 } = require('uuid');
const axios = require('axios');
const { Client, Environment } = require('square');

const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
})

const listGiftCards = async () => {
	const response = await client.giftCardsApi.listGiftCards();
	console.log(response);
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

router.get('/', async (req, res) => {
	console.log('/api/square/ called');

	const response = await listGiftCards();
	// createGiftCard();
	// createGiftCardActivity('LNAMS88P1QWF7');

	if (response.statusCode === 200) {
		const data = JSON.parse(response.body);
		res.status(200).json(data.gift_cards);	
	}
} );



module.exports = router;
