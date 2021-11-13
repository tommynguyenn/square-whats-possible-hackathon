import React from 'react';
import { Button, TextField } from '@mui/material';
import { performGiftCardAction, testGiftCardAction } from './utils/helpers';

export default function GiftCardDetails({ getGiftCards, selectedGiftCard }){
    const [amount, setAmount] = React.useState(0);

    const activate = async () => {
        performGiftCardAction( amount, selectedGiftCard.id, 'ACTIVATE' );
    }

    const load = async () => {
        performGiftCardAction( amount, selectedGiftCard.id, 'LOAD' );
    }

    const testActivate = async () => {
        testGiftCardAction( amount, selectedGiftCard.id, 'activate', getGiftCards );
    }

    const testLoad = async () => {
        testGiftCardAction( amount, selectedGiftCard.id, 'load', getGiftCards );
    }

    return (
        <div className="gift-card-detail">
            <h1>GIFT CARD DETAILS</h1>
            { 
                selectedGiftCard &&
                    <div>
                        <TextField label="Amount" type="number" variant="outlined" onChange={e => setAmount(e.target.value)}/>
                        <Button 
                            variant="contained"
                            onClick={ selectedGiftCard.state === "PENDING" ? activate : load }
                        >
                            {selectedGiftCard.state === "PENDING" ? "Activate" : "Load"}
                        </Button>
                        <Button 
                            variant="contained"
                            onClick={ selectedGiftCard.state === "PENDING" ? testActivate : testLoad }
                        >
                            {selectedGiftCard.state === "PENDING" ? "Test Activate" : "Test Load"}
                        </Button> 
                    </div>
            }
        </div>
    );
}