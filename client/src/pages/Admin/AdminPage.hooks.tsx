import { useEffect } from "react";

import { useQuery } from "@tanstack/react-query";

import { adminAuth } from "../../services/authService";

import { useUserContext } from "../../contexts/userContext";


const useAdminPage = () => {
    const userObj = useUserContext();

    

    const { data: role, isError, error, isLoading } = useQuery({
        queryKey: ['role', userObj],          // First argument: Query key
        queryFn: () => adminAuth({user: userObj?.user}),          // Second argument: Fetch function
        staleTime: 5 * 60 * 1000, // 5 minutes of fresh data time
        gcTime: 10 * 60 * 1000, // Refteches new cache every 10 minutes of inactive data
      });

      
    useEffect(() => {
        // Fetch Data
        console.log(userObj.user);
    }, [role, userObj]);

    useEffect(() => {
        // Send Analytics Events
    }, []);

    // Other Effects
    // Probably just rendering effects

    return {role, isLoading, isError, error};
}

export default useAdminPage;