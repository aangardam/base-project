/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

type SidebarState = {
    isOpen: boolean;
    isSidebarVisible: boolean;
    isSubMenuVisible: boolean;
    dataSidebar: any;
    toggleOpenSidebar: () => void;
    toggleSidebarVisibility: () => void;
    toggleSubMenuVisibility: () => void;
    setDataSidebar: (data: any) => void;
};

export const useSidebar = create<SidebarState>((set) => ({
    isOpen: true,
    isSidebarVisible: true,
    isSubMenuVisible: false,
    dataSidebar: null,
    setDataSidebar: (data: any) => set({ dataSidebar: data }),
    toggleOpenSidebar: () => set((state) => ({ isOpen: !state.isOpen })),
    toggleSidebarVisibility: () =>
        set((state) => ({ isSidebarVisible: !state.isSidebarVisible })),
    toggleSubMenuVisibility: () =>
        set((state) => ({ isSubMenuVisible: !state.isSubMenuVisible })),
}));
