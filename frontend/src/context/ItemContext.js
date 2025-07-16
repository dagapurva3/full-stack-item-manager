// src/context/ItemContext.js
import React, { createContext, useContext, useState } from 'react';
import * as itemApi from '../services/itemApi';

const ItemContext = createContext();

export function ItemProvider({ children }) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchItems = async () => {
        setLoading(true);
        const res = await itemApi.fetchItems();
        setItems(res.data);
        setLoading(false);
    };

    return (
        <ItemContext.Provider value={{ items, setItems, fetchItems, loading }}>
            {children}
        </ItemContext.Provider>
    );
}

export function useItemContext() {
    return useContext(ItemContext);
}
