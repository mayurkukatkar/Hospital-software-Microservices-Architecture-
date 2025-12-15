export type TestStatus = 'REQUESTED' | 'SAMPLE_COLLECTED' | 'COMPLETED' | 'CANCELLED';

export interface LabTest {
    id: number;
    testName: string;
    description: string;
    price: number;
}

export interface TestRequest {
    id: number;
    patientId: string; // MRN
    doctorId: number;
    testId: number;
    testName?: string; // Enriched
    status: TestStatus;
    requestDate: string; // LocalDateTime
    result?: string;
}

export interface CreateTestRequest {
    patientId: string;
    doctorId: number;
    testId: number;
}
