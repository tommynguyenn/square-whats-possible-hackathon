import React from 'react';
import { Button, TextField, InputAdornment } from '@mui/material';
import AttachMoney from '@mui/icons-material/AttachMoney';
import { formatDollarValue, performGiftCardAction, testGiftCardAction } from './utils/helpers';

export default function GiftCardDetails({ getGiftCards, selectedGiftCard }){
    const [amount, setAmount] = React.useState(0);
    const [error, setError] = React.useState(false);
    const [helperText, setHelperText] = React.useState('');

    

    const validateAmount = (callback) => {
        if ( amount === 0 ) {
            setError(true);
            setHelperText('Please enter a valid dollar value.');
            return;
        }
        setError(false);
        setHelperText('');
        callback();
    }

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
            <h1>Gift Card Details</h1>
            { !selectedGiftCard && 'Please select a gift card.' }
            { 
                selectedGiftCard &&
                    <React.Fragment>
                        <div className="gift-card-detail__info">
                            <p>
                                <span className="gift-card-detail__info-label">Gift Card Account Number:</span> {selectedGiftCard.gan}
                            </p>
                            <p>
                                <span className="gift-card-detail__info-label">State:</span> {selectedGiftCard.state}
                            </p>
                            <p>
                                <span className="gift-card-detail__info-label">Type:</span> {selectedGiftCard.type}
                            </p>
                            <p>
                                <span className="gift-card-detail__info-label">Balance:</span> ${formatDollarValue(selectedGiftCard.balance_money.amount)} {selectedGiftCard.balance_money.currency}
                            </p>
                        </div>

                        <p className="gift-card-detail__info gift-card-detail__info-label">Please enter the amount you would like to deposit:</p>
                        <div className="gift-card-detail__cta">
                            <TextField 
                                error={error}
                                type="number" 
                                variant="outlined" 
                                onChange={e => setAmount(e.target.value)}
                                helperText={helperText}
                                InputProps={{
                                    startAdornment: (
                                      <InputAdornment position="start">
                                        <AttachMoney />
                                      </InputAdornment>
                                    ),
                                }}
                            />
                            <Button 
                                variant="contained"
                                onClick={ selectedGiftCard.state === "PENDING" ? () => validateAmount(activate) : () => validateAmount(load) }
                            >
                                {selectedGiftCard.state === "PENDING" ? "Activate" : "Load"}
                            </Button>
                            <Button 
                                variant="outlined"
                                onClick={ selectedGiftCard.state === "PENDING" ? () => validateAmount(testActivate) : () => validateAmount(testLoad) }
                            >
                                {selectedGiftCard.state === "PENDING" ? "Test Activate" : "Test Load"}
                            </Button> 
                        </div>
                    </React.Fragment>
            }
        </div>
    );
}