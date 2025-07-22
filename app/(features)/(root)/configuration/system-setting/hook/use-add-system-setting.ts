/* eslint-disable @typescript-eslint/no-explicit-any */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import { z } from "zod"


const Schema = z.object({
    name: z.string().min(1, { message: "Name is Required" }),
    description: z.string().min(1, { message: "Description is Required" }),
    value: z.string().min(1, { message: "Value is Required" }),
})

const useAddSystemSetting = (data:any, onClose:any) => {
    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            name: data?.name,
            description: data?.description,
            value: data?.value,
        },
    });



    const handleAdd = (data: z.infer<typeof Schema>) =>  {
        console.log(data)
        if (onClose) onClose();
        // mutateAddDummy(data)
    };

    return {
        form,
        handleAdd
    }
}

export default useAddSystemSetting