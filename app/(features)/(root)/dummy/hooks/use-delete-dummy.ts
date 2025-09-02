import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "@/shared/hooks/use-toast";
import { DummyService } from "../services/dummy.service";


const useDeleteDummy = () => {
    const deleteDummy = new DummyService();
    const queryClient = useQueryClient();
    
    const { mutate: mutateDeleteDummy, isPending: isPendingDeleteDummy } = useMutation({
        mutationFn: (id:string) => deleteDummy.deleteDummy(id),
        onSuccess: () => {
            toast({
                title: 'Success',
                description: 'Dummy deleted successfully',
            });
            queryClient.invalidateQueries({
                queryKey: ['dummy'],
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
        mutateDeleteDummy,
        isPendingDeleteDummy
    }
}

export default useDeleteDummy