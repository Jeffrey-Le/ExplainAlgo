import {} from 'react';
import {BrowserRouter, NavLink, Route, Routes} from 'react-router-dom'

import Container from './Container';

import "../styles/navbar.css";

interface NavBarProps {
    color: string;
}

function NavBar({color}: NavBarProps) {
    return (
        <>
                <Container classes={`navCont justify-between items-center header rounded-xl ${color}`}>
                    <NavLink to="/" className="logo">Logo</NavLink>

                    <nav className='navbar'>
                       <NavLink to="/" className="rot">Home</NavLink>
                       <NavLink to="/problems" className="rot">Problems</NavLink>
                       <NavLink to="/login" className="rot">Login</NavLink>
                       <span className='font-medium' style={{marginLeft: 10, fontSize: "18px"}}>/</span>
                       <NavLink to="/register" className="rot" style={{marginLeft: 10}}>Register</NavLink>
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