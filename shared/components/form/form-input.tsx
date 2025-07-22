/* eslint-disable @typescript-eslint/no-explicit-any */

import { maxMinLength } from "@/shared/utils/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Search} from "lucide-react";

type PropTypes = {
  name: string;
  label?: string;
  type?: "text" | "password" | "number" | "email" | "textArea";
  placeholder: string;
  control?: any;
  isPassword?: boolean;
  token?:string | null;
  isRequired?: boolean;
  maxLength?: number;
  minLength?: number;
  withIcon?: boolean;
};

const FormInput = ({ name, label, type = "text", placeholder, control, isPassword = false, isRequired = true, maxLength, minLength, withIcon = false, }: PropTypes) => {

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel isRequired={isRequired}>{label}</FormLabel>}
          <FormControl>
            <div className="relative w-full">
              {withIcon &&  (
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none z-20" />
              )}
              {type !== 'textArea' ? (
                  type === 'number' ? (
                      <Input
                          type={type} 
                          placeholder={placeholder} 
                          {...field} 
                          onInput={(e) => maxMinLength(e, Number(minLength), Number(maxLength))}
                          className={`${withIcon ? "pl-9" : ""} pr-3`}
                      />
                  ):(
                      <Input
                          isPassword = {isPassword}
                          showPasswordIcon = {isPassword}
                          type={type} 
                          placeholder={placeholder} 
                          {...field} 
                          className={`${withIcon ? "pl-9" : ""} pr-3`}
                      />
                  )
              ):(
                  <Textarea
                      placeholder={placeholder}
                      className="resize-none"
                      {...field}
                      
                  />
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
