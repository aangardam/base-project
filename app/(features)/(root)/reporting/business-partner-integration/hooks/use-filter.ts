import { changeDateConnectore, dateNow, dateTimeNow, startDate, startDateTime } from "@/shared/utils/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";


const Schema = z.object({
    startDateReport: z.any(),
    endDateReport: z.any(),
    startDateTransaction: z.string().optional(),
    endDateTransaction: z.string().optional(),
    startDateInvoice: z.any(),
    endDateInvoice: z.any(),
    startDatePaid: z.string().optional(),
    endDatePaid: z.string().optional(),
    bussniesPartner: z.string().optional(),
    reportId: z.string().optional(),
    invoiceNo: z.string().optional(),
    requestId: z.string().optional(),
});

const useFilter = () => {
    // console.log("dateNow", dateNow())

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            startDateReport:startDate(),
            endDateReport:dateNow(),
            startDateTransaction: startDateTime(),
            endDateTransaction: dateTimeNow(),
            startDateInvoice:startDate(),
            endDateInvoice:dateNow(),
            startDatePaid: startDateTime(),
            endDatePaid: dateTimeNow(),
            bussniesPartner: "",
            reportId: "",
            invoiceNo: "",
            requestId: "",
        },
    });

    const handleSubmit = (data: z.infer<typeof Schema>) => {
        
        const payload = {
            ...data,
            startDateReport: changeDateConnectore(format(new Date(data.startDateReport), "yyyy-MM-dd")),
            endDateReport: changeDateConnectore(format(new Date(data.endDateReport), "yyyy-MM-dd")),
            startDateInvoice: changeDateConnectore(format(new Date(data.startDateInvoice), "yyyy-MM-dd")),
            endDateInvoice: changeDateConnectore(format(new Date(data.endDateInvoice), "yyyy-MM-dd")),
            startDateTransaction: data.startDateTransaction ? changeDateConnectore(data.startDateTransaction.toString()) : undefined,
            endDateTransaction: data.endDateTransaction ? changeDateConnectore(data.endDateTransaction.toString()) : undefined,
            startDatePaid: data.startDatePaid ? changeDateConnectore(data.startDatePaid.toString()) : undefined,
            endDatePaid: data.endDatePaid ? changeDateConnectore(data.endDatePaid.toString()) : undefined,
        }
        console.log(payload);
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