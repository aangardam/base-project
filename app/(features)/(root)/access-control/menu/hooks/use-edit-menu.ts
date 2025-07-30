/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod"
import { MenuService } from "../services/menu.service";
import { TMenuRequestBody } from "../interfaces/menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/shared/hooks/use-toast";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserStore } from "@/shared/store/user.store";
import { formatRequestTime, generateRequestId } from "@/shared/utils/request.untils";
import { getMenuPermission } from "@/shared/utils/utils";


const Schema = z.object({
    name: z.string().min(1, { message: "Name is Required" }),
    url: z.string().min(1, { message: "Description is Required" }),
    icon: z.string().min(1, { message: "Value is Required" }),
    parentId: z.number(),
    functions: z.array(z.number()),
    show:z.any(),
});

const useEditMenu = (data?:any, onClose?:any) => {
    const menuService = new MenuService();
    const queryClient = useQueryClient();
    const { user, menuPermission } = useUserStore();
    const permission = getMenuPermission(menuPermission, '/access-control/menu');

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            name: data?.name,
            url: data?.url,
            icon: data?.icon,
            parentId: Number(data?.parentId) ?? 1000,
            functions: data?.functions?.map((item: any) => item.id) ?? [],
            show: data?.show === '1' ? true : false,
        },
    });

    const handleSubmit = (values: z.infer<typeof Schema>) =>  {        
        const payload = {
            requestId: generateRequestId(),
            requestTime: formatRequestTime(),
            data: {
                ...values,
                show: values.show === true ? 1 : 0,
                parentId:Number(values.parentId),
                authorizeUrl: 'authorizeUrl',
                userMenuInfo: {
                    userId: user.userId,
                    roleId: user.roles[0].id,
                    menuId: permission[0].id,
                    parentId: permission[0].parent,
                },
            },
        }
        if(data){
            mutateUpdateMenu({...payload, data: {...payload.data, id: data.id}});
        }
    };

    const updateMenu = async (payload: TMenuRequestBody) => {
        const res = await menuService.updateMenu(payload);
        return res;
    }
    const { 
        mutate: mutateUpdateMenu ,
        isPending: isPendingMenu,
    } = useMutation({
        mutationFn: updateMenu,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['menu'],
            });
            queryClient.invalidateQueries({
                queryKey: ['role-access'],
            });
            toast({
                title: 'Update Menu Success',
                description: 'Menu has been Updated successfully',
            });
            if (onClose) onClose();
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

    return {
        form,
        handleSubmit,
        isPendingMenu
    }
}

export default useEditMenu