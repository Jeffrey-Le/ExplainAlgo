import {useRef} from 'react';

import InputBox from "./InputBox"
import Form from './Form';

import { registerAuth } from '../services/authService';

interface SignUpFormProps {
    classes?: string;
}

export default function SignUpForm({classes}: SignUpFormProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    
    const validation = (): boolean => {
        // Validation
        console.log('validation');

        if (!nameRef.current || !passwordRef.current || !emailRef.current || !confirmPasswordRef.current)
            return false;

        const username = nameRef.current?.value.trim();
        const password = passwordRef.current?.value.trim();
        const confirmPassword = confirmPasswordRef.current?.value.trim();
        const email = emailRef.current?.value.trim();
        
        if (username.length < 4) {
            nameRef.current.setCustomValidity('Your Username must be Greater than 3 Charcters');
            nameRef.current.reportValidity();
            return false;
        }

        if (password.length < 8) {
            passwordRef.current.setCustomValidity('Your Password must be Greater than 7 Charcters');
            passwordRef.current.reportValidity();
            return false;
        }
      
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            emailRef.current.setCustomValidity(`{Email is not of correct format. Should be: ${emailPattern}}`);
            emailRef.current.reportValidity();
            return false;
        }

        if (password !== confirmPassword) {
            confirmPasswordRef.current.setCustomValidity('Your Passwords do not match');
            confirmPasswordRef.current.reportValidity();
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

        console.log('handling submit');

        if (!validation())
            return;

        // Handle Submition
        // Sends a Message to Flask Backend
        const newUser = {
            username: nameRef.current?.value || '',
            password: passwordRef.current?.value || '',
            confirmPassword: confirmPasswordRef.current?.value || '',
            email: emailRef.current?.value || ''
        }

        const data = registerAuth({newUser});
      
        console.log(data);
    };



    return (
        <>
            <Form onSubmit={handleSubmit} onClick={handleClick} classes={classes} submitButtonText='Register'>
                <label style={{fontSize: "5vh"}}>Login</label>
                <InputBox label="Name" ref={nameRef} inputEvent={handleInput}/>
                <InputBox label="Password" type='password' ref={passwordRef} inputEvent={handleInput}/>
                <InputBox label="Email" type='email' ref={emailRef} inputEvent={handleInput}/>
            </Form>
        </>
    )
}