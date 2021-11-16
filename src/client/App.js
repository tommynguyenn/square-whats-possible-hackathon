import React from 'react';
import { BrowserRouter as Router, Route, useHistory, Redirect } from 'react-router-dom';
import Login from './js/Login';
import Dashboard from './js/Dashboard';
import './css/app.css';

export default function App() {
	const [user, setUser] = React.useState(null);
	const [giftCards, setGiftCards] = React.useState(null);
	const [selectedGiftCard, setSelectedGiftCard] = React.useState(null);
	const history = useHistory();

	function redirect(path) {
		history.push(path);
	}

	return (
		<div className="app">
			<Router>
				<Route exact path="/">
					{ user ? <Dashboard 
						user={user}
						giftCards={giftCards}
						setGiftCards={setGiftCards}
						selectedGiftCard={selectedGiftCard}
						setSelectedGiftCard={setSelectedGiftCard}
					/> : <Login setUser={setUser} redirect={redirect} /> }
				</Route>
			</Router>
		</div>
	);
}
