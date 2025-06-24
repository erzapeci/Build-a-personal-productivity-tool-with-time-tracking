import axios from 'axios';

const API_URL = 'http://localhost:5003/api/projects';

// Set up axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const createProject = async (projectData) => {
  try {
    const response = await api.post('/', projectData);
    return response.data;
  } catch (error) {
    console.error('Error creating project:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const getProjects = async (userEmail) => {
  try {
    const response = await api.get(`/?userEmail=${userEmail}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching projects:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const updateProject = async (id, projectData) => {
  try {
    const response = await api.put(`/${id}`, projectData);
    return response.data;
  } catch (error) {
    console.error('Error updating project:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};

export const deleteProject = async (id) => {
  try {
    const response = await api.delete(`/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting project:', error.response?.data || error.message);
    throw error.response?.data || error.message;
  }
};