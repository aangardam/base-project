/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BroadcastChannel } from "broadcast-channel";
import CryptoJS from "crypto-js";

export const logoutChannel = new BroadcastChannel("logout");

const SECRET_KEY = process.env.NEXT_PUBLIC_SECRET_KEY || "secret";
const encrypt = (data: unknown) =>
    CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY!).toString();

const decrypt = (value: string) => {
    const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY!);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
};

type MenuPermissions = {
    funtion:string[];
}

type UserTypes = {
    user: any;
    role: any;
    token: string | null;
    menuPermissions: MenuPermissions;
    setRole: (role: any) => void;
    setUser: (user: any) => void;
    setToken: (token: string) => void;
    setMenuPermissions: (menuPermissions: MenuPermissions) => void;
    logout: () => void;
}



export const useUserStore = create<UserTypes>()(
    persist(
        (set) => ({
            user:null,
            role:null,
            token: null,
            menuPermissions: {
                funtion:[],
            },
            setUser: (user: unknown) => {
                set({ user });
            },
            setRole: (role: unknown) => {
                set({ role });
            },
            setToken: (token: string) => {
                set({ token });
            },
           
            setMenuPermissions: (menuPermissions: MenuPermissions) => {
                set({ menuPermissions });
            },
            logout: () => {
                logoutChannel.postMessage("logout");
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
        }
    )

)