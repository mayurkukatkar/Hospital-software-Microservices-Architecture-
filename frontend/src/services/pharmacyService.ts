import { api } from './api';
import { type Medicine, type Prescription, type CreatePrescriptionRequest } from '../types/pharmacy';

const BASE_PATH = '/pharmacy';

export const PharmacyService = {
    // Inventory
    getAllMedicines: async (): Promise<Medicine[]> => {
        const response = await api.get<Medicine[]>(`${BASE_PATH}/medicines`);
        return response.data;
    },

    // Prescriptions
    createPrescription: async (request: CreatePrescriptionRequest): Promise<Prescription> => {
        const response = await api.post<Prescription>(`${BASE_PATH}/prescriptions`, request);
        return response.data;
    },

    getAllPrescriptions: async (): Promise<Prescription[]> => {
        const response = await api.get<Prescription[]>(`${BASE_PATH}/prescriptions`);
        return response.data;
    },

    dispensePrescription: async (id: number): Promise<void> => {
        await api.post(`${BASE_PATH}/prescriptions/${id}/dispense`);
    }
};
