export interface ClinicalNote {
    id?: string;
    patientId: string;
    doctorId: number;
    content: string;
    visitDate: string; // ISO DateTime
    createdAt?: string;
}

export interface CreateNoteRequest {
    patientId: string;
    doctorId: number;
    content: string;
    visitDate?: string;
}
