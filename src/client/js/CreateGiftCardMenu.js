import React from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { Add } from '@mui/icons-material'; 
import { createGiftCard, getLocations } from './utils/helpers';

export default function CreateGiftCardMenu({ user, getGiftCards }) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [locations, setLocations] = React.useState([]);
    const open = Boolean(anchorEl);

    const handleClick = (event) => { setAnchorEl(event.currentTarget) };
    const handleClose = () => { setAnchorEl(null) };

    React.useEffect( () => {
        getLocations(setLocations);
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
                <Add />
                Gift Card
            </Button>
            <Menu
                id="create-giftcard-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {
                    locations.length > 0 && locations.map( 
                        location => (
                            <MenuItem 
                                key={location.id} 
                                onClick={() => createGiftCard(location.id, user.email, handleClose, getGiftCards)}
                            >
                                {location.name}
                            </MenuItem>
                        )
                    )
                }
            </Menu>
        </div>
    );
}