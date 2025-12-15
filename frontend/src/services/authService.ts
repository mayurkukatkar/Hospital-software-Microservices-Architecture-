import axios from 'axios';
import { type LoginRequest, type RegisterRequest, type AuthResponse } from '../types/auth';

const AUTH_API_URL = 'http://localhost:8080/api/auth';

// We create a separate instance for auth to avoid circular dependencies or interceptor issues if needed
const authApi = axios.create({
    baseURL: AUTH_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const AuthService = {
    login: async (credentials: LoginRequest): Promise<AuthResponse> => {
        const response = await authApi.post<AuthResponse>('/token', credentials);
        if (response.data.token || response.data.accessToken) {
            localStorage.setItem('token', response.data.token || response.data.accessToken || '');
        }
        return response.data;
    },

    register: async (data: RegisterRequest): Promise<string> => {
        const response = await authApi.post<string>('/register', data);
        return response.data;
    },

    logout: () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    },

    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    }
};
