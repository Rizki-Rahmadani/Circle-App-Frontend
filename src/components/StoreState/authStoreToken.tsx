import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  clearToken: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null, // Default token is null
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: null }),
    }),
    {
      name: 'auth-token', // Key for localStorage
      partialize: (state) => ({ token: state.token }), // Only save token
    }
  )
);

export default useAuthStore;
