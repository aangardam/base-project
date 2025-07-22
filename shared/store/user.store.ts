/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BroadcastChannel } from 'broadcast-channel';
import CryptoJS from 'crypto-js';

export const logoutChannel = new BroadcastChannel('logout');

type UserMenuInfo = {
    userId: number;
    roleId: number;
    menuId: number;
    parentId: number;
    ipAddress?: string;
};

type MenuPermission = {
    functions: string[];
};

type UserState = {
    user: any;
    role: any;
    userMenuInfo: UserMenuInfo;
    menuPermission: MenuPermission;
    token: string | null;
    setRole: (role: any) => void;
    setUser: (user: any) => void;
    setUserMenuInfo: (userMenuInfo: UserMenuInfo) => void;
    setMenuPermission: (menuPermission: MenuPermission) => void;
    setToken: (token: string) => void;
    logout: () => void;
};

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY;

const encrypt = (data: unknown) =>
    CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY!).toString();
const decrypt = (data: string) => {
    const bytes = CryptoJS.AES.decrypt(data, SECRET_KEY!);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            role: null,
            userMenuInfo: {
                userId: 0,
                roleId: 0,
                menuId: 0,
                parentId: 0,
                ipAddress: '',
            },
            menuPermission: {
                functions: [],
            },
            token: null,
            setRole: (role: unknown) => set({ role }),
            setUser: (user: unknown) => set({ user }),
            setUserMenuInfo: (userMenuInfo: UserMenuInfo) =>
                set({ userMenuInfo }),
            setMenuPermission: (menuPermission: MenuPermission) =>
                set({ menuPermission }),
            setToken: (token: string) => set({ token }),
            logout: () => {
                logoutChannel.postMessage('logout');
                localStorage.removeItem('user-storage');
            },
        }),
        {
            name: 'user-storage',
            storage: {
                getItem: (name) => {
                    const data = localStorage.getItem(name);
                    return decrypt(data!);
                },
                setItem: (name, value) => {
                    localStorage.setItem(name, encrypt(value));
                },
                removeItem: (name) => {
                    localStorage.removeItem(name);
                },
            },
        },
    ),
);
