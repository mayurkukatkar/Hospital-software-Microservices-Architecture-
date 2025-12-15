import { useEffect, useState } from 'react';
import { Plus, FlaskConical as Flask, Activity } from 'lucide-react';
import { LabService } from '../services/labService';
import { type TestRequest } from '../types/lab';
import { RequestLabTestModal } from '../components/RequestLabTestModal';

export function LabPage() {
    const [requests, setRequests] = useState<TestRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            setLoading(true);
            const data = await LabService.getAllTestRequests();
            setRequests(data);
        } catch (error) {
            console.error("Failed to load lab requests", error);
            setRequests([]);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'COMPLETED': return 'bg-green-100 text-green-800';
            case 'REQUESTED': return 'bg-blue-100 text-blue-800';
            case 'SAMPLE_COLLECTED': return 'bg-yellow-100 text-yellow-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Laboratory</h1>
                <button
                    className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    New Test Request
                </button>
            </div>

            <RequestLabTestModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadRequests}
            />

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {loading ? (
                        <li className="px-6 py-4 text-center text-gray-500">Loading requests...</li>
                    ) : requests.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">No lab requests found.</li>
                    ) : (
                        requests.map((request) => (
                            <li key={request.id} className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-medium text-primary-600">
                                            Test ID: {request.testId} - Patient: {request.patientId}
                                        </p>
                                        <div className="ml-2 flex flex-shrink-0">
                                            <p className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusStyle(request.status)}`}>
                                                {request.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                <Flask className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                Req Date: {new Date(request.requestDate).toLocaleString()}
                                            </p>
                                        </div>
                                        {/* If result exists */}
                                        {request.result && (
                                            <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                <Activity className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" />
                                                Result Available
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
