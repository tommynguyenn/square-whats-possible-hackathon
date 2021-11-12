import React from 'react';
import GiftCard from './GiftCard'

export default function GiftCardContainer( { giftCards, setSelectedGiftCard }) {
	return (
        <div className="boxWrapper">
            { giftCards.length > 0 && giftCards.map( gc => (
                <GiftCard key={gc.id} giftCard={gc} setSelectedGiftCard={setSelectedGiftCard} />
            ) ) }
        </div>
	);
}
