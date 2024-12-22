import axios from "axios";

interface AuthServiceProps {
user?: object | null;
}

export const registerAuth = async ({user}: AuthServiceProps) => {
    try {
        const response = await axios.post(`/api/users/register`, user);

        if (response.status === 200)
            console.log('Registeration successful:', response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error))
            console.error('Axios error:', error.response?.data);

        throw new Error('Failed to Register the User');
    }
}

export const loginAuth = async ({user}: AuthServiceProps) => {
    try {
        const response = await axios.post(`/api/users/login`, user);

        if (response.status === 200)
            console.log('Login successful:', response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error))
            console.error('Axios error:', error.response?.data);

        throw new Error('Failed to Login the User');
    }
}

export const adminAuth = async ({user}: AuthServiceProps) => {
    try {
        const response = await axios.post(`/api/users/admin`, user);

        if (response.status === 200)
            console.log('Login successful:', response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error))
            console.error('Axios error:', error.response?.data);

        throw new Error('Failed to Login the User');
    }
}