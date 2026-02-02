import axios from "axios";
import { NetworkError, DataError } from "../Components/ErrorMessage/ErrorMessage";

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});


apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); 
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function getAllProjects(){
    try{
        const respond = await axios(`${import.meta.env.VITE_API_URL}/api/projects`)
        if(!respond){
            throw new NetworkError
        }
        return respond.data
    }catch(error: any){
        console.log({message: error.message})
    }
}