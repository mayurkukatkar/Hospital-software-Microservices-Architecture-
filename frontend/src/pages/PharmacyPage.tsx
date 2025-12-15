import { useEffect, useState } from 'react';
import { Plus, Pill } from 'lucide-react';
import { PharmacyService } from '../services/pharmacyService';
import { type Prescription } from '../types/pharmacy';
import { CreatePrescriptionModal } from '../components/CreatePrescriptionModal';

export function PharmacyPage() {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadPrescriptions();
    }, []);

    const loadPrescriptions = async () => {
        try {
            setLoading(true);
            const data = await PharmacyService.getAllPrescriptions();
            setPrescriptions(data);
        } catch (error) {
            console.error("Failed to load prescriptions", error);
            setPrescriptions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDispense = async (id: number) => {
        if (!confirm('Mark this prescription as dispensed?')) return;
        try {
            await PharmacyService.dispensePrescription(id);
            loadPrescriptions();
        } catch (e) {
            console.error("Failed to dispense", e);
            alert("Failed to dispense prescription");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Pharmacy</h1>
                <button
                    className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    New Prescription
                </button>
            </div>

            <CreatePrescriptionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadPrescriptions}
            />

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {loading ? (
                        <li className="px-6 py-4 text-center text-gray-500">Loading prescriptions...</li>
                    ) : prescriptions.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">No prescriptions found.</li>
                    ) : (
                        prescriptions.map((p) => (
                            <li key={p.id} className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-medium text-primary-600">
                                            Rx #{p.id} - Patient: {p.patientId}
                                        </p>
                                        <div className="ml-2 flex flex-shrink-0">
                                            <p className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${p.status === 'DISPENSED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                                {p.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                <Pill className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                Items: {p.items.length}
                                            </p>
                                        </div>
                                        {p.status === 'PENDING' && (
                                            <button
                                                onClick={() => handleDispense(p.id)}
                                                className="mt-2 sm:mt-0 ml-6 text-sm text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                                            >
                                                Dispense
                                            </button>
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
