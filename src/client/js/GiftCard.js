import React from 'react';
import { formatDollarValue } from './utils/helpers';

export default function GiftCard( { giftCard, setSelectedGiftCard }) {
	return (
        <div className="gift-card" onClick={() => setSelectedGiftCard(giftCard)}>
            <h2>{giftCard.gan}</h2>
            <p>state: {giftCard.state}</p> 
            <p>type: {giftCard.type}</p>
            <p>balance: ${formatDollarValue(giftCard.balance_money.amount)} {giftCard.balance_money.currency}</p>
        </div>
	);
}
