// src/api/localCrudApi.ts
export function createLocalCrudAPI<T>(storageKey: string) {
  return {
    getAll: async (): Promise<T[]> => {
      return JSON.parse(localStorage.getItem(storageKey) || '[]');
    },

    create: async (item: T): Promise<void> => {
      const data = JSON.parse(localStorage.getItem(storageKey) || '[]');
      const newItem = { ...item, id: Date.now().toString() };
      localStorage.setItem(storageKey, JSON.stringify([...data, newItem]));
    },

    update: async (id: string, updatedItem: T): Promise<void> => {
      let data = JSON.parse(localStorage.getItem(storageKey) || '[]');
      data = data.map((item: any) => (item.id === id ? { ...item, ...updatedItem } : item));
      localStorage.setItem(storageKey, JSON.stringify(data));
    },

    delete: async (id: string): Promise<void> => {
      let data = JSON.parse(localStorage.getItem(storageKey) || '[]');
      data = data.filter((item: any) => item.id !== id);
      localStorage.setItem(storageKey, JSON.stringify(data));
    },
  };
}
