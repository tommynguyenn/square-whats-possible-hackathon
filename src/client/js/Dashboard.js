import React from 'react';
import NavBar from './Navbar/NavBar';
import GiftCardContainer from './GiftCardContainer';
import GiftCardDetails from './GiftCardDetails';
import { getGiftCards } from './utils/helpers';
import { Redirect } from 'react-router-dom';

export default function Dashboard({
    user,
    setGiftCards,
    giftCards,
    selectedGiftCard,
    setSelectedGiftCard
}) {
    const getGCs = async () => {
		await getGiftCards(user.email, setGiftCards)
	}

    return user ?
        <React.Fragment>
            <NavBar 
                getGiftCards={
                    () => getGiftCards(user.email, setGiftCards)
                } 
                user={user} 
            />
            <div className="content">
                <GiftCardContainer 
                    giftCards={giftCards} 
                    getGiftCards={getGCs} 
                    selectedGiftCard={selectedGiftCard} 
                    setSelectedGiftCard={setSelectedGiftCard} 
                />
                <GiftCardDetails 
                    getGiftCards={getGCs} 
                    selectedGiftCard={selectedGiftCard} 
                />
            </div>
        </React.Fragment>
    : <Redirect to="/login" />
}