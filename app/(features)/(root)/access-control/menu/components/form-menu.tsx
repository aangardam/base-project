"use client"

import { Button } from "@/shared/components/ui/button"
import { Form } from "@/shared/components/ui/form"
import FormWrapper from "@/shared/components/form/form-wrapper"
import { BsDownload, BsXLg } from "react-icons/bs"
import FormInput from "@/shared/components/form/form-input"
import { TMenu } from "../interfaces/menu"
import FormCheckbox from "@/shared/components/form/form-checkbox"
import useDropdown from "@/shared/hooks/use-dropdown"
import FormSelect from "@/shared/components/form/form-select"
import useEditMenu from "../hooks/use-edit-menu"
 

interface PropTypes {
    data?: TMenu;
    onClose?: () => void;
}

const FormMenu = (props:PropTypes) => {
  const { data, onClose } = props;

  const { 
    form,
    handleSubmit,
    isPendingMenu 
  } = useEditMenu(data, onClose);

  const { 
    dataDropdownMenu, 
    loadingDropdownMenu,
    dataDropdownFuntion,
    loadingDropdownFuntion
} = useDropdown();

  
  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
            <FormWrapper>
                <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap -mt-5">
                    <FormInput 
                        name="name" 
                        label="Name"
                        placeholder="Input Name" 
                        control={form.control}
                    />
                    
                    <FormInput 
                        name="url"
                        label="URL"
                        placeholder="Input URL" 
                        control={form.control}
                        isDisabled={!!data}
                    />
                </div>
                <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap">
                    <FormInput 
                        name="icon" 
                        label="Icon"
                        placeholder="Input Icon" 
                        control={form.control}
                        description={
                            <>
                                An example of an icon can be seen{' '}
                                <span
                                    onClick={() =>
                                    window.open(
                                        'https://react-icons.github.io/react-icons/icons/bs/',
                                        '_blank' // agar buka di tab baru
                                    )
                                    }
                                    className="text-blue-500 cursor-pointer underline"
                                >
                                    here
                                </span>
                            </>
                        }
                    />

                    <FormSelect 
                        name="parentId"
                        label="Parent"
                        placeholder="Select Parent"
                        control={form.control}
                        listData={dataDropdownMenu || []}
                        loading={loadingDropdownMenu}
                        isDisabled={!!data}
                        
                    />
                </div>
                <div className="flex justify-between gap-5 flex-wrap md:flex-nowrap">

                    <FormSelect 
                        name="functionId"
                        label="Function"
                        placeholder="Select Funtion"
                        control={form.control}
                        listData={dataDropdownFuntion || []}
                        loading={loadingDropdownFuntion}
                        type="multiple"
                    />

                    <FormCheckbox 
                        name="show"
                        label="Show at sidebar"
                        control={form.control}
                        isRequired={false}
                        description={`you can show or hide this menu at sidebar`}
                    />
                </div>
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
                    variant="primaryGradient"
                    type="submit"
                    className="px-5 w-[130px]"
                    disabled={isPendingMenu}
                    isLoading={isPendingMenu}
                >
                    <BsDownload className="mr-2" />
                    {isPendingMenu ? 'Loading ...' : 'Save'}
                </Button>
            </div>

        </form>
      </Form>

  )
}

export default FormMenu