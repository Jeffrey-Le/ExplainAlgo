import {useRef} from 'react';

import { redirect } from 'react-router-dom';

import InputBox from "../../components/InputBox"
import Form from '../../components/Form';

import { loginAuth } from '../../services/authService';
import { useUserContext } from '../../contexts/userContext';

interface LoginFormProps {
    classes?: string;
}

export default function LoginForm({classes}: LoginFormProps) {
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

        const user = useUserContext();

        if (user)
            return redirect("/home");

        // const token = fetchProtectedData();
        // console.log(token);


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