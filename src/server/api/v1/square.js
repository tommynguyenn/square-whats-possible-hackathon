const router = require( 'express' ).Router();
const { Client, Environment } = require('square');
const { v4: uuidv4 } = require('uuid');
const { STATUS_CODES } = require('../../utils/constants');

const client = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
})

// Gets all gift cards linked to a customer by ID.
const listGiftCards = async ( customerId ) => {
	const defaultParams = [undefined, undefined, undefined, undefined];
	const response = await client.giftCardsApi.listGiftCards( ...defaultParams, customerId );
	const giftCards = JSON.parse(response.body);
	return giftCards.gift_cards;
}

const createGiftCard = async ( locationId ) => {
	const response = await client.giftCardsApi.createGiftCard({
		idempotencyKey: uuidv4(),
		locationId,
		giftCard: { type: 'DIGITAL' }
	});
	return response.result.giftCard;
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
	return response;
}

const linkCustomerToGiftCard = async ( giftCardId, customerEmail ) => {
	const userSearch = await searchUser(customerEmail);
	const response = await client.giftCardsApi.linkCustomerToGiftCard(giftCardId, { customerId: userSearch[0].id });
	const giftCards = JSON.parse(response.body);
	return giftCards.gift_card;
}

// Searches Square for the user by email.
const searchUser = async ( customerEmail ) => {
	const userSearch = await client.customersApi.searchCustomers({
		limit: 1,
		query: {
			filter: {
				emailAddress: {
					fuzzy: customerEmail
				}
			}
		}
	});
	return userSearch.result.customers;
}

// Gets all gift cards linked to a specific email.
router.get('/giftCards/:customerEmail', async (req, res) => {
	console.log('/api/v1/square/giftCards called');

	const userSearch = await searchUser(req.params.customerEmail);
	if ( !userSearch.length ) {
		return res.json({
			status: STATUS_CODES.FAIL,
			data: 'Current user does not exist in Square.'
		});
	}
	
	const userGCs = await listGiftCards(userSearch[0].id);
	res.json({
		status: STATUS_CODES.OK,
		data: userGCs
	});	
});

router.get('/locations', async (req, res) => {
	console.log('/api/v1/square/locations called');

	const locations = await client.locationsApi.listLocations();
	if ( locations.statusCode !== 200 ) {
		return res.json({
			status: STATUS_CODES.FAIL,
			data: 'Failed to get locations.'
		});
	}

	res.json({
		status: STATUS_CODES.OK,
		data: locations.result.locations
	});	
});

router.post('/createGiftCard', async (req, res) => {
	console.log('/api/v1/square/createGiftCard called');
	const giftCard = await createGiftCard(req.body.locationId);
	const linkToCustomer = await linkCustomerToGiftCard(giftCard.id, req.body.customerEmail);
	res.json({
		status: STATUS_CODES.OK,
		data: linkToCustomer
	});	
});

module.exports = router;
