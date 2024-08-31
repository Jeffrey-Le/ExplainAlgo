import {useEffect} from 'react';
import {useListItemContext} from '../../contexts/problemContext';

import { useQuery, useQueryClient } from '@tanstack/react-query';

import { fetchProblems } from '../../services/problemService';

const useProblemsListPage = () => {
    const {setList} = useListItemContext();
    const quantity = 20;

    //const {data, loading, error, fetchData} = useFetch<typeof problems>('/api/problems?quantity=20');
    const { data: newProblems, isError, error, isLoading } = useQuery({
        queryKey: ['problems', quantity],          // First argument: Query key
        queryFn: () => fetchProblems(quantity),          // Second argument: Fetch function
        staleTime: 5 * 60 * 1000, // 5 minutes of fresh data time
        gcTime: 10 * 60 * 1000, // Refteches new cache every 10 minutes of inactive data
      });

    useEffect(() => {
        // Fetch Data
        setList(newProblems);
    }, [newProblems]);

    useEffect(() => {
        // Send Analytics Events
    }, []);

    // Other Effects
    // Probably just rendering effects

    return {newProblems, isLoading, isError, error};
}

const useCachedProblems = (quantity: number) => {
    const queryClient = useQueryClient();
    return queryClient.getQueryData(['problems', quantity]);
}

export {useProblemsListPage, useCachedProblems};