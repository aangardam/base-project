import { Form } from "@/shared/components/ui/form";
import { Button } from "@/shared/components/ui/button";
import { DialogClose } from "@/shared/components/ui/dialog";
import FormInput from "@/shared/components/form/form-input";
import FormSelect from "@/shared/components/form/form-select";
import useActionDummy from "../hooks/use-action-dummy";
import { TDummy } from "../interface/dummy";
import FormWrapper from "@/shared/components/form/form-wrapper";
import { BsDownload, BsXLg } from "react-icons/bs";

interface PropTypes {
    data?:TDummy;
    onClose?: () => void;
}

const FormDummy = (props: PropTypes) => {
    const { data, onClose } = props;
    const {
      form,
      handleAddDummy,
      isAddDummyLoading,
    } = useActionDummy(data, onClose);

    const dropdownOptions = [
      { value: true, label: 'True' },
      { value: false, label: 'False' },
    ];
    return (
      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(handleAddDummy)}
          className="space-y-6"
        >
          <FormWrapper>
            <FormInput 
                name="name" 
                label="name"
                placeholder="Input Name" 
                control={form.control}
            />
            
            <FormInput 
                name="total"
                label="Total"
                placeholder="Input Total"
                type="number" 
                control={form.control}
            />

            <FormSelect 
                name="status"
                label="Status"
                placeholder="Select Status"
                control={form.control}
                listData={dropdownOptions}
            />

            <FormInput 
                name="description"
                label="Description"
                placeholder="... Description"
                type="textArea"
                control={form.control}
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
                    variant="primaryGradient"
                    type="submit"
                    className="px-5 w-[130px]"
                    // disabled={isPendingMenu}
                    // isLoading={isPendingMenu}
                >
                    <BsDownload className="mr-2" />
                    Save
                </Button>
            </div>
        </form>

      </Form>
    )
  }
  
  export default FormDummy
  