"use client"

 
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { TPaymentProvider } from "../interfaces/payment-provider"
import FormWrapper from "@/shared/components/form/form-wrapper"
import { BsDownload, BsXLg } from "react-icons/bs"

import FormInput from "@/shared/components/form/form-input"
import useAddPaymentProvider from "../hooks/use-add-payment-provider"
 

interface PropTypes {
    data?: TPaymentProvider;
    onClose?: () => void;
}

const FormPaymentProvider = (props:PropTypes) => {
  const { data, onClose } = props;

  const { 
    form,
    handleAdd 
  } = useAddPaymentProvider(data, onClose);

  
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-8">
          <FormWrapper>
            <FormInput 
                name="code" 
                label="Code"
                placeholder="Input Code" 
                control={form.control}
            />

            <FormInput 
                name="name" 
                label="Bussiness Name"
                placeholder="Bussiness Name" 
                control={form.control}
            />

            <FormInput 
                name="email" 
                label="E-Mail"
                placeholder="Email Address Bussiness Partner"
                control={form.control}
                isRequired={false}
            />

            <FormInput 
                name="address"
                label="Address"
                placeholder="Full Address Bussiness Partner"
                control={form.control}
                type="textArea"
                isRequired={false}
            />
            
            <FormInput 
                name="description"
                label="Description"
                placeholder="Bussiness Partner Description"
                control={form.control}
                type="textArea"
                isRequired={false}
            />
            
          </FormWrapper>

          <div className="flex justify-end gap-5">
              <Button 
                variant="redGradient"
                onClick={onClose}
                type="button"
                className="px-5 w-[130px]"
              >
                  <BsXLg className="mr-2" />
                  Cancel
              </Button>
              <Button 
                variant="primary"
                type="submit"
                className="px-5 w-[130px]"
              >
                  <BsDownload className="mr-2" />
                  Save
              </Button>
          </div>

        </form>
      </Form>

  )
}

export default FormPaymentProvider