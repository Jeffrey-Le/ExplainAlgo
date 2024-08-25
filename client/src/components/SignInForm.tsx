import {ReactNode, useEffect, useRef, useState} from 'react';

import Container from "./Container"
import Card from "./Card"
import InputBox from "./InputBox"
import Button from "./Button"

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
        
        if (nameRef.current?.value.trim() === '')
        {
            console.log('Error no username');
            return false;
        }
        
        if (nameRef.current.value.length < 4) {
            nameRef.current.setCustomValidity('Your Username must be Greater than 3 Charcters');
            nameRef.current.reportValidity();
            return false;
        }

        if (passwordRef.current?.value.trim() === '')
        {
            console.log('Error no password');
            return false;
        }

        if (passwordRef.current.value.length < 8) {
            passwordRef.current.setCustomValidity('Your Password must be Greater than 7 Charcters');
            passwordRef.current.reportValidity();
            return false;
        }
    
        return true;
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('clciked');

    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validation()) {
            return;
        }

        console.log('submitting');

        // Handle Submition
        // Sends a Message to Flask Backend
      
    };



    return (
        <>
        <form onSubmit={handleSubmit}>
            <Card classes={`flex flex-col gap-10 ${classes}`}>
                <label style={{fontSize: "5vh"}}>Login</label>
                <InputBox label="Name" ref={nameRef}/>
                <InputBox label="Password" ref={passwordRef}/>
                <Button title="Login" clickEvent={handleClick}/>
            </Card>
        </form>
        </>
    )
}