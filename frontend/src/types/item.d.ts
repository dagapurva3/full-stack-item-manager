// src/types/item.d.ts
export interface Item {
    id: number;
    name: string;
    description?: string;
    group: 'Primary' | 'Secondary';
    status: 'active' | 'inactive' | 'archived';
    priority: 'low' | 'medium' | 'high' | 'urgent';
    price?: number;
    quantity: number;
    location?: string;
    tags?: string;
    tag_list?: string[];
    is_urgent?: boolean;
    is_active?: boolean;
    is_primary_group?: boolean;
    is_high_priority?: boolean;
    created_at: string;
    updated_at: string;
}
