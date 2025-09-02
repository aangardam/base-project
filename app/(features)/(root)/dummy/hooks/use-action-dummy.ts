import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { DummyService } from "../services/dummy.service";
import { TDummy, TDummyRequestBody } from "../interface/dummy";
import { toast } from "@/shared/hooks/use-toast";
import { AxiosError } from "axios";

const dummySchema = z.object({
    name: z.string().min(3, {message: "Name must be at least 3 characters"}),
    description: z.string().min(3, {message: "Description must be at least 3 characters"}),
    status: z.boolean(),
    total: z.string(),
}) 

const useActionDummy = (data?: TDummy, onClose?: () => void) => {
    const dummyService = new DummyService();
    const queryClient = useQueryClient();

    const form = useForm<z.infer<typeof dummySchema>>({
        resolver: zodResolver(dummySchema),
        defaultValues: {
            name: data?.name || '',
            description: data?.description || '',
            status: data?.status || false,
            total: data?.total || '0',
        },
    });

    const actionDummy = async (paylod: TDummyRequestBody) => {
        let res;
        if (data) {
            res = await dummyService.updateDummy(paylod, data._id);
        }else{
            res = await dummyService.addDummy(paylod);
        }
        return res;
    }

    
    const { mutate: mutateAddDummy, isPending: isAddDummyLoading } = useMutation({
        mutationFn: actionDummy,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['dummy'],
            });
            let message = 'Update';
            let description = 'Dummy has been Updated successfully';
            if(!data){
                message = 'Create';
                description = 'Dummy has been Created successfully';
            }
            toast({
                title: `${message} Dummy Success`,
                description: `${description}`,
            }); 
            if (onClose) onClose();
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

    const handleAddDummy = (values: z.infer<typeof dummySchema>) => {
        const payload: TDummyRequestBody = {
            name: values.name,
            description: values.description,
            status: values.status,
            total: Number(values.total),
        };
        mutateAddDummy(payload);
    };

    return {
        form,
        handleAddDummy,
        isAddDummyLoading,
    };
}

export default useActionDummy;