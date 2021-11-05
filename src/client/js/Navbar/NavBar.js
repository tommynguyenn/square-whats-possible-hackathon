import React from 'react';
import { Button } from '@mui/material';
import { MenuItems } from "./MenuItems";
import CreateGiftCardMenu from '../CreateGiftCardMenu';

export default function Navbar({ getGiftCards, user }) {
    const [clicked, setClicked] = React.useState(false);
    const handleClick = () => {
        setClicked(!this.state.clicked);
    }

    return(
        <nav className="NavBarItems">
            <h1 className="navbar-logo">Square</h1>
            <Button variant="contained" onClick={getGiftCards}>Get gift cards</Button>
            <CreateGiftCardMenu user={user} getGiftCards={getGiftCards} />
            <div className="menu-icon">
                
            </div>
            <ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
                {MenuItems.map((item,index) => {
                    return(
                        <li key={index}>
                            <a className={item.cName} href={item.url}>
                                {item.title}
                            </a>
                        </li> 
                    );
                })}
                
            </ul>
        </nav>
    );              
}
