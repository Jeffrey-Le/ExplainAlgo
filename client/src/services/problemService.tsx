import axios from "axios";
import { ProblemType } from "../types/types";

export const fetchProblems = async (quantity: number): Promise<ProblemType[]> => {
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
};

export const fetchProblemByID = async (id: number) => {
    try {
        const response = await axios.get(`/api/problems/findID?id=${id}`);

        if (response.status === 200)
            console.log('Fetching successful:', response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error))
            console.error('Axios error:', error.response?.data);
        
        throw new Error('Failed to fetch problem');
    }
};

export const fetchProblemSolutionByID = async (id: number) => {
    try {
        const response = await axios.get(`/api/problems/findSolID?id=${id}`);

        if (response.status === 200)
                console.log('Fetching successful:', response.data);

        console.log(response.data);

        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error))
            console.error('Axios error:', error.response?.data);
        
        throw new Error('Failed to fetch solution');
    }
};