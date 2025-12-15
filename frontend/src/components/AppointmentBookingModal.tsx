import { useState } from 'react';
import { X } from 'lucide-react';
import { AppointmentService } from '../services/appointmentService';
import { type CreateAppointmentRequest } from '../types/appointment';

interface AppointmentBookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

// Mock doctors for MVP
const MOCK_DOCTORS = [
    { id: 1, name: 'Dr. House', specialization: 'Diagnostic Medicine' },
    { id: 2, name: 'Dr. Strange', specialization: 'Neurosurgery' },
    { id: 3, name: 'Dr. Grey', specialization: 'General Surgery' },
];

export function AppointmentBookingModal({ isOpen, onClose, onSuccess }: AppointmentBookingModalProps) {
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: 1,
        date: '',
        time: '',
        reason: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            // Combine date and time to ISO format
            const appointmentTime = `${formData.date}T${formData.time}:00`;

            const request: CreateAppointmentRequest = {
                patientId: formData.patientId,
                doctorId: Number(formData.doctorId),
                appointmentTime,
                reason: formData.reason
            };

            await AppointmentService.createAppointment(request);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError('Failed to book appointment. Please check inputs.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Book Appointment</h2>
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
                            placeholder="e.g. PAT-2023-001"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                            value={formData.patientId}
                            onChange={e => setFormData({ ...formData, patientId: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Doctor</label>
                        <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                            value={formData.doctorId}
                            onChange={e => setFormData({ ...formData, doctorId: Number(e.target.value) })}
                        >
                            {MOCK_DOCTORS.map(doc => (
                                <option key={doc.id} value={doc.id}>
                                    {doc.name} - {doc.specialization}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date</label>
                            <input
                                type="date"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                                value={formData.date}
                                onChange={e => setFormData({ ...formData, date: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Time</label>
                            <input
                                type="time"
                                required
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                                value={formData.time}
                                onChange={e => setFormData({ ...formData, time: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Reason</label>
                        <textarea
                            required
                            rows={2}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                            value={formData.reason}
                            onChange={e => setFormData({ ...formData, reason: e.target.value })}
                        />
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
                            disabled={loading}
                            className="inline-flex justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            {loading ? 'Booking...' : 'Book Appointment'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
