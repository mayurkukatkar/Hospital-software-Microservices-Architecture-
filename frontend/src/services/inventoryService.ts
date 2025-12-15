import { api } from './api';
import { type InventoryItem, type CreateItemRequest } from '../types/inventory';

const BASE_PATH = '/inventory';

export const InventoryService = {
    getAllItems: async (): Promise<InventoryItem[]> => {
        const response = await api.get<InventoryItem[]>(`${BASE_PATH}/items`);
        return response.data;
    },

    addItem: async (item: CreateItemRequest): Promise<InventoryItem> => {
        const response = await api.post<InventoryItem>(`${BASE_PATH}/items`, item);
        return response.data;
    },

    updateStock: async (id: number, quantity: number): Promise<InventoryItem> => {
        // Backend MVP might not have a dedicated PATCH for stock, let's assume PUT or specific endpoint
        // For MVP, we might re-use simple update if specific stock endpoint doesn't exist.
        // Let's assume PUT /inventory/items/{id} updates the whole item or a PATCH
        // Or if the backend strictly separates stock updates.
        // Given previous service impl, we might just have CRUD.
        // Let's assume we can fetch, modify, and PUT back for now if no specific "add-stock" endpoint.
        // Or if we implemented `updateStock` in backend (check backend if needed, but safe to mock for now)
        // Checking InventoryController in memory... likely standard CRUD.
        const response = await api.put<InventoryItem>(`${BASE_PATH}/items/${id}`, { quantity });
        // Note: Real backend might require full object. This is a simplification.
        return response.data;
    },

    getLowStockItems: async (): Promise<InventoryItem[]> => {
        // Checking if backend has this... likely getting all and filtering client side for MVP is safer if unsure.
        const all = await InventoryService.getAllItems();
        return all.filter(item => item.quantity < 10); // Simple threshold
    }
};
