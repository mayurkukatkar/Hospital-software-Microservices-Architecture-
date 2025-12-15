import axios from 'axios';

// API Gateway URL
const API_BASE_URL = 'http://localhost:8080/api';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to attach auth token (placeholder for now)
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Add a response interceptor to handle errors
api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Handle 401 Unauthorized, etc.
    if (error.response && error.response.status === 401) {
        // Redirect to login or clear token
        console.warn("Unauthorized access");
    }
    return Promise.reject(error);
});
