import {useEffect} from 'react';
import {useListItemContext} from '../../contexts/contexts';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { fetchProblems } from '../../services/problemService';

const useProblemsListPage = () => {
    const {setList} = useListItemContext();
    const quantity = 20;

    //const {data, loading, error, fetchData} = useFetch<typeof problems>('/api/problems?quantity=20');
    const { data: newProblems, isError, error, isLoading } = useQuery({
        queryKey: ['problems', quantity],          // First argument: Query key
        queryFn: () => fetchProblems(quantity),          // Second argument: Fetch function
      });

    useEffect(() => {
        // Fetch Data
        //fetchData('GET', null, setList); // Pass the context's setData as the onSuccess callback
        setList(newProblems);
    }, []);

    useEffect(() => {
        // Send Analytics Events
    }, []);

    // Other Effects
    // Probably just rendering effects

    // if (loading)
    //     return <div> Loading... </div>;

    // if (error)
    //     return <div> {error} </div>;

    return {newProblems, isLoading, isError, error};
}

export {useProblemsListPage};