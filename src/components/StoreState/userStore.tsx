import { User } from '@/types/user.type';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useFollowStore from './useFollowStore';

interface UserState {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => {
        set({ user });
        localStorage.setItem('user', JSON.stringify(user));
      },
      clearUser: () => {
        set({ user: null });
        localStorage.removeItem('user');
        const { resetFollow } = useFollowStore.getState();
        resetFollow();
      },
    }),
    {
      name: 'user',
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useUserStore;
