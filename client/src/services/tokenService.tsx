import axios
 from "axios";
// Non-HTTP Only Cookies
export function getCookie(name: string) {
     // Create a string with all the cookies
     const cookieString = `; ${document.cookie}`;
     // Split the string to find the specific cookie
     const parts = cookieString.split(`; ${name}=`);
     // If the cookie exists, return its value
     if (parts.length === 2) {
        if (parts.length === 2)
            return parts.pop()?.split(';').shift();
     }
     // Return null if the cookie does not exist
     return null;
}

// For HTTPOnly Cookies
export async function fetchProtectedData() {
    try {
        const response = await axios.get('/api/users/protected', { withCredentials: true });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching protected data:', error);
    }
}
