import React from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios';

export default function NavBar(){
    return(
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/project">Project</Link></li>
            <li><Link to="/contact">Contact</Link></li>
        </ul>
    )
}
