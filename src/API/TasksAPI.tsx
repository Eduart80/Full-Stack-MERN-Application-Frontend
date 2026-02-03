import axios from "axios"
import { NetworkError, DataError } from "../Components/ErrorMessage/ErrorMessage";

export interface Task {
    _id: string
    title: string
    description?: string
    status: 'To Do' | 'In Progress' | 'Done'
    createdAt?: string
    dueDate?: string
    completed?: boolean;
    projectId: string;
}

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

//get all tasks
export async function getAllTasks(projectId:string):Promise<Task[]> {
    try{
        const response = await apiClient.get(`/api/projects/${projectId}/tasks`)
        return response.data as Task[]
    }catch(error: any){
        if (error.response) {
            throw new DataError(`Server error: ${error.response.status}`);
        } else if (error.request) {
            throw new NetworkError('No response from server. Check CORS and backend.');
        } else {
            throw new Error(error.message);
        }
    }
}
export const getTasksByProject = async (projectId: string): Promise<Task[]> => {
  const response = await apiClient.get(`/api/projects/${projectId}/tasks`);
  return response.data;
};
