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
            username: name, 
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
      
        const errorMessage = error.response?.data?.message || error.message || 'Registration failed';
        
        if (errorMessage.includes('E11000') || errorMessage.includes('duplicate key')) {
            if (errorMessage.includes('email')) {
                throw new Error('This email is already registered. Please use a different email or try logging in.');
            } else if (errorMessage.includes('username') || errorMessage.includes('name')) {
                throw new Error('This username is already taken. Please choose a different username.');
            } else {
                throw new Error('An account with these details already exists. Please try logging in.');
            }
        }
        
        if (error.response?.status === 400) {
            throw new Error(errorMessage || 'Invalid registration details. Please check your information.');
        }
        
        throw new Error(errorMessage);
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