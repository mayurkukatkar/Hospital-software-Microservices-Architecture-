import { api } from './api';
import { type LabTest, type TestRequest, type CreateTestRequest } from '../types/lab';

const BASE_PATH = '/lab';

export const LabService = {
    // Methods for Tests Catalog
    getAllTests: async (): Promise<LabTest[]> => {
        const response = await api.get<LabTest[]>(`${BASE_PATH}/tests`);
        return response.data;
    },

    // Methods for Test Requests
    createTestRequest: async (request: CreateTestRequest): Promise<TestRequest> => {
        const response = await api.post<TestRequest>(`${BASE_PATH}/requests`, request);
        return response.data;
    },

    getAllTestRequests: async (): Promise<TestRequest[]> => {
        const response = await api.get<TestRequest[]>(`${BASE_PATH}/requests`);
        return response.data;
    },

    getTestRequestsByPatient: async (patientId: string): Promise<TestRequest[]> => {
        const response = await api.get<TestRequest[]>(`${BASE_PATH}/requests?patientId=${patientId}`);
        return response.data;
    },

    updateTestStatus: async (id: number, status: string, result?: string): Promise<TestRequest> => {
        const response = await api.put<TestRequest>(`${BASE_PATH}/requests/${id}`, { status, result });
        return response.data;
    }
};
