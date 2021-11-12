import React from 'react';
import { Button, TextField } from '@mui/material';
import { activateGiftCard, testActivateGiftCard } from './utils/helpers';

export default function GiftCardDetails({ selectedGiftCard }){
    const [amount, setAmount] = React.useState(0);

    const activate = async () => {
        activateGiftCard( amount, selectedGiftCard.id );
    }

    const testActivate = async () => {
        testActivateGiftCard( amount, selectedGiftCard.id );
    }

    const load = async () => {
        console.log('load')
        // const response = await axios.post( '/api/v1/square/load', { 
        //     amount, 
        //     giftCardId: selectedGiftCard.id 
        // } );
        // console.log(response.data);
    }

    const testLoad = async () => {
        console.log('test load')
        // const response = await axios.post( '/api/v1/square/test-load', { 
        //     amount, 
        //     giftCardId: selectedGiftCard.id 
        // } );
        // console.log(response.data);
    }

    return (
        <div className="giftBox">
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