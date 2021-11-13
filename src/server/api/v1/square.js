const router = require( 'express' ).Router();
const { STATUS_CODES } = require('../../utils/constants');
const Square = require('../../utils/square');

// Creates a gift card and links it to the user.
router.post('/gift-card', async (req, res) => {
	console.log('POST /api/v1/square/gift-card called');
	const giftCard = await Square.createGiftCard(req.body.locationId);
	if (giftCard.status === STATUS_CODES.FAIL) {
		return res.json({
			status: STATUS_CODES.FAIL,
			data: "Failed to create gift card in Square."
		});
	}

	const linkToCustomer = await Square.linkCustomerToGiftCard(giftCard.data.id, req.body.customerEmail);
	if (linkToCustomer.status === STATUS_CODES.FAIL) {
		return res.json({
			status: STATUS_CODES.FAIL,
			data: "Failed to link gift card to user in Square."
		});
	}

	res.json({
		status: STATUS_CODES.OK,
		data: linkToCustomer.data
	});	
});

// Gets all gift cards linked to a specific email.
router.get('/gift-card/:customerEmail', async (req, res) => {
	console.log(`GET /api/v1/square/gift-card/${req.params.customerEmail} called`);

	const userSearch = await Square.searchUser(req.params.customerEmail);
	if (userSearch.status === STATUS_CODES.FAIL) {
		return res.json({
			status: STATUS_CODES.FAIL,
			data: 'Failed to grab user from Square.'
		});
	}

	if ( !userSearch.data.length ) {
		return res.json({
			status: STATUS_CODES.FAIL,
			data: 'Current user does not exist in Square.'
		});
	}
	
	const userGCs = await Square.listGiftCards(userSearch.data[0].id);
	if (userGCs.status === STATUS_CODES.FAIL) {
		return res.json({
			status: STATUS_CODES.FAIL,
			data: "Failed to grab user's gift cards from Square."
		});
	}

	// Set gift cards for later use.
	req.session.giftCards = userGCs.data;

	res.json({
		status: STATUS_CODES.OK,
		data: userGCs.data
	});	
});

// Gets all locations linked to the business.
router.get('/locations', async (req, res) => {
	console.log('GET /api/v1/square/locations called');

	const locations = await Square.getLocations();
	if ( locations.status === STATUS_CODES.FAIL ) {
		return res.json({
			status: STATUS_CODES.FAIL,
			data: 'Failed to get locations from Square.'
		});
	}

	res.json({
		status: STATUS_CODES.OK,
		data: locations.data
	});	
});

// FOR TESTING PURPOSES
// Performs test action on a gift card with a provided amount.
router.post('/test/:type', async (req, res) => {
	console.log('GET /api/v1/square/test-activate called');

	const locations = await Square.getLocations();
	if ( locations.status === STATUS_CODES.FAIL ) {
		return res.json({
			status: STATUS_CODES.FAIL,
			data: 'Failed to get locations from Square.'
		});
	}

	const args = [
		req.params.type.toUpperCase(),
		locations.data[0].id,
		req.body.giftCardId,
		{ amount: req.body.amount, currency: 'CAD' }
	]

	const activity = await Square.createGiftCardActivity( ...args );
	if ( activity.status === STATUS_CODES.FAIL ) {
		return res.json({
			status: STATUS_CODES.FAIL,
			data: 'Failed to create gift card activity in Square.'
		});
	}

	res.json({
		status: STATUS_CODES.OK,
		data: JSON.parse(activity.data.body)
	});	
});

module.exports = router;
