import { api } from './api';
import { type Invoice, type Payment, type CreateInvoiceRequest, type ProcessPaymentRequest } from '../types/billing';

const BASE_PATH = '/billing';

export const BillingService = {
    createInvoice: async (invoice: CreateInvoiceRequest): Promise<Invoice> => {
        const response = await api.post<Invoice>(`${BASE_PATH}/invoices`, invoice);
        return response.data;
    },

    getInvoicesByPatient: async (patientId: string): Promise<Invoice[]> => {
        const response = await api.get<Invoice[]>(`${BASE_PATH}/invoices?patientId=${patientId}`);
        return response.data;
    },

    processPayment: async (payment: ProcessPaymentRequest): Promise<Payment> => {
        const response = await api.post<Payment>(`${BASE_PATH}/payments`, payment);
        return response.data;
    },

    // Fallback if needed
    getAllInvoices: async (): Promise<Invoice[]> => {
        // Assuming API supports fetching all invoices, maybe paginated
        // If not, we might only be able to search by patient.
        // Let's assume for MVP GET /billing/invoices returns list if no param, or we handle empty list
        try {
            const response = await api.get<Invoice[]>(`${BASE_PATH}/invoices`);
            return response.data;
        } catch (e) {
            console.warn("Get all invoices might not be supported without filters");
            return [];
        }
    }
};
