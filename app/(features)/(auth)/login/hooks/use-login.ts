/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRouter } from "next/navigation";
import { useUserStore } from "@/shared/store/user.store";
import { LoginService } from "../services/login.service";
import { useMutation } from "@tanstack/react-query";
import { ILoginRequestBody } from "../interfaces/login.interface";
import { toast } from "@/shared/hooks/use-toast";
import { AxiosError } from "axios";

export function useLogin(){
    const loginService = new LoginService();
    const router = useRouter();
    const { setUser, setToken } = useUserStore();

    return useMutation({
        mutationFn:(data:ILoginRequestBody) => loginService.login(data),
        onSuccess: (val) => {
            if(val?.data?.data?.token){
                setToken(val?.data?.data?.token);
                setUser(val?.data?.data);
                router.push("/");
            }
        },
        onError: (error) => {
            const err = error as AxiosError
            const message = (err.response?.data as any)?.message || err.message;
            toast({
                title: 'Error',
                description: message,
                variant: 'destructive',
            })
        },
    });
}