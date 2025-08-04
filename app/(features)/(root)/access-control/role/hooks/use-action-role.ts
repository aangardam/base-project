/* eslint-disable @typescript-eslint/no-explicit-any */

import { z } from "zod"
import { RoleService } from "../services/role.service";
import { TRoleRequestBody } from "../interfaces/role";
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
    menuFunctionIds: z.array(z.number()),
});

const useActionRole = (data?:any, onClose?:any) => {
    const roleService = new RoleService();
    const queryClient = useQueryClient();
    const { user, menuPermission } = useUserStore();
    const permission = getMenuPermission(menuPermission, '/access-control/role');
  
    const isAllRole = data?.menuFunctionIds?.filter((item: any) => item !== 1) ?? [];
    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            name: data?.name,
            menuFunctionIds: isAllRole ?? [],
        },
    });

    const handleSubmit = (values: z.infer<typeof Schema>) =>  {   
        const payload = {
            requestId: generateRequestId(),
            requestTime: formatRequestTime(),
            data: {
                name: values.name,
                menuFunctionIds: values.menuFunctionIds.map(String),
                userMenuInfo: {
                    userId: user.userId,
                    roleId: user.roles[0].id,
                    menuId: permission[0].id,
                    parentId: permission[0].parent,
                },
            },
        }
        if(data){
            mutateActionRole({ 
                ...payload, 
                data: { 
                    ...payload.data, 
                    id: data.id 
                } 
            });
        }else{
            mutateActionRole(payload);
        }
    };

    const actionRole = async (payload: TRoleRequestBody) => {
        let res;
        if(data){
            res = await roleService.update(payload);
        }else{
            res = await roleService.create(payload);
        }
        return res;
    }

    const { 
        mutate: mutateActionRole ,
        isPending: isPendingRole,
    } = useMutation({
        mutationFn: actionRole,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['role'],
            });
            let message = 'Update';
            let description = 'Role has been Updated successfully';
            if(!data){
                message = 'Create';
                description = 'Role has been Created successfully';
            }
            toast({
                title: `${message} Role Success`,
                description: `${description}`,
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
        isPendingRole
    }
}

export default useActionRole