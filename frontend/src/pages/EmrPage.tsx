import { useState } from 'react';
import { Plus, Search, FileText } from 'lucide-react';
import { EmrService } from '../services/emrService';
import { type ClinicalNote } from '../types/emr';
import { ClinicalNoteModal } from '../components/ClinicalNoteModal';

export function EmrPage() {
    const [patientId, setPatientId] = useState('');
    const [notes, setNotes] = useState<ClinicalNote[]>([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSearch = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!patientId.trim()) return;

        setLoading(true);
        setSearched(true);
        try {
            const data = await EmrService.getNotesByPatient(patientId);
            setNotes(data);
        } catch (error) {
            console.error("Failed to load notes", error);
            setNotes([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Electronic Medical Records</h1>
                <button
                    className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Add Note
                </button>
            </div>

            <ClinicalNoteModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={() => handleSearch()} // Refresh if we have a patient selected
                defaultPatientId={patientId}
            />

            {/* Patient Search */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <form onSubmit={handleSearch} className="flex gap-4 items-end">
                    <div className="flex-1 max-w-md">
                        <label htmlFor="patient-search" className="block text-sm font-medium text-gray-700">Search Patient by MRN</label>
                        <div className="mt-1 relative rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                name="patient-search"
                                id="patient-search"
                                className="block w-full rounded-md border-gray-300 pl-10 focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                                placeholder="Enter MRN (e.g. PAT-2023-001)"
                                value={patientId}
                                onChange={(e) => setPatientId(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={loading || !patientId}
                        className="inline-flex justify-center rounded-md border border-transparent bg-secondary-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 disabled:opacity-50"
                    >
                        {loading ? 'Searching...' : 'View Records'}
                    </button>
                </form>
            </div>

            {/* Results */}
            {searched && (
                <div className="space-y-4">
                    <h2 className="text-lg font-medium text-gray-900">Clinical Notes History</h2>

                    <div className="bg-white shadow overflow-hidden sm:rounded-md">
                        <ul role="list" className="divide-y divide-gray-200">
                            {loading ? (
                                <li className="px-6 py-4 text-center text-gray-500">Loading records...</li>
                            ) : notes.length === 0 ? (
                                <li className="px-6 py-4 text-center text-gray-500">No records found for this patient.</li>
                            ) : (
                                notes.map((note) => (
                                    <li key={note.id} className="block hover:bg-gray-50">
                                        <div className="px-4 py-4 sm:px-6">
                                            <div className="flex items-center justify-between">
                                                <p className="truncate text-sm font-medium text-primary-600">
                                                    Dr. ID: {note.doctorId}
                                                </p>
                                                <div className="ml-2 flex flex-shrink-0">
                                                    <p className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                                        Visit
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="mt-2 sm:flex sm:justify-between">
                                                <div className="sm:flex">
                                                    <p className="flex items-center text-sm text-gray-500">
                                                        <FileText className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                        {note.content}
                                                    </p>
                                                </div>
                                                <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                    <p>
                                                        {new Date(note.visitDate).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
}
