import React from 'react';
import axios from 'axios';

export default function GiftCardModal(){
    const call = async () => {
        const response = await axios ('/api/v1/square/');
        console.log(response);
    }
    call();
    return(
        <div className="giftBox">
            <h1>GIFT CARD DETAILS</h1>
            <p>details</p>
        </div>
    );
}