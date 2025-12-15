import { Navigate, Outlet } from 'react-router-dom';
import { AuthService } from '../services/authService';

export function ProtectedRoute() {
    if (!AuthService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
