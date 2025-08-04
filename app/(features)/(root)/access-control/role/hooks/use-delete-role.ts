import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TRoleDeleteRequestBody } from "../interfaces/role";
import { RoleService } from "../services/role.service";
import { AxiosError } from "axios";
import { toast } from "@/shared/hooks/use-toast";

const useDeleteRole = () => {

    const roleService = new RoleService();
    const queryClient = useQueryClient();
    
    const { mutate: mutateDeleteRole, isPending: isPendingDeleteRole } = useMutation({
        mutationFn: (body: TRoleDeleteRequestBody) => roleService.delete(body),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Role deleted successfully',
            });
            queryClient.invalidateQueries({
                queryKey: ['role'],
            });
        },
        onError: (error) => {
            const err = error as AxiosError
            const message = (err.response?.data as { message?: string })?.message || err.message;
            toast({
                title: 'Error',
                description: message,
                variant: 'destructive',
            })
        },
    });

    return {
        mutateDeleteRole,
        isPendingDeleteRole
    }
}

export default useDeleteRole