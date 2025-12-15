import { useEffect, useState } from 'react';
import { Plus, Package, AlertTriangle } from 'lucide-react';
import { InventoryService } from '../services/inventoryService';
import { type InventoryItem } from '../types/inventory';
import { AddItemModal } from '../components/AddItemModal';

export function InventoryPage() {
    const [items, setItems] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            setLoading(true);
            const data = await InventoryService.getAllItems();
            setItems(data);
        } catch (error) {
            console.error("Failed to load inventory", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-900">Inventory Management</h1>
                <button
                    className="inline-flex items-center rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                    Add Item
                </button>
            </div>

            <AddItemModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={loadItems}
            />

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                    {loading ? (
                        <li className="px-6 py-4 text-center text-gray-500">Loading inventory...</li>
                    ) : items.length === 0 ? (
                        <li className="px-6 py-4 text-center text-gray-500">No inventory items found.</li>
                    ) : (
                        items.map((item) => (
                            <li key={item.id} className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <p className="truncate text-sm font-medium text-primary-600">
                                            {item.itemName}
                                        </p>
                                        <div className="ml-2 flex flex-shrink-0">
                                            <p className="inline-flex rounded-full bg-gray-100 px-2 text-xs font-semibold leading-5 text-gray-800">
                                                {item.category}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-2 sm:flex sm:justify-between">
                                        <div className="sm:flex">
                                            <p className="flex items-center text-sm text-gray-500">
                                                <Package className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                                Stock: {item.quantity}
                                            </p>
                                            {item.quantity < 10 && (
                                                <p className="mt-2 flex items-center text-sm text-red-600 sm:mt-0 sm:ml-6">
                                                    <AlertTriangle className="mr-1.5 h-5 w-5 flex-shrink-0 text-red-500" aria-hidden="true" />
                                                    Low Stock
                                                </p>
                                            )}
                                        </div>
                                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                                            <p>Price: ${item.unitPrice}</p>
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
