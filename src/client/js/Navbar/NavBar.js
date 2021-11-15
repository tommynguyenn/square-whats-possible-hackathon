import React from 'react';
import { MenuItems } from "./MenuItems";
import CreateGiftCardMenu from '../CreateGiftCardMenu';

export default function Navbar({ getGiftCards, user }) {
    const [clicked, setClicked] = React.useState(false);
    const handleClick = () => {
        setClicked(!this.state.clicked);
    }

    return(
        <nav className="navBarItems">
            <h1 className="navbar-logo">The Circle Store</h1>
            <ul className='navbar-menu'>
                <CreateGiftCardMenu user={user} getGiftCards={getGiftCards} />
            </ul>
        </nav>
    );              
}
