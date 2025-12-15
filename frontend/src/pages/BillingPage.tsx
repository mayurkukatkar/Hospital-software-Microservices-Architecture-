import { useEffect, useState } from 'react';
import { Plus, CreditCard, DollarSign } from 'lucide-react';
import { BillingService } from '../services/billingService';
import { type Invoice } from '../types/billing';
import { CreateInvoiceModal } from '../components/CreateInvoiceModal';

export function BillingPage() {
    const [invoices, setInvoices] = useState<Invoice[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadInvoices();
    }, []);

    const loadInvoices = async () => {
        try {
            setLoading(true);
            const data = await BillingService.getAllInvoices();
            setInvoices(data);
        } catch (error) {
            console.error("Failed to load invoices", error);
            // It might fail if no endpoint for all invoices exists, which is fine for now
            setInvoices([]);
        } finally {
            setLoading(false);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'PAID': return 'bg-green-100 text-green-800';
            case 'UNPAID': return 'bg-yellow-100 text-yellow-800';
            case 'PARTIALLY_PAID': return 'bg-orange-100 text-orange-800';
            case 'CANCELLED': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
                <button
                    className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Create Invoice
                </button>
            </div>

            <CreateInvoiceModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadInvoices}
            />

            {/* Stats or Search could go here */}

            {/* Invoices List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {loading ? (
                        <li className="px-6 py-4 text-center text-gray-500">Loading invoices...</li>
                    ) : invoices.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">No invoices found.</li>
                    ) : (
                        invoices.map((invoice) => (
                            <li key={invoice.id} className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-medium text-primary-600">
                                            Invoice #{invoice.id} - Patient {invoice.patientId}
                                        </p>
                                        <div className="ml-2 flex flex-shrink-0">
                                            <p className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${getStatusStyle(invoice.status)}`}>
                                                {invoice.status}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                <CreditCard className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                Total: ${invoice.totalAmount}
                                            </p>
                                            <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                                <DollarSign className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                Paid: ${invoice.paidAmount}
                                            </p>
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                            <p>
                                                Issued: {new Date(invoice.issueDate).toLocaleDateString()}
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
    );
}
