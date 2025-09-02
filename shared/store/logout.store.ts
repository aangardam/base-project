import { create } from 'zustand';

type AuthState = {
    authenticated: boolean;
    setAuthenticated: (authenticated: boolean) => void;
};

export const useAuthentication = create<AuthState>((set) => ({
    authenticated: true,
    setAuthenticated: (authenticated: boolean) => set({ authenticated }),
}));