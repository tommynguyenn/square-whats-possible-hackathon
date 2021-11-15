import React from 'react';
import { formatDollarValue } from './utils/helpers';

export default function GiftCard( { giftCard, setSelectedGiftCard }) {
	return (
        <div className="gift-card" onClick={() => setSelectedGiftCard(giftCard)}>
            <h2>{giftCard.gan}</h2>
            <p>
                <span className="gift-card-detail__info-label">State:</span> {giftCard.state}
            </p> 
            <p>
                <span className="gift-card-detail__info-label">Type:</span> {giftCard.type}
            </p>
            <p>
                <span className="gift-card-detail__info-label">Balance:</span> ${formatDollarValue(giftCard.balance_money.amount)} {giftCard.balance_money.currency}
            </p>
        </div>
	);
}
