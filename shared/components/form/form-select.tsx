/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import CoolSelect, {
    getSingleValue,
    onSingleChange,
} from '../ui/cool-select';
import { SelectOption } from "@/shared/interfaces/global";


interface PropTypes {
    name: string;
    label?: string;
    placeholder: string;
    control?: any;
    listData: any[];
    isRequired?: boolean;
}

const FormSelect = (props: PropTypes) => {
    const { 
        name, 
        label,  
        placeholder, 
        control, 
        listData,
        isRequired = true,
    } = props;

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => {
                const value = getSingleValue(
                    listData,
                    field.value,
                    (option: any) => option.value,
                );
                return (
                    <FormItem>
                        {label && <FormLabel isRequired={isRequired}>{label}</FormLabel>}
                        <FormControl>
                            <CoolSelect<SelectOption, true>
                                options={
                                    listData
                                }
                                value={value}
                                onChange={(newValues) => {
                                    onSingleChange(
                                        newValues,
                                        field.onChange,
                                    );
                                }}
                                hideSelectedOptions={false}
                                placeholder={placeholder}
                                menuPortalTarget={typeof window !== 'undefined' ? document.body : null}
                                menuPosition="fixed"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                );
            }}
        />
    )
}

export default FormSelect;