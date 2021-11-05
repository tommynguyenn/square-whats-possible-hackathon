require('dotenv').config();

const Firebase = require('./utils/firebase');
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');

const app = express();
Firebase.init();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(cors());
app.use(express.urlencoded({
	extended: true
}));
app.use(express.json());
app.use(session({
	name: 'square-hackathon',
	secret: process.env.SESSION_SECRET,
	secure: !!process.env.HOST_URL.includes('https'),
	//      hr  min  s   ms
	maxAge: 4 * 60 * 60 * 1000,
	resave: false,
	saveUninitialized: false
}));

// Required routes.
const squareRoutes = require('./api/v1/square');
const authRoutes = require('./api/v1/auth');

// Apply required routes to servers
app.use('/api/v1/square', squareRoutes);
app.use('/api/v1/auth', authRoutes);

app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../../public/index.html'));
});

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}`));
