import React from 'react';
import GiftCard from './GiftCard'

export default function GiftCardContainer( { giftCards }) {
	return (
        <div className="boxWrapper">
            { giftCards.map( gc => (
                <GiftCard giftCard={gc} />
            ) ) }
        </div>
	);
}
