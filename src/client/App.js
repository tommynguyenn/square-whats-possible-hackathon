import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './js/Login';
import GiftCardContainer from './js/GiftCardContainer';
import NavBar from "./js/Navbar/NavBar"
import GiftCardDetails from "./js/GiftCardDetails";
import { getGiftCards } from './js/utils/helpers';
import './css/app.css';

export default function App() {
	const [user, setUser] = React.useState(null);
	const [giftCards, setGiftCards] = React.useState([]);
	const [selectedGiftCard, setSelectedGiftCard] = React.useState(null);

	return (
		<div className="app">
			<NavBar getGiftCards={() => getGiftCards(user.email, setGiftCards)} user={user} />
			<Router>
				<Route exact path="/">
					{ !user && <Login setUser={setUser} /> }
					{ user && (
						<React.Fragment>
							<GiftCardDetails selectedGiftCard={selectedGiftCard} />
							<GiftCardContainer giftCards={giftCards} setSelectedGiftCard={setSelectedGiftCard} />
						</React.Fragment>
					) }
				</Route>
			</Router>
		</div>
	);
}
