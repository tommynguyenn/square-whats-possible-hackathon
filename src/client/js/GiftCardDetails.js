import React from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

export default function GiftCardDetails({ selectedGiftCard }){
    const [amount, setAmount] = React.useState(0);

    console.log('sgc', selectedGiftCard)
    const createCheckout = async () => {
        const response = await axios.post( '/api/v1/coinbase/checkout', { 
            amount, 
            giftCardId: selectedGiftCard.id 
        } );
        if ( response.data.status === 'OK' ) {
            window.location.href = `https://commerce.coinbase.com/checkout/${response.data.data}`;
        } else {
            // handle error
            console.log(response.data.data)
        }
    }

    return (
        <div className="giftBox">
            <h1>GIFT CARD DETAILS</h1>
            <p>details</p>
            { 
                selectedGiftCard &&
                    <div>
                        <TextField label="Amount" type="number" variant="outlined" onChange={e => setAmount(e.target.value)}/>
                        <Button 
                            variant="contained"
                            onClick={
                                selectedGiftCard.state === "PENDING" ? createCheckout
                                : () => {
                                    console.log('load')
                                } 
                            }
                        >
                            {selectedGiftCard.state === "PENDING" ? "Activate" : "Load"}
                        </Button> 
                    </div>
            }
        </div>
    );
}