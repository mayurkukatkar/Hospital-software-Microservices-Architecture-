export interface Patient {
    mrn: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string;
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    address?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface CreatePatientRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: string; // ISO Date "YYYY-MM-DD"
    gender: 'MALE' | 'FEMALE' | 'OTHER';
    address?: string;
}
