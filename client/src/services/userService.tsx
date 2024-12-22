import axios from "axios";

export const fetchCurUser = async () => {
    try {
      const response = await axios.get('/api/users/'); // Adjust API endpoint as needed
      console.log('fetched user')
      console.log(response)
      return response.data;
    } catch (error) {
      console.error('Failed to fetch user', error);
    }
  };