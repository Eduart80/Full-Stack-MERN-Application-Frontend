
export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: string;
  completed?: boolean;
  createdAt?: string;
  updatedAt?: string;
  dueDate?: string;
  projectId?: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface Project {
  _id: string;
  name: string;
  description: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  tasks?: Task[];
  owner?: string | User;
  collaborators?: User[];
  createdAt?: string;
  updatedAt?: string;
}
