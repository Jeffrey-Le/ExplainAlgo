import {useEffect} from 'react';
import axios from 'axios';

const useProblemsListPage = () => {
    useEffect(() => {
        // Fetch Data
        axios.get("https://URL");
    }, []);

    useEffect(() => {
        // Send Analytics Events
    }, []);

    // Other Effects
    // Probably just rendering effects
}

export {useProblemsListPage};