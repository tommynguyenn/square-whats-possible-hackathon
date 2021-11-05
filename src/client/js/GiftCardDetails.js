import { Button } from '@mui/material';
import React from 'react';

export default function GiftCardDetails({ getGiftCards }){
    return(
        <div className="giftBox">
            <h1>GIFT CARD DETAILS</h1>
            <p>details</p>
            <Button variant="contained" onClick={getGiftCards}>Get</Button>
        </div>
    );
}