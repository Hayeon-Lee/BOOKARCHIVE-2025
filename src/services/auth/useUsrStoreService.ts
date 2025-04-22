import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserStore } from '../../types/auth';

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            loginUser: null,
            setUser: (loginUser) => set({loginUser}),
            clearUser: () => set({loginUser: null}),
        }),
        {
            name: 'user-storage',
        }
    )
);