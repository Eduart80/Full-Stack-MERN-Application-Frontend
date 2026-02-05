import axios from "axios";

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

// Search for users by email
export async function searchUserByEmail(email: string) {
    try {
        const response = await apiClient.get(`/api/users/search?email=${email}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to search users');
    }
}

// Add collaborator to project
export async function addCollaborator(projectId: string, userId: string) {
    try {
        const response = await apiClient.post(`/api/projects/${projectId}/collaborators`, { userId });
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to add collaborator');
    }
}

// Remove collaborator from project
export async function removeCollaborator(projectId: string, userId: string) {
    try {
        const response = await apiClient.delete(`/api/projects/${projectId}/collaborators/${userId}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to remove collaborator');
    }
}

// Get project collaborators
export async function getCollaborators(projectId: string) {
    try {
        const response = await apiClient.get(`/api/projects/${projectId}/collaborators`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || 'Failed to fetch collaborators');
    }
}
