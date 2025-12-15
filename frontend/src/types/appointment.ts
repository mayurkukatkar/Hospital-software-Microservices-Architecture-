export type AppointmentStatus = 'SCHEDULED' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';

export interface Appointment {
    id: number;
    patientId: string; // MRN
    doctorId: number;
    reason: string;
    appointmentTime: string; // ISO 8601 LocalDateTime
    status: AppointmentStatus;
}

export interface CreateAppointmentRequest {
    patientId: string;
    doctorId: number;
    appointmentTime: string; // ISO 8601 LocalDateTime
    reason: string;
}

// Placeholder for Doctor type until we have a real Doctor Service or use Identity
export interface Doctor {
    id: number;
    name: string;
    specialization: string;
}
