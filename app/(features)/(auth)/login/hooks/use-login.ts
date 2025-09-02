

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from "zod";
import { LoginService } from "../services/login.service";
import { useMutation } from "@tanstack/react-query";
import { ILogin } from "../interfaces/login";
import { toast } from "sonner";
import { useState } from "react";
import { useUserStore } from "@/shared/store/user.store";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});
    
const useLogin = () => {
    const router = useRouter();
    const {setUser, setToken} = useUserStore();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const loginService = new LoginService();
    const { mutate: mutateLogin, isPending: isLoginLoading } = useMutation({
        mutationFn:(data:ILogin) => loginService.login(data),
        onSuccess: (val) => {
            if(val?.data?.token){
                setToken(val?.data?.token);
                setUser(val?.data);
                router.push("/");
            }
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleLogin = (data: ILogin) => mutateLogin(data);
    
    const [forgotPassword, setForgotPassword] = useState(false);
    const handleForgotPassword = () => setForgotPassword(!forgotPassword);

    return {
       form,
       handleLogin,
        isLoginLoading,
        forgotPassword,
        handleForgotPassword,
    };
};

export default useLogin;