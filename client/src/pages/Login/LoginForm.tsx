import { useRef, useState } from 'react';

import InputBox from "../../components/InputBox"
import Form from '../../components/Form';

import { loginAuth } from '../../services/authService';

import { useNavigate, useSearchParams } from 'react-router-dom';
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
    const [searchParams] = useSearchParams();
    const userObj = useUserContext();

    // Show success message if redirected from email verification
    const justVerified = searchParams.get('verified') === 'true';
    
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
        setError(null);
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

        } catch (err: any) {
            // 403 = unverified email, 401 = wrong credentials
            const status = err?.response?.status;
            if (status === 403) {
                setError('Please verify your email before logging in. Check your inbox for the verification link.');
            } else {
                setError('Invalid username or password');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Form onSubmit={handleSubmit} onClick={handleClick} classes={classes} submitButtonText={loading ? 'Logging in...' : 'Login'}>
                <label style={{fontSize: "5vh"}}>Login</label>

                {justVerified && (
                    <div style={{color: 'green', fontSize: '1.4vh', marginBottom: '0.5rem'}}>
                        Email verified successfully! You can now log in.
                    </div>
                )}

                {error && (
                    <div style={{color: 'red', fontSize: '1.4vh', marginBottom: '0.5rem'}}>
                        {error}
                    </div>
                )}

                <div style={{fontSize: '1.2vh', color: '#666', marginBottom: '0.5rem'}}>
                    Please verify your email before logging in.
                </div>

                <InputBox label="Name" ref={nameRef} inputEvent={handleInput}/>
                <InputBox label="Password" type='password' ref={passwordRef} inputEvent={handleInput} autoComplete="off"/>
            </Form>
        </>
    )
}