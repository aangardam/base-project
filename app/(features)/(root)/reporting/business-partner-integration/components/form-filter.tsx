import useFilter from "../hooks/use-filter";
import { Form } from "@/shared/components/ui/form";
import AdvanceFilter from "@/shared/components/layout/advance-filter";

import FormInput from "@/shared/components/form/form-input";
// import { Button } from "@/shared/components/ui/button";
import FormDateTimePicker from "@/shared/components/form/form-datetimepicker";
import FormDateRangePicker from "@/shared/components/form/form-daterangepicker";

const FormFilter = () => {
    const {
        form,
        handleSubmit,
        resetFilter,
    } = useFilter();


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <AdvanceFilter
                    resetFilter={resetFilter}
                >
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Report Date</label>
                            <div className="flex gap-2">
                                {/* <FormDatepicker 
                                    name="reportDate"
                                    label=""
                                    control={form.control}
                                    isRequired={false}
                                /> */}
                                <FormDateRangePicker
                                    startName="startDateReport"
                                    endName="endDateReport"
                                    label=""
                                    placeholder="Search Report Date"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Transaction Date</label>
                            <div className="flex gap-2">
                                <FormDateTimePicker 
                                    name="startDateTransaction"
                                    label=""
                                    control={form.control}
                                    isRequired={false}
                                    posisition="left"
                                />
                                <FormDateTimePicker 
                                    name="endDateTransaction"
                                    label=""
                                    control={form.control}
                                    isRequired={false}
                                    // posisition="left"
                                    posisition="buttom"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Invoice Date</label>
                            <div className="flex gap-2">
                                {/* <FormDatepicker 
                                    name="invoiceDate"
                                    label=""
                                    control={form.control}
                                    isRequired={false}
                                /> */}
                                <FormDateRangePicker
                                    startName="startDateInvoice"
                                    endName="endDateInvoice"
                                    label=""
                                    placeholder="Search Invoice Date"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Paid At</label>
                            <div className="flex gap-2">
                                <FormDateTimePicker 
                                    name="startDatePaid"
                                    label=""
                                    control={form.control}
                                    isRequired={false}
                                    posisition="left"
                                />
                                <FormDateTimePicker 
                                    name="endDatePaid"
                                    label=""
                                    control={form.control}
                                    isRequired={false}
                                    posisition="left"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Bussnies Partner</label>
                            <FormInput 
                                name="bussniesPartner"
                                label=""
                                placeholder="Search Bussnies Partner"
                                control={form.control}
                                isRequired={false}
                                withIcon={true}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Report ID</label>
                            <FormInput 
                                name="reportId"
                                label=""
                                placeholder="Search Report ID"
                                control={form.control}
                                isRequired={false}
                                withIcon={true}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Invoice Number</label>
                            <FormInput 
                                name="invoiceNo"
                                label=""
                                placeholder="Search Invoice Number"
                                control={form.control}
                                isRequired={false}  
                                withIcon={true}
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Request Id</label>
                            <FormInput 
                                name="requestId"
                                label=""
                                placeholder="Search Request ID"
                                control={form.control}
                                isRequired={false}  
                                withIcon={true}
                            />
                        </div>


                        
                        
                    </div>
                </AdvanceFilter>
            </form>
        </Form>
    )
}

export default FormFilter;
