export interface Medicine {
    id: number;
    name: string;
    description: string;
    price: number;
    stockQuantity: number;
}

export interface PrescriptionItem {
    medicineId: number;
    medicineName?: string;
    dosage: string;
    quantity: number;
}

export interface Prescription {
    id: number;
    patientId: string;
    doctorId: number;
    items: PrescriptionItem[];
    prescriptionDate: string; // LocalDateTime
    status: 'PENDING' | 'DISPENSED';
}

export interface CreatePrescriptionRequest {
    patientId: string;
    doctorId: number;
    items: PrescriptionItem[];
}
