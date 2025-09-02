
// import { useUserStore } from '@/shared/store/user.store';
import { redirect, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuthRedirect = () => {
    const [isLoading, setIsLoading] = useState(true);
   

    const originalPathname = usePathname();

    const haveToken = typeof localStorage !== 'undefined' && !!localStorage.getItem('user-storage');

    // console.log(haveToken);

    useEffect(() => {
        if (!haveToken) {
            redirect('/login');
        }

        setIsLoading(false);
    }, [haveToken, originalPathname]);

    return isLoading;
};
