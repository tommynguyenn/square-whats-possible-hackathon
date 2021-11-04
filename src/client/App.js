import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Onboarding from './js/Onboarding';
import SquareBoxModal from './js/SquareBoxModal';
import NavBar from "./js/Navbar/NavBar"
import './css/app.css';
import GiftCardModal from "./js/GiftCardModal";

export default function App() {
	return (
		<div className="app">
		<NavBar />
		<Router>
			<Route path="/">
					<Onboarding />
					<GiftCardModal/>
					<SquareBoxModal/>
				</Route>
			</Router>
		</div>
	);
}
