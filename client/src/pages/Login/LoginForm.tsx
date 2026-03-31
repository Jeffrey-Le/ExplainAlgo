import { useRef, useState } from 'react';

import InputBox from "../../components/InputBox"
import Form from '../../components/Form';

import { loginAuth } from '../../services/authService';

import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../contexts/userContext';

interface LoginFormProps {
    classes?: string;
}

export default function LoginForm({classes}: LoginFormProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const userObj = useUserContext();
    
    const validation = (): boolean => {
        if (!nameRef.current || !passwordRef.current)
            return false;
        
        if (nameRef.current.value.length < 3) {
            setError('Username must be at least 3 characters');
            return false;
        }

        if (passwordRef.current.value.length < 8) {
            setError('Password must be at least 8 characters');
            return false;
        }
      
        return true;
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const target = e.currentTarget;
        if (!target.checkValidity())
            target.setCustomValidity('');
        setError(null);  // clear error on input
    }

    const handleClick = (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        console.log('clicked');
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!validation())
            return;

        setLoading(true);

        try {
            const newUser = {
                username: nameRef.current?.value || '',
                password: passwordRef.current?.value || '',
            }

            const data = await loginAuth({ user: newUser });
            userObj.setUser(data?.user);
            navigate('/');

        } catch (err) {
            setError('Invalid username or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit} onClick={handleClick} classes={classes} submitButtonText={loading ? 'Logging in...' : 'Login'}>
                <label style={{fontSize: "5vh"}}>Login</label>
                {error && (
                    <div style={{color: 'red', fontSize: '1.4vh', marginBottom: '0.5rem'}}>
                        {error}
                    </div>
                )}
                <InputBox label="Name" ref={nameRef} inputEvent={handleInput}/>
                <InputBox label="Password" type='password' ref={passwordRef} inputEvent={handleInput} autoComplete="off"/>
            </Form>
        </>
    )
}
