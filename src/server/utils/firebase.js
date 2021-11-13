const firebase = require( "firebase/app" );
const { getAuth, signInWithEmailAndPassword, updateProfile, createUserWithEmailAndPassword } = require('firebase/auth');
const { STATUS_CODES } = require('../utils/constants');
let app = null;

class Firebase {
    static init = () => {
        const config = {
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID
        }   

        app = firebase.initializeApp(config);
		console.log( `\nConnected to firebase app ${process.env.FIREBASE_PROJECT_ID}.` );
    }

    static async registerUser( email, password ) {
        try {
            const auth = getAuth();
            const response = await createUserWithEmailAndPassword(auth, email, password);
            
            return {
                status: STATUS_CODES.OK,
                data: response.user
            };
        } catch ( err ) {
            return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
        }
    }

    /**
     * Validates user credentials for access to the app dashboard via the firebase auth api.
     *
     * @param {String} email     The user's email address.
     * @param {String} password  The user's password.
     */
	static async validateUser( email, password ) {
		try {
            const auth = getAuth();
			const response = await signInWithEmailAndPassword( auth, email, password );
            
			return {
                status: STATUS_CODES.OK,
                data: response
            };
		} catch ( err ) {
			return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
		}
	}

    static async updateUserDisplayName( displayName ) {
		try {
            const auth = getAuth();
			const response = await updateProfile(auth.currentUser, { displayName });

			return {
                status: STATUS_CODES.OK,
                data: response
            };
		} catch ( err ) {
			return {
                status: STATUS_CODES.FAIL,
                data: err.message
            };
		}
	}
}

module.exports = Firebase;