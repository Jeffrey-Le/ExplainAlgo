import {useEffect, useState} from 'react';
import {useListItemContext} from '../../contexts';

import axios from 'axios';

const useSignInPage = () => {
    const {problems, setList} = useListItemContext();
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
        // Fetch Data
        try {
            const response = await axios.get('http://127.0.0.1:5000/problems?quantity=20'); // Should retreive 20 problems from the list
            setList(response.data); // Set the fetched data in context state
        }
        catch(err) {
            setError('Error Fetching Data'); // Handle Errors
        }

        setLoading(false); // Loading finishes either branch
    };

    fetchData(); // Call Function
        
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

export {useSignInPage};