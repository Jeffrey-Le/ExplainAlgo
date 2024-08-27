import {useEffect, useRef} from 'react';

import Card from "./Card"
import InputBox from "./InputBox"
import Form from './Form';

import Button from './Button';

import { loginAuth } from '../services/authService';
import { getCookie, fetchProtectedData} from '../services/tokenService';

interface SignInFormProps {
    classes?: string;
}

export default function SignInForm({classes}: SignInFormProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    const validation = (): boolean => {
        // Validation
        console.log('validation');

        if (!nameRef.current || !passwordRef.current)
            return false;
        
        if (nameRef.current?.value.length < 4) {
            nameRef.current.setCustomValidity('Your Username must be Greater than 3 Charcters');
            nameRef.current.reportValidity();
            return false;
        }

        if (passwordRef.current?.value.length < 8) {
            passwordRef.current.setCustomValidity('Your Password must be Greater than 7 Charcters');
            passwordRef.current.reportValidity();
            return false;
        }
      
        return true;
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.currentTarget;

        if (!target.checkValidity())
            target.setCustomValidity('');
    }

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('clciked');
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validation())
            return;

        // Handle Submition
        // Sends a Message to Flask Backend
        const newUser = {
            username: nameRef.current?.value || '',
            password: passwordRef.current?.value || '',
        }

        const data = loginAuth({newUser});
      
        console.log(data);

        const token = fetchProtectedData();
        console.log(token);
    };



    return (
        <>
            <Form onSubmit={handleSubmit} onClick={handleClick} classes={classes} submitButtonText='Login'>
                <label style={{fontSize: "5vh"}}>Login</label>
                <InputBox label="Name" ref={nameRef} inputEvent={handleInput}/>
                <InputBox label="Password" type='password' ref={passwordRef} inputEvent={handleInput}/>
            </Form>
        </>
    )
}