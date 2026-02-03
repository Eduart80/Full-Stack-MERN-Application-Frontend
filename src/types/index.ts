import api from './axiosConfig';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  tasks?: Task[]; // Add this line
  createdAt?: string;
  updatedAt?: string;
}
