import {} from 'react';
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom'

import Container from './Container';

import "../styles/navbar.css";

function NavBar() {
    return (
        <>
                <Container classes="navCont justify-between items-center header">
                    <NavLink to="/" className="logo">Logo</NavLink>

                    <nav className='navbar'>
                       <NavLink to="/" className="rot">Home</NavLink>
                       <NavLink to="/problems" className="rot">Problems</NavLink>
                       <NavLink to="/login" className="rot">Login</NavLink>
                    </nav>
                </Container>
        </>
    )
}

/*
<a href="/" className=""> Home </a>
                        <a href="/" className=""> Problems </a>
                        <a href="/" className=""> Login </a>
*/

export default NavBar;