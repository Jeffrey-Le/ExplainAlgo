import {useEffect} from 'react';
import { useQuery } from '@tanstack/react-query';

import { fetchProblemByID, fetchProblemSolutionByID } from '../../services/problemService';
import { useLocation } from 'react-router-dom';

const useProblemScreenPage = () => {
    const location = useLocation();
    const problemID = location.state?.problemID;
    const { data: problem, isError, error, isLoading } = useQuery({
        queryKey: ['data', problemID],          // First argument: Query key
        queryFn: () => fetchProblemByID(problemID),          // Second argument: Fetch function
        staleTime: 5 * 60 * 1000, // 5 minutes of fresh data time
        gcTime: 10 * 60 * 1000, // Refteches new cache every 10 minutes of inactive data
      });

  

    useEffect(() => {
        // Send Analytics Events
    }, []);

    // Other Effects
    // Probably just rendering effects

    return {problem, isLoading, isError, error};
}

const useDisplaySubBox = () => {
    const location = useLocation();
    const problemID = location.state?.problemID;
    const {data: solution, isError, error, isLoading, refetch, isFetching} = useQuery({
        queryKey: ['solutionData', problemID],
        queryFn: () => fetchProblemSolutionByID(problemID),
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        enabled: false,

        
    })

    useEffect(() => {
        // Send Analytics Events
    }, []);

    // Other Effects
    // Probably just rendering effects

    return {solution, isLoading, isError, error, refetch, isFetching};
}

export {useProblemScreenPage, useDisplaySubBox};