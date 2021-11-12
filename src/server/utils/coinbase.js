const coinbase = require('coinbase-commerce-node');
const checkoutApi = coinbase.resources.Checkout;
const chargeApi = coinbase.resources.Charge;
const webhookApi = coinbase.Webhook; 
const { STATUS_CODES } = require('./constants');
let app = null;

class Coinbase {
    static init() {
        try {
            this.coinbaseApiKey = process.env.CC_CB_API_KEY;
            this.webhookSecret = process.env.CC_CB_SHARED_SECRET;
            this.transactionStack = [];
            this.checkoutMap = [
                {
                    checkoutData: {
                        description: 'Amazing Store - Buy Gift Cards',
                        id: '053c6e9d-536e-4e08-b3ef-ecd055b764a5',
                        local_price: [],
                        name: '$5 Gift Card to Amazing Store',
                        pricing_type: 'fixed_price',
                        requested_info: [],
                        resource: 'checkout'
                    },
                    giftCardId: 'gftc:1fde28fc6d4d405aa2166a18b734c330'
                }
            ];

            app = coinbase.Client;
            app.init(this.coinbaseApiKey);
            console.log( `\nConnected to Coinbase Commerce environment.` );
        } catch (err) {
            console.log( `\nFailed to connect to Coinbase Commerce environment.` );
        }
    }

    static mapTransaction(data) {
        return {
            id: data.id,
            code: data.code,
            timeline: data.timeline,
            payments: data.payments
        }
    }

    static addPendingTransaction(txn) {
        const mappedTxn = this.mapTransaction(txn);
        this.transactionStack.push(mappedTxn);
    }

    static async confirmTransaction(txn) {
        try {
            const mappedTxn = this.mapTransaction(txn);

            const txnIndex = this.transactionStack.findIndex(transaction => transaction.code === mappedTxn.code);
            if (txnIndex === -1) {
                return {
                    status: STATUS_CODES.FAIL,
                    data: `Charge ${mappedTxn.code} not found in transaction stack.`
                };
            }

            this.transactionStack.splice(txnIndex, 1);
            
            const charge = await chargeApi.retrieve(mappedTxn.id);
            // compare checkout ids
            // create test function to test fake payment webhook
            console.log(charge);

            const checkoutIndex = this.checkoutMap.findIndex( checkout => checkout.checkoutData.id === charge.data.checkout.id );
            if (checkoutIndex === -1) {
                return {
                    status: STATUS_CODES.FAIL,
                    data: `Checkout ${mappedTxn.id} not found in checkoutMap stack.`
                };
            }

            return {
                status: STATUS_CODES.OK,
                data: {
                    giftCardId: this.checkoutMap[checkoutIndex].giftCardId,
                    txnCode: mappedTxn.code
                }
            }
        } catch (err) {
            return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
        }
    }

    static async verifyWebhook(rawBody, signature) {
        try {
            const event = webhookApi.verifyEventBody(rawBody, signature, this.webhookSecret);
            return {
                status: STATUS_CODES.OK,
                data: event
            }
        } catch ( err ) {
            return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
        }
    }

    static async createCheckout(checkoutData, giftCardId) {
        try {
            const checkout = await checkoutApi.create(checkoutData);
            this.checkoutMap.push({
                checkoutData: checkout,
                giftCardId
            })
            console.log('checkoutmap', this.checkoutMap);
            return {
                status: STATUS_CODES.OK,
                data: checkout
            }
        } catch ( err ) {
            return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
        }
        
    }
}

module.exports = Coinbase;