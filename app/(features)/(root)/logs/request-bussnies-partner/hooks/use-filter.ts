import { dateNow } from "@/shared/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const Schema = z.object({
    reportDate: z.string().optional(),
    fromSubmittedAt: z.string().optional(),
    toSubmittedAt: z.string().optional(),
    fromPaidAt: z.string().optional(),
    toPaidAt: z.string().optional(),
    status: z.string().optional(),
    bussniesPartner: z.string().optional(),
    reportId: z.string().optional(),
    otherId: z.string().optional(),
});

const useFilter = () => {
    // console.log("dateNow", dateNow())

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            reportDate: dateNow(),
            fromSubmittedAt: dateNow(),
            toSubmittedAt: dateNow(),
            fromPaidAt: dateNow(),
            toPaidAt: dateNow(),
            status: "all",
            bussniesPartner: "",
            reportId: "",
            otherId: "",
        },
    });

    const handleSubmit = (data: z.infer<typeof Schema>) => {
        console.log(data)
    }

    const resetFilter = () => {
        form.reset()
    }

    return {
        form,
        handleSubmit,
        resetFilter
    }
}

export default useFilter