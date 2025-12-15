import { useState } from 'react';
import { X, Plus, Trash } from 'lucide-react';
import { BillingService } from '../services/billingService';
import { type InvoiceItem, type CreateInvoiceRequest } from '../types/billing';

interface CreateInvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CreateInvoiceModal({ isOpen, onClose, onSuccess }: CreateInvoiceModalProps) {
    const [patientId, setPatientId] = useState('');
    const [items, setItems] = useState<InvoiceItem[]>([{ description: '', amount: 0 }]);
    const [dueDate, setDueDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleAddItem = () => {
        setItems([...items, { description: '', amount: 0 }]);
    };

    const handleRemoveItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemChange = (index: number, field: keyof InvoiceItem, value: any) => {
        const newItems = [...items];
        newItems[index] = { ...newItems[index], [field]: value };
        setItems(newItems);
    };

    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + Number(item.amount), 0);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const request: CreateInvoiceRequest = {
                patientId,
                items: items.filter(i => i.description && i.amount > 0),
                dueDate: dueDate ? new Date(dueDate).toISOString() : undefined
            };

            await BillingService.createInvoice(request);
            onSuccess();
            onClose();
        } catch (err) {
            console.error(err);
            setError('Failed to create invoice.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-900">Create New Invoice</h2>
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
                        <label className="block text-sm font-medium text-gray-700">Due Date</label>
                        <input
                            type="date"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                            value={dueDate}
                            onChange={e => setDueDate(e.target.value)}
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-sm font-medium text-gray-700">Invoice Items</label>
                            <button type="button" onClick={handleAddItem} className="text-primary-600 text-sm hover:text-primary-700 flex items-center">
                                <Plus className="h-4 w-4 mr-1" /> Add Item
                            </button>
                        </div>
                        <div className="space-y-2">
                            {items.map((item, index) => (
                                <div key={index} className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Description"
                                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                                        value={item.description}
                                        onChange={e => handleItemChange(index, 'description', e.target.value)}
                                        required
                                    />
                                    <input
                                        type="number"
                                        placeholder="Amount"
                                        className="w-32 rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                                        value={item.amount}
                                        onChange={e => handleItemChange(index, 'amount', Number(e.target.value))}
                                        required
                                        min="0"
                                        step="0.01"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveItem(index)}
                                        className="text-red-500 hover:text-red-700"
                                        disabled={items.length === 1}
                                    >
                                        <Trash className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="mt-4 text-right font-bold text-lg">
                            Total: ${calculateTotal().toFixed(2)}
                        </div>
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
                            {loading ? 'Creating...' : 'Create Invoice'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
