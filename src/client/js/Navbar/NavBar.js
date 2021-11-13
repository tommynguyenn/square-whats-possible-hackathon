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
            <h1 className="navbar-logo">Square</h1>
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
