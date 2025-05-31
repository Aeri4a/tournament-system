import { create } from 'zustand';
import { User } from 'common';

interface AuthState {
  user: User | null;
  // token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (user: User) => void;
  logout: () => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  checkAuthStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  // token: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
  login: (user) => {
    set({ user, isAuthenticated: true, error: null, isLoading: false });
  },
  logout: () => {
    set({
      user: null,
      // token: null,
      isAuthenticated: false,
      error: null,
      isLoading: false,
    });
  },
  setError: (error) => set({ error, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  checkAuthStatus: async () => {
    set({ isLoading: true });
  },
}));
