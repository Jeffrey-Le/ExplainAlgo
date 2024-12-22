import {NavLink} from 'react-router-dom'

import Container from './Container';

import "../styles/navbar.css";
import { useUserContext } from '../contexts/userContext';
import { UserType } from '../types/types';
interface NavBarProps {
    color: string;
}

function NavBar({color}: NavBarProps) {
    const userObj = useUserContext();

    const user: UserType = userObj?.user as UserType;

    return (
        <>
                <Container classes={`navCont justify-between items-center header rounded-xl ${color}`}>
                    <NavLink to="/" className="logo">Logo</NavLink>

                    <nav className='navbar'>
                       <NavLink to="/" className="rot">Home</NavLink>
                       <NavLink to="/problems" className="rot">Problems</NavLink>
                       { user ? <NavLink to="/" onClick={() => {userObj.logout();}} className="rot">Logout</NavLink>:
                        <>
                            <NavLink to="/login" className="rot">Login</NavLink>
                            <span className='font-medium' style={{marginLeft: 10, fontSize: "18px"}}>/</span>
                            <NavLink to="/register" className="rot" style={{marginLeft: 10}}>Register</NavLink>
                            </>
                        }
                       <NavLink to="/admin" className="rot">Admin</NavLink>
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