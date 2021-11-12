import React from 'react';
import {Button, Menu, MenuItem} from '@mui/material';
import axios from 'axios';

export default function CreateGiftCardMenu({ user, getGiftCards }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [locations, setLocations] = React.useState([]);
    const open = Boolean(anchorEl);

    const getLocations = async () => {
		const response = await axios(`/api/v1/square/locations`);
		setLocations(response.data.data);
	}

    const createGiftCard = async (locationId) => {
		const response = await axios.post(`/api/v1/square/gift-card`, {
            locationId,
            customerEmail: user.email
        });
        handleClose();
        await getGiftCards();
		console.log(response);
	}

    const handleClick = (event) => { setAnchorEl(event.currentTarget) };
    const handleClose = () => { setAnchorEl(null) };

    React.useEffect( () => {
        getLocations();
    }, [] );

    return (
        <div>
            <Button
                id="create-giftcard-button"
                aria-controls="create-giftcard-menu"
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                variant="contained"
            >
                Add a new gift card
            </Button>
            <Menu
                id="create-giftcard-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    locations.length > 0 && locations.map( 
                        location => <MenuItem key={location.id} onClick={() => createGiftCard(location.id)}>{location.name}</MenuItem>
                    )
                }
            </Menu>
        </div>
    );
}