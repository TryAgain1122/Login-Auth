import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const registerUser = async (firstname: string, lastname: string, email: string, password: string) => {
    return await api.post('/register', {firstname, lastname, email, password});
}

export const loginUser = async (email: String, password: String) => {
    return await api.post('/login', { email, password})
};

export const getDashboard = async () => {
    return await api.get('/dashboard');
}