import axios from "axios";

export const fetchProblems = async (quantity: number) => {
    try {
        const response = await axios.get(`/api/problems?quantity=${quantity}`);

        if (response.status === 200)
            console.log('Fetching successful:', response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error))
            console.error('Axios error:', error.response?.data);
        
        throw new Error('Failed to fetch problems');
    }
}