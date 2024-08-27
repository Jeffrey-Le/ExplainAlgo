import axios from "axios";

interface AuthServiceProps {
    newUser?: object;
}

export const registerAuth = async ({newUser}: AuthServiceProps) => {
    try {
        const response = await axios.post(`/api/users/register`, newUser);

        if (response.status === 200)
            console.log('Registeration successful:', response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error))
            console.error('Axios error:', error.response?.data);

        throw new Error('Failed to Register the User');
    }
}

export const loginAuth = async ({newUser}: AuthServiceProps) => {
    try {
        const response = await axios.post(`/api/users/login`, newUser);

        if (response.status === 200)
            console.log('Login successful:', response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error))
            console.error('Axios error:', error.response?.data);

        throw new Error('Failed to Login the User');
    }
}