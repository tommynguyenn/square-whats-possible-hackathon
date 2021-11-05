const Client = require('coinbase').Client;

const client = new Client({ 
	apiKey: process.env.CB_API_KEY, 
	apiSecret: process.env.CB_API_SECRET,
	strictSSL: false
});

const getAccounts = () => new Promise((resolve, reject) => {
	client.getAccounts({}, (err, accounts) => {
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

const getAddresses = (account) => new Promise( (resolve, reject) => {
	client.getAccount(account.id, async (err, acc) => {
		if (err) { 
			reject(err);
		} else {
			acc.getAddresses({}, (err, addresses) => {
				if (err) { 
					reject(err);
				} else {
					resolve({
						name: account.name,
						currency: account.currency,
						balance: account.balance,
						id: account.id,
						addresses: addresses.map(address => address.address)
					});
				}
			});
		}
	});
});

const getAccountAddresses = async (accounts) => {
	const addressPromises = accounts.map(async account => await getAddresses(account));
	const results = await Promise.all(addressPromises);
	return results;
};