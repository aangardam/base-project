/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthentication } from "@/shared/store/logout.store";
import { logoutChannel, useUserStore } from "@/shared/store/user.store";
import { useEffect } from "react";

export const useLogoutListener = () => {
   const { setAuthenticated } = useAuthentication();
   const { logout } = useUserStore();

   useEffect(() => {
        const handleLogoutMessage = (event: any) => {
            if (event === 'logout') {
                setAuthenticated(false);
                logout();
                window.location.href = '/login';
            }
        };

        logoutChannel.addEventListener('message', handleLogoutMessage);
        return () => {
            logoutChannel.removeEventListener('message', handleLogoutMessage);
        };
   }, [logout, setAuthenticated]);
};