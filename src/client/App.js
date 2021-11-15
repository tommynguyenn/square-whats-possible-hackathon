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
	const [giftCards, setGiftCards] = React.useState(null);
	const [selectedGiftCard, setSelectedGiftCard] = React.useState(null);

	const getGCs = async () => {
		await getGiftCards(user.email, setGiftCards)
	}
	
	return (
		<div className="app">
			<Router>
				<Route exact path="/">
					{ !user && <Login setUser={setUser} /> }
					{ user && (
						<React.Fragment>
							<NavBar getGiftCards={() => getGiftCards(user.email, setGiftCards)} user={user} />
							<div className="content">
								<GiftCardContainer giftCards={giftCards} getGiftCards={getGCs} setSelectedGiftCard={setSelectedGiftCard} />
								<GiftCardDetails getGiftCards={getGCs} selectedGiftCard={selectedGiftCard} />
							</div>
						</React.Fragment>
					) }
				</Route>
			</Router>
		</div>
	);
}
