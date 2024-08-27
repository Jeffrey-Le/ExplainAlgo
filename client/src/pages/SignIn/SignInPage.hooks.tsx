import {useEffect, useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import {useListItemContext} from '../../contexts/contexts';

import axios from 'axios';

const fetchProblems = async (quantity: number) => {
    const response = await axios.get(`/api/problems?quantity=${quantity}`)
    return response.data;
}

const useSignInPage = () => {
    const {setList} = useListItemContext();
    const quantity = 20;

    //const {data, loading, error, fetchData} = useFetch<typeof problems>('/api/problems?quantity=20');
    const { data: newProblems, isError, error, isLoading } = useQuery({
        queryKey: ['problems', quantity],          // First argument: Query key
        queryFn: () => fetchProblems(quantity),          // Second argument: Fetch function
      });

    useEffect(() => {
        
    }, [newProblems]);

    useEffect(() => {
        // Send Analytics Events
    }, []);

    // Other Effects
    // Probably just rendering effects

    if (isLoading)
        return <div> Loading... </div>;

    if (isError)
        return <div> {error.message} </div>;
}

export {useSignInPage};