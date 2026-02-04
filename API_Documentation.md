# TaskMaster API Documentation

Base URL: `https://webURL.com/api`

## Authentication

### Register

- **POST** `/auth/register`
- **Body:**  
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**  User redirected to Ligin page
 

### Login

- **POST** `/auth/login`
- **Body:**  
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**  
  ```json
  {
    "token": "jwt-token",
    "user": { "username": "string", "email": "string" }
  }
  ```

---

## Projects

> All endpoints require `Authorization: Bearer <token>` header.

### Get All Projects

- **GET** `/api/projects`
- **Response:**  
  ```json
  [
    {
      "_id": "string",
      "name": "string",
      "description": "string",
      "status": "string",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
  ```

### Create Project

- **POST** `/api/projects`
- **Body:**  
  ```json
  {
    "name": "string",
    "description": "string",
    "status": "string",
    "startDate": "string",
    "endDate": "string"
  }
  ```
- **Response:** Project object

### Get Single Project

- **GET** `/api/projects/:projectId`
- **Response:** Project object

### Update Project

- **PUT** `/api/projects/:projectId`
- **Body:**  
  ```json
  {
    "name": "string",
    "description": "string",
    "status": "string",
    "startDate": "string",
    "endDate": "string"
  }
  ```
- **Response:** Updated project object

### Delete Project

- **DELETE** `/projects/:projectId`
- **Response:**  
  ```json
  { "message": "Project deleted" }
  ```

---

## Tasks

> All endpoints require `Authorization: Bearer <token>` header.

### Get All Tasks for a Project

- **GET** `/api/projects/:projectId/tasks`
- **Response:**  
  ```json
  [
    {
      "_id": "string",
      "title": "string",
      "description": "string",
      "status": "To Do | In Progress | Done",
      "completed": "boolean",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
  ```

### Create Task

- **POST** `/projects/:projectId/tasks`
- **Body:**  
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "To Do | In Progress | Done"
  }
  ```
- **Response:** Task object

### Update Task

- **PUT** `/tasks/:taskId`
- **Body:**  
  ```json
  {
    "title": "string",
    "description": "string",
    "status": "To Do | In Progress | Done",
    "completed": "boolean"
  }
  ```
- **Response:** Updated task object

### Delete Task

- **DELETE** `/tasks/:taskId`
- **Response:**  
  ```json
  { "message": "Task deleted" }
  ```

---

## Error Responses

- All errors return:
  ```json
  { "error": "Error message" }
  ```

---

## Notes

- All endpoints require authentication except `/auth/register` and `/auth/login`.
- Users can only access and modify their own projects and tasks.
