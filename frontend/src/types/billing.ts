export type BillStatus = 'UNPAID' | 'PAID' | 'PARTIALLY_PAID' | 'CANCELLED';
export type PaymentMode = 'CASH' | 'CARD' | 'UPI' | 'INSURANCE';

export interface InvoiceItem {
    description: string;
    amount: number;
}

export interface Invoice {
    id: number;
    patientId: string;
    items: InvoiceItem[];
    totalAmount: number;
    paidAmount: number;
    status: BillStatus;
    issueDate: string; // LocalDateTime
    dueDate: string; // LocalDateTime
}

export interface Payment {
    id: number;
    invoiceId: number;
    amount: number;
    paymentMode: PaymentMode;
    paymentDate: string; // LocalDateTime
    transactionId?: string;
}

export interface CreateInvoiceRequest {
    patientId: string;
    items: InvoiceItem[];
    dueDate?: string;
}

export interface ProcessPaymentRequest {
    invoiceId: number;
    amount: number;
    paymentMode: PaymentMode;
    transactionId?: string;
}
