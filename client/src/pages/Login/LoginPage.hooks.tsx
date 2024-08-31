import {useEffect, useState} from 'react';
import { useQuery } from '@tanstack/react-query';
import {useListItemContext} from '../../contexts/problemContext';

import { fetchProblems } from '../../services/problemService';

const useLoginPage = () => {
  

    useEffect(() => {
        
    }, []);

    useEffect(() => {
        // Send Analytics Events
    }, []);

    // Other Effects
    // Probably just rendering effects

}

export {useLoginPage};