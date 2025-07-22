"use client"

 
import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import { TSystemSetting } from "../interfaces/system-setting"
import FormWrapper from "@/shared/components/form/form-wrapper"
import { BsDownload, BsXLg } from "react-icons/bs"
import useAddSystemSetting from "../hook/use-add-system-setting"
import FormInput from "@/shared/components/form/form-input"
 

interface PropTypes {
    data?: TSystemSetting;
    onClose?: () => void;
}

const FormSystemSetting = (props:PropTypes) => {
  const { data, onClose } = props;

  const { 
    form,
    handleAdd 
  } = useAddSystemSetting(data, onClose);

  
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleAdd)} className="space-y-8">
          <FormWrapper>
            <FormInput 
                name="name" 
                label="Name"
                placeholder="Input Name" 
                control={form.control}
            />
            
            <FormInput 
                name="description"
                label="Description"
                placeholder="Input Description" 
                control={form.control}
                type="textArea"
            />
            <FormInput 
                name="value" 
                label="Value"
                placeholder="Input Value" 
                control={form.control}
                type="number"
                maxLength={99}
                minLength={0}
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

export default FormSystemSetting