import {useEffect, useState} from 'react';
import {useListItemContext} from '../../contexts';

import axios from 'axios';

const useProblemScreenPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch Data
    }, []);

    useEffect(() => {
        // Send Analytics Events
    }, []);

    // Other Effects
    // Probably just rendering effects

    if (loading)
        return <div> Loading... </div>;

    if (error)
        return <div> {error} </div>;
}

export {useProblemScreenPage};