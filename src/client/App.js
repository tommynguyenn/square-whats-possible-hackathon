import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Onboarding from './js/Onboarding';
import './css/app.css';

export default function App() {
	return (
		<Router>
			<Route path="/">
				<Onboarding />
			</Route>
		</Router>
	);
}
