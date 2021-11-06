import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './js/Login';
import GiftCardContainer from './js/GiftCardContainer';
import NavBar from "./js/Navbar/NavBar"
import './css/app.css';
import GiftCardDetails from "./js/GiftCardDetails";

export default function App() {
	const [user, setUser] = React.useState(null);
	const [giftCards, setGiftCards] = React.useState([]);

	const getGiftCards = async () => {  
        const response = await axios(`/api/v1/square/giftCards/${user.email}`);
        setGiftCards(response.data.data);
		console.log(response.data.data)
    }

	// const login = async () => {
	// 	const response = await axios.post('/api/v1/auth/login', { email: 'tnguuyen@outlook.com', password: 'test123' } );
	// 	setUser(response.data.data);
	// }

	const login = async () => {
		const response = await axios.post('/api/v1/auth/login', { email: 'tnguuyen@outlook.com', password: 'test123' } );
		setUser(response.data.data);
	}

	const test = async () => {
		const response = await axios('/api/v1/coinbase/createCheckout');
		console.log(`https://commerce.coinbase.com/checkout/${response.data.data.id}`);
	}

	React.useEffect( () => {
		login();
		// test();
	}, [] );

	return (
		<div className="app">
			<NavBar getGiftCards={getGiftCards} user={user} />
			<Router>
				<Route exact path="/">
					{ !user && <Login setUser={setUser} /> }
					{ user && (
						<React.Fragment>
							<GiftCardDetails />
							<GiftCardContainer giftCards={giftCards} />
						</React.Fragment>
					) }
				</Route>
			</Router>
		</div>
	);
}
