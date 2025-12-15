import { api } from './api';
import { type CreatePatientRequest, type Patient } from '../types/patient';

const BASE_PATH = '/patients';

export const PatientService = {
    getAllPatients: async (): Promise<Patient[]> => {
        const response = await api.get<Patient[]>(BASE_PATH);
        return response.data;
    },

    getPatientByMrn: async (mrn: string): Promise<Patient> => {
        const response = await api.get<Patient>(`${BASE_PATH}/${mrn}`);
        return response.data;
    },

    registerPatient: async (patient: CreatePatientRequest): Promise<Patient> => {
        const response = await api.post<Patient>(BASE_PATH, patient);
        return response.data;
    },

    updatePatient: async (mrn: string, patient: Partial<CreatePatientRequest>): Promise<Patient> => {
        const response = await api.put<Patient>(`${BASE_PATH}/${mrn}`, patient);
        return response.data;
    }
};
