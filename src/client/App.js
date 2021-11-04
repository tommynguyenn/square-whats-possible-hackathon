import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Onboarding from './js/Onboarding';
import SquareBoxModal from './js/SquareBoxModal';
import './css/app.css';

export default function App() {
	return (
		<Router>
			<Route path="/">
				<div className="app">
					<Onboarding />
					
				</div>
				<SquareBoxModal/>
			</Route>
		</Router>
	);
}
