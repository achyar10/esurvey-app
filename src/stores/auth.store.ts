import create from 'zustand';
import { persist } from "zustand/middleware"

interface IUser {
    user_id: number;
    fullname: string;
    role: string;
    access_token: string;
}


interface AuthStore {
    user: IUser | null;
    setUser: (value: IUser) => void;
    unsetUser: () => void;
}

const keyStorage = Buffer.from('secret-key-for-auth-store').toString('base64');

export const useAuthStore = create<AuthStore>(persist((set, get) => ({
    user: null,
    setUser: (value) => set((state) => ({ ...state, user: value })),
    unsetUser: () => set({ user: null }),
}), { name: keyStorage, getStorage: () => localStorage }))