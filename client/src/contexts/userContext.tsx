import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

type UserContextType = {
    user?: object | null;
    setUser: (user: object | null) => void;
    logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<object|null>(null);

    // Function to retrieve the user data, possibly from a stored token
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/users/'); // Adjust API endpoint as needed
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user', error);
      }
    };

    useEffect(() => {
      fetchUser();
    }, []);

    const logout = async () => {
        try {
          await axios.post('/api/logout');
          setUser(null); // Clear the user context
        } catch (error) {
          console.error('Logout failed', error);
        }
      };
  
    return (
      <UserContext.Provider value={{ user, setUser, logout }}>
        {children}
      </UserContext.Provider>
    );
  };

function useUserContext() {
    const user = useContext(UserContext);

    if (user === undefined) {
        throw new Error("useListItemContext must be used with a ListItemContext");
    }

    return user;
}


export {UserProvider, useUserContext};