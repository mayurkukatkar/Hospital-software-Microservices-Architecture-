import { api } from './api';
import { type Appointment, type CreateAppointmentRequest } from '../types/appointment';

const BASE_PATH = '/appointments';

export const AppointmentService = {
    createAppointment: async (appointment: CreateAppointmentRequest): Promise<Appointment> => {
        const response = await api.post<Appointment>(BASE_PATH, appointment);
        return response.data;
    },

    getAppointment: async (id: number): Promise<Appointment> => {
        const response = await api.get<Appointment>(`${BASE_PATH}/${id}`);
        return response.data;
    },

    // In a real app, this would likely take filters (date range, doctor, etc.)
    getAppointmentsByPatient: async (patientId: string): Promise<Appointment[]> => {
        // Assuming we have an endpoint for this, or we might need to filter client side if not
        // The current backend has GET /api/appointments?patientId=...
        const response = await api.get<Appointment[]>(`${BASE_PATH}?patientId=${patientId}`);
        return response.data;
    },

    // For MVP, if we don't have a "get all" endpoint, we might need to add one or mock it.
    // The current backend AppointmentController has getAppointmentById and getAppointments(params).
    // Let's assume GET /api/appointments returns all if no params (or paginated).
    getAllAppointments: async (): Promise<Appointment[]> => {
        const response = await api.get<Appointment[]>(BASE_PATH);
        return response.data;
    }
};
