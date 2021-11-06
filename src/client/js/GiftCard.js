import React from 'react';
import { Button } from '@mui/material';

export default function GiftCard( { giftCard }) {
    // TODO: make a function that formats the giftCard.balance_money.amount to a dollar amount. 
    // ^ giftCard.balance_money.amount is currently in cents. eg: 100 == $1.00
	return (
        <div className="box">
            <h2>{giftCard.gan}</h2>
            <p>
                {giftCard.gan_source} {giftCard.state} {giftCard.type} ${giftCard.balance_money.amount} {giftCard.balance_money.currency}
            </p>
        </div>
	);
}