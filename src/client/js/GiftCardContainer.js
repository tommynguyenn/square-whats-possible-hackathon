import React from 'react';
import GiftCard from './GiftCard'

export default function GiftCardContainer( { giftCards, getGiftCards, selectedGiftCard, setSelectedGiftCard }) {
	
    React.useEffect( () => {
        getGiftCards();
    }, [] );
    
    return (
        <div className="gift-card-container">
            { !giftCards && 'Fetching gift cards...'}
            { giftCards && giftCards.length === 0 && 'No gift cards found.' }
            { 
                giftCards && giftCards.length > 0 && ( 
                    giftCards.map( gc => (
                        <GiftCard key={gc.id} giftCard={gc} selectedGiftCard={selectedGiftCard} setSelectedGiftCard={setSelectedGiftCard} />
                    ) ) 
                )
            }
        </div>
	);
}
