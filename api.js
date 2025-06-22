const API_BASE_URL = 'http://localhost:3000/api';

export async function searchUser({ email, firstName }) {
    const response = await axios.get(`${API_BASE_URL}/search`, {
        params: {
            email: email || undefined,
            firstName: firstName || undefined
        }
    });
    return response.data;
}
