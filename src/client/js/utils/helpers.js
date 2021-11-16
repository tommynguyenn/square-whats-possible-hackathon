import axios from 'axios';

const STATUS_CODES = {
    OK: 'OK',
    FAIL: 'FAIL'
}

export async function login( loginCredentials, setUser, setFeedbackMsg, redirect ) {
    const response = await axios.post('/api/v1/auth/login', loginCredentials);
    if ( response.data.status === STATUS_CODES.OK ) {
        setUser(response.data.data);
        redirect('/dashboard');
    } else {
        setFeedbackMsg(response.data.data);
    }
}

export async function register( loginCredentials, setFeedbackMsg ) {
    const response = await axios.post('/api/v1/auth/register', loginCredentials);
    if ( response.data.status === STATUS_CODES.OK ) {
        setFeedbackMsg('Account created! Please attempt login in a few seconds.');
    } else {
        setFeedbackMsg(response.data.data);
    }
}

export async function getLocations( setLocations ) {
    const response = await axios(`/api/v1/square/locations`);
    if ( response.data.status === STATUS_CODES.OK ) {
        setLocations(response.data.data);
    } else {
        console.log(response.data.data);
    }
}

export async function getGiftCards( email, setGiftCards ) {  
    const response = await axios(`/api/v1/square/gift-card/${email}`);
    if ( response.data.status === STATUS_CODES.OK ) {
        setGiftCards(response.data.data);
    } else {
        console.log(response.data.data);
    }
}

export async function createGiftCard( locationId, customerEmail, handleClose, getGCs ) {
    const response = await axios.post(`/api/v1/square/gift-card`, 
        { locationId, customerEmail }
    );
    if ( response.data.status === STATUS_CODES.OK ) {
        handleClose();
        await getGCs();
    } else {
        console.log(response.data.data);
    }
}

export async function performGiftCardAction( amount, giftCardId, action ) {
    const response = await axios.post( '/api/v1/coinbase/checkout', 
        { amount, giftCardId, type: action } 
    );
    if ( response.data.status === STATUS_CODES.OK ) {
        window.location.href = `https://commerce.coinbase.com/checkout/${response.data.data}`;
    } else {
        console.log(response.data.data);
    }
}

export async function testGiftCardAction( amount, giftCardId, action, getGCs ) {
    const response = await axios.post( `/api/v1/square/test/${action}`, 
        { amount, giftCardId } 
    );
    if ( response.data.status === STATUS_CODES.OK ) {
        await getGCs();
    } else {
        console.log(response.data.data);
    }
}

export function formatDollarValue(value) {
    return (value / 100).toFixed(2);
}