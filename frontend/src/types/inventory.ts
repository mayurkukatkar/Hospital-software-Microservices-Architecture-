export interface InventoryItem {
    id: number;
    itemName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    category: string; // e.g., 'MEDICINE', 'EQUIPMENT', 'CONSUMABLE'
    supplierId?: number;
    lastUpdated: string; // LocalDateTime
}

export interface CreateItemRequest {
    itemName: string;
    description: string;
    quantity: number;
    unitPrice: number;
    category: string;
    supplierId?: number;
}
