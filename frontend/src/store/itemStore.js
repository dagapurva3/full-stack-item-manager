
import create from 'zustand';
import * as itemApi from '../services/itemApi';

const useItemStore = create((set) => ({
    items: [],
    loading: false,
    fetchItems: async () => {
        set({ loading: true });
        const res = await itemApi.fetchItems();
        set({ items: res.data, loading: false });
    },
}));

export default useItemStore;
