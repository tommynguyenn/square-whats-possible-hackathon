const { Client, Environment } = require('square');
const { v4: uuidv4 } = require('uuid');
const { STATUS_CODES } = require('./constants');
let app = null;

class Square {
    static init = () => {
        try {
            const config = {
                environment: Environment.Sandbox,
                accessToken: process.env.SQUARE_ACCESS_TOKEN,
            }

            app = new Client(config)
            console.log( `\nConnected to Square environment.` );
        } catch(err) {
            console.log( `\nFailed to connect to Square environment.` );
        }
    }

    static async listGiftCards(customerId) {
        try {
            const defaultParams = [undefined, undefined, undefined, undefined];
            const response = await app.giftCardsApi.listGiftCards( ...defaultParams, customerId );
            const giftCards = JSON.parse(response.body);
            return {
                status: STATUS_CODES.OK,
                data: giftCards.gift_cards
            }
        } catch (err) {
            return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
        }
    }

    static async createGiftCard(locationId) {
        try {
            const response = await app.giftCardsApi.createGiftCard({
                idempotencyKey: uuidv4(),
                locationId,
                giftCard: { type: 'DIGITAL' }
            });
            return {
                status: STATUS_CODES.OK,
                data: response.result.giftCard
            }
        } catch (err) {
            return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
        }   
    }

    static async createGiftCardActivity(locationId, giftCardId, value, userEmail) {
        try {
            const response = await app.giftCardActivitiesApi.createGiftCardActivity({
                idempotencyKey: uuidv4(),
                giftCardActivity: {
                    type: 'ACTIVATE',			    			// ACTIVATE, LOAD, REDEEM
                    locationId,
                    giftCardId, 		                        // ID of gift card
                    activateActivityDetails: {	     			// only present for ACTIVATE type
                        amountMoney: { 
                            amount: Number(value.amount),
                            currency: value.currency
                        }
                    },
                    buyerPaymentInstrumentIds: [ userEmail ]
                }
            });
            return {
                status: STATUS_CODES.OK,
                data: response
            }
        } catch (err) {
            return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
        }
    }
    
    static async searchUser( customerEmail ) {
        try {
            const userSearch = await app.customersApi.searchCustomers({
                limit: 1,
                query: {
                    filter: {
                        emailAddress: {
                            fuzzy: customerEmail
                        }
                    }
                }
            });
            return {
                status: STATUS_CODES.OK,
                data: userSearch.result.customers
            }
        } catch (err) {
            return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
        }
    }

    static async linkCustomerToGiftCard(giftCardId, customerEmail) {
        try {
            const userSearch = await this.searchUser(customerEmail);
            const response = await app.giftCardsApi.linkCustomerToGiftCard(giftCardId, { customerId: userSearch.data[0].id });
            const giftCards = JSON.parse(response.body);

            return {
                status: STATUS_CODES.OK,
                data: giftCards.gift_card
            }
        } catch (err) {
            return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
        }
    }

    static async getLocations() {
        try {
            const locations = await app.locationsApi.listLocations();
            return {
                status: STATUS_CODES.OK,
                data: locations.result.locations
            }
        } catch (err) {
            return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
        }
    }
}

module.exports = Square;