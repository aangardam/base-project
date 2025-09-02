/* eslint-disable @typescript-eslint/no-explicit-any */

import { CalendarIcon } from "lucide-react";
// import InputDatePicker from "../ui/date-picker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import InputDateTimePicker from "../ui/datetimepicker";


type PropTypes = {
  name: string;
  label?: string;
  control?: any;
  isRequired?: boolean;
  posisition?: string;
};

const FormDateTimePicker = ({ name, control, isRequired, label, posisition='left' }: PropTypes) => {
    
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel isRequired={isRequired}>{label}</FormLabel>}
                    <FormControl>
                        <div className="relative w-full">
                            <InputDateTimePicker
                                value={field.value || ''}
                                onChange={(date: any) =>
                                    field.onChange(
                                        date?.isValid
                                            ? date.format(
                                                    'YYYY/MM/DD HH:mm:ss',
                                                )
                                            : '',
                                    )
                                }
                                containerStyle={{
                                    width: '100%',
                                }}
                                position={posisition}
                            />
                            <CalendarIcon className="absolute right-2 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default FormDateTimePicker;
