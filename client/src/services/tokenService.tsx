import axios from "axios";

// Non-HTTP Only Cookies
export function getCookie(name: string) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) {
        return match[2];  // Return the cookie value
    }
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
