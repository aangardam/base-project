import useFilter from "../hooks/use-filter";
import { Form } from "@/shared/components/ui/form";
import AdvanceFilter from "@/shared/components/layout/advance-filter";
import FormDatepicker from "@/shared/components/form/form-datepicker";
import FormSelect from "@/shared/components/form/form-select";
import FormInput from "@/shared/components/form/form-input";
import { Button } from "@/shared/components/ui/button";

const FormFilter = () => {
    const {
        form,
        handleSubmit,
        resetFilter,
    } = useFilter();

    const dropDonwStatusOptions = [
        { value: 'all', label: 'All' },
        { value: 'Success', label: 'Success' },
        { value: 'Waiting', label: 'Waiting' },
        { value: 'Failed', label: 'Failed' },
        { value: 'Paid', label: 'Paid' },
    ]
    return (
        <AdvanceFilter>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Report Date */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium"></label>
                            <div className="flex gap-2">
                                <FormDatepicker 
                                    name="reportDate" 
                                    label="Report Date" 
                                    control={form.control}
                                    isRequired={false}
                                />
                            </div>
                        </div>
                        

                        {/* Submitted At: From - To */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Submitted At</label>
                            <div className="flex gap-2">
                                <FormDatepicker 
                                    name="fromSubmittedAt"
                                    control={form.control}
                                    isRequired={false}
                                />
                                <FormDatepicker 
                                    name="toSubmittedAt"
                                    control={form.control}
                                    isRequired={false}
                                />
                            </div>
                        </div>

                        {/* Paid At: From - To */}
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium">Paid At</label>
                            <div className="flex gap-2">
                                <FormDatepicker 
                                    name="fromPaidAt"
                                    label=""
                                    control={form.control}
                                    isRequired={false}
                                />
                                <FormDatepicker 
                                    name="toPaidAt"
                                    label=""
                                    control={form.control}
                                    isRequired={false}
                                />
                            </div>
                        </div>

                        <FormSelect 
                            name="status"
                            label="Status"
                            placeholder="Select Status"
                            control={form.control}
                            listData={dropDonwStatusOptions}
                            isRequired={false}
                        />
                        <FormInput 
                            name="bussniesPartner"
                            label="Bussnies Partner"
                            placeholder="Search Bussnies Partner"
                            control={form.control}
                            isRequired={false}
                            withIcon={true}
                        />
                        <FormInput 
                            name="reportId"
                            label="Report ID"
                            placeholder="Search Report ID"
                            control={form.control}
                            isRequired={false}
                            withIcon={true}
                        />
                        <FormInput 
                            name="otherId"
                            label="Other ID"
                            placeholder="Search Other ID"
                            control={form.control}
                            isRequired={false}  
                            withIcon={true}
                        />

                        <div className="col-span-full flex justify-end gap-4">
                            <Button 
                                variant="redGradient"
                                type="button"
                                className="px-6"
                                onClick={resetFilter}
                            >
                                Reset Filter
                            </Button>
                            <Button
                                variant="primary"
                                type="submit"
                                className="px-6"
                            >
                                Apply Filter
                            </Button>
                        </div>
                        
                    </div>
                </form>
            </Form>
        </AdvanceFilter>
    )
}

export default FormFilter;
