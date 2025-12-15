import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { LabService } from '../services/labService';
import { type LabTest, type CreateTestRequest } from '../types/lab';

interface RequestLabTestModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function RequestLabTestModal({ isOpen, onClose, onSuccess }: RequestLabTestModalProps) {
    const [patientId, setPatientId] = useState('');
    const [selectedTestId, setSelectedTestId] = useState<number | ''>('');
    const [availableTests, setAvailableTests] = useState<LabTest[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            loadTests();
        }
    }, [isOpen]);

    const loadTests = async () => {
        try {
            const data = await LabService.getAllTests();
            setAvailableTests(data);
        } catch (err) {
            console.error("Failed to load lab tests", err);
        }
    };

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const request: CreateTestRequest = {
                patientId,
                doctorId: 1, // Mock
                testId: Number(selectedTestId)
            };

            await LabService.createTestRequest(request);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError('Failed to create test request.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Request Lab Test</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X className="h-6 w-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {error && <div className="text-red-600 text-sm">{error}</div>}

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Patient MRN</label>
                        <input
                            type="text"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                            value={patientId}
                            onChange={e => setPatientId(e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Test Procedure</label>
                        <select
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                            value={selectedTestId}
                            onChange={e => setSelectedTestId(Number(e.target.value))}
                        >
                            <option value="">Select a test...</option>
                            {availableTests.map(test => (
                                <option key={test.id} value={test.id}>
                                    {test.testName} (${test.price})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading || !selectedTestId}
                            className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {loading ? 'Requesting...' : 'Request Test'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
