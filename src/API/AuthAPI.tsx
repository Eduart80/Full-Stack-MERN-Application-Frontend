import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export async function login(email: string, password: string) {
    try {
        const response = await axios.post(`${API_URL}/api/users/login`, {
            email,
            password
        });
        
// Store token in localStorage
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Login failed');
    }
}

export async function register(name: string, email: string, password: string) {
    try {
        const response = await axios.post(`${API_URL}/api/users/register`, {
            name,
            email,
            password
        });
        
// LocalStorage store
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
}

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
}

export function getToken() {
    return localStorage.getItem('token');
}

export function isAuthenticated() {
    return !!getToken();
}