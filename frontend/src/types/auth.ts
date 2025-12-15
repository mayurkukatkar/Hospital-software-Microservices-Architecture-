export interface AuthResponse {
    token: string;
    accessToken?: string; // For compatibility if API returns accessToken
    userId: string;
    username: string;
    role: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    email: string;
    role: string; // 'DOCTOR', 'ADMIN', 'RECEPTIONIST'
}
