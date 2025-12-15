import { useEffect, useState } from 'react';
import { Plus, Search, Calendar as CalendarIcon, Filter } from 'lucide-react';
import { AppointmentService } from '../services/appointmentService';
import { type Appointment } from '../types/appointment';
import { AppointmentBookingModal } from '../components/AppointmentBookingModal';

export function AppointmentsPage() {
    const [appointments, setAppointments] = useState<Appointment[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadAppointments();
    }, []);

    const loadAppointments = async () => {
        try {
            setLoading(true);
            const data = await AppointmentService.getAllAppointments();
            setAppointments(data);
        } catch (error) {
            console.error("Failed to load appointments", error);
        } finally {
            setLoading(false);
        }
    };

    // Helper to format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    // Helper to get Status Badge Style
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'CONFIRMED': return 'bg-green-100 text-green-800';
            case 'SCHEDULED': return 'bg-blue-100 text-blue-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            case 'COMPLETED': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
                <div className="flex space-x-3">
                    <button className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <CalendarIcon className="-ml-0.5 mr-1.5 h-5 w-5 text-gray-400" />
                        Calendar View
                    </button>
                    <button
                        className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                        Book Appointment
                    </button>
                </div>
            </div>

            <AppointmentBookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadAppointments}
            />

            {/* List View */}
            <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl overflow-hidden">
                <div className="border-b border-gray-200 px-4 py-4 sm:px-6">
                    <div className="flex items-center">
                        <div className="relative flex-1 max-w-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <Search className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                                placeholder="Search appointments..."
                                disabled // Placeholder functionality
                            />
                        </div>
                        <div className="ml-4 flex items-center space-x-4">
                            <button className="text-gray-400 hover:text-gray-500">
                                <Filter className="h-5 w-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <ul role="list" className="divide-y divide-gray-100">
                    {loading ? (
                        <li className="p-8 text-center text-gray-500">Loading appointments...</li>
                    ) : appointments.length === 0 ? (
                        <li className="p-8 text-center text-gray-500">No appointments found.</li>
                    ) : (
                        appointments.map((appointment) => (
                            <li key={appointment.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
                                <div className="flex min-w-0 gap-x-4">
                                    <div className="min-w-0 flex-auto">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                            Patient MRN: {appointment.patientId}
                                        </p>
                                        <p className="mt-1 flex text-xs leading-5 text-gray-500">
                                            Doctor ID: {appointment.doctorId} | Reason: {appointment.reason}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center gap-x-4">
                                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                                        <p className="text-sm leading-6 text-gray-900">{formatDate(appointment.appointmentTime)}</p>
                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusStyle(appointment.status)}`}>
                                            {appointment.status}
                                        </span>
                                    </div>
                                    {/* Chevron right or actions could go here */}
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}
