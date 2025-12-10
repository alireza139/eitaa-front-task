import { create } from "zustand";

// تعریف نوع‌های استور
interface UsersStore {
  selectedUserId: number | null;  
  setSelectedUserId: (id: number) => void;
  clearSelectedUser: () => void;
}

const useUsersStore = create<UsersStore>((set) => ({
  selectedUserId: null,
  setSelectedUserId: (id) => set({ selectedUserId: id }),
  clearSelectedUser: () => set({ selectedUserId: null }),
}));

export default useUsersStore;
