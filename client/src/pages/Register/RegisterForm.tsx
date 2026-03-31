import { useRef, useState } from 'react';

import InputBox from "../../components/InputBox"
import Form from '../../components/Form';

import { registerAuth } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

interface RegisterFormProps {
    classes?: string;
}

export default function RegisterForm({classes}: RegisterFormProps) {
    const nameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    
    const validation = (): boolean => {
        if (!nameRef.current || !passwordRef.current || !emailRef.current || !confirmPasswordRef.current)
            return false;

        const username = nameRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        const confirmPassword = confirmPasswordRef.current.value.trim();
        const email = emailRef.current.value.trim();
        
        if (username.length < 4) {
            setError('Username must be at least 4 characters');
            return false;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return false;
        }

        if (!/[A-Z]/.test(password)) {
            setError('Password must contain at least one uppercase letter');
            return false;
        }

        if (!/[a-z]/.test(password)) {
            setError('Password must contain at least one lowercase letter');
            return false;
        }

        if (!/[0-9]/.test(password)) {
            setError('Password must contain at least one number');
            return false;
        }

        if (!/[!@#$%^&*]/.test(password)) {
            setError('Password must contain at least one special character (!@#$%^&*)');
            return false;
        }
      
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            setError('Invalid email format');
            return false;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
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
            const user = {
                username: nameRef.current?.value || '',
                password: passwordRef.current?.value || '',
                confirmPassword: confirmPasswordRef.current?.value || '',
                email: emailRef.current?.value || ''
            }

            await registerAuth({ user });
            setSuccess(true);

            // Redirect to login after 2 seconds
            setTimeout(() => navigate('/login'), 2000);

        } catch (err) {
            setError('Registration failed. Username or email may already be taken.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div style={{textAlign: 'center', padding: '2rem'}}>
                <h2>Registration successful!</h2>
                <p>Redirecting to login...</p>
            </div>
        );
    }

    return (
        <>
            <Form onSubmit={handleSubmit} onClick={handleClick} classes={classes} submitButtonText={loading ? 'Registering...' : 'Submit'}>
                <label style={{fontSize: "5vh"}}>Register</label>
                {error && (
                    <div style={{color: 'red', fontSize: '1.4vh', marginBottom: '0.5rem'}}>
                        {error}
                    </div>
                )}
                <InputBox label="Name" ref={nameRef} inputEvent={handleInput}/>
                <InputBox label="Password" type='password' ref={passwordRef} inputEvent={handleInput} autoComplete="off"/>
                <InputBox label="Confirm Password" type='password' ref={confirmPasswordRef} inputEvent={handleInput} autoComplete="off"/>
                <InputBox label="Email" type='email' ref={emailRef} inputEvent={handleInput}/>
            </Form>
        </>
    )
}
