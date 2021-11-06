import React from 'react';
import GiftCard from './GiftCard'

export default function GiftCardContainer( { giftCards }) {
	return (
        <div className="boxWrapper">
            { giftCards.length > 0 && giftCards.map( gc => (
                <GiftCard key={gc.id} giftCard={gc} />
            ) ) }
        </div>
	);
}
