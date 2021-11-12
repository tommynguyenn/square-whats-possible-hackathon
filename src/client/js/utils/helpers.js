import axios from 'axios';

export async function getGiftCards( email, setGiftCards ) {  
    const response = await axios(`/api/v1/square/gift-card/${email}`);
    setGiftCards(response.data.data);
    console.log(response.data.data);
}

export async function login( loginCredentials, setUser, setErrorMsg ) {
    const response = await axios.post('/api/v1/auth/login', loginCredentials);
    if ( response.data.status === 'OK' ) {
        setUser(response.data.data);
    } else {
        setErrorMsg(response.data.data);
    }
}

export async function createGiftCard(locationId, customerEmail, handleClose, getGiftCards) {
    const response = await axios.post(`/api/v1/square/gift-card`, { locationId, customerEmail });
    handleClose();
    await getGiftCards();
    console.log(response);
}

export async function activateGiftCard(amount, giftCardId) {
    const response = await axios.post( '/api/v1/coinbase/checkout', { amount, giftCardId } );
    if ( response.data.status === 'OK' ) {
        window.location.href = `https://commerce.coinbase.com/checkout/${response.data.data}`;
    } else {
        console.log(response.data.data);
    }
}

export async function testActivateGiftCard(amount, giftCardId) {
    const response = await axios.post( '/api/v1/square/test-activate', { amount, giftCardId } );
    console.log(response.data.data);
}

export async function getLocations(setLocations) {
    const response = await axios(`/api/v1/square/locations`);
    if ( response.data.status === 'OK' ) {
        setLocations(response.data.data);
    } else {
        console.log(response.data.data);
    }
}