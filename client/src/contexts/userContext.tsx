import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type UserContextType = {
    user?: object | null;
    setUser: (user: object | null) => void;
    logout: () => void;
    fetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<object|null>(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // Function to retrieve the user data, possibly from a stored token
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/users/'); // Adjust API endpoint as needed
        setUser(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch user', error);
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchUser();
    }, []);

    useEffect(() => {
      navigate("/");
    }, [user]);

    const logout = async () => {
        try {
          const response = await axios.post('/api/users/logout');
          console.log(response.data);
          setUser(null); // Clear the user context
          
        } catch (error) {
          console.error('Logout failed', error);
        }
      };
  
      if (loading)
        return <div> User Loading </div>

    return (
      <UserContext.Provider value={{ user, setUser, logout, fetchUser }}>
        {children}
      </UserContext.Provider>
    );
  };

function useUserContext() {
    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("useUserContext must be used with a UserContext");
    }

    return user;
}


export {UserProvider, useUserContext};