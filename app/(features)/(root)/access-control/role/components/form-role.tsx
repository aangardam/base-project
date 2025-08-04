/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/shared/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form"
import FormWrapper from "@/shared/components/form/form-wrapper"
import { BsDownload, BsXLg } from "react-icons/bs"
import FormInput from "@/shared/components/form/form-input"

import { TRole } from "../interfaces/role"
import useActionRole from "../hooks/use-action-role"
import useRoleTree from "../hooks/use-role-tree"
import { Switch } from "@/shared/components/ui/switch" 
import MultiSelectCheckbox from "@/shared/components/ui/multi-checkbox"


interface PropTypes {
    data?: TRole;
    onClose?: () => void;
}

const FormRole = (props:PropTypes) => {
    const { data, onClose } = props;
    const { 
        form,
        handleSubmit,
        isPendingRole 
    } = useActionRole(data, onClose);

    const { 
        dataRoleTree, 
        hideTree,
        setHideTree,
        transformDataTree,
        idsList,
     } = useRoleTree(data, form);

    //  console.log(form.control)

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                <FormWrapper>
                    <div className="flex justify-between mx-1 gap-10">
                        <div className="flex flex-col gap-5 w-full">
                            <FormInput 
                                name="name" 
                                label="Name"
                                placeholder="Input Name" 
                                control={form.control}
                            />
                            {dataRoleTree?.data?.isAllMenuChecked && (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-5">
                                        <FormLabel
                                            isRequired={false}
                                            className="text-base"
                                        >
                                            All Menu
                                        </FormLabel>
                                        {/* <FormDescription>
                                            you get access to all features and
                                            permissions
                                        </FormDescription> */}
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={hideTree}
                                            onCheckedChange={(checked) => {
                                                setHideTree(checked);
                                                if (checked) {
                                                    form.setValue('menuFunctionIds', [1]);
                                                    return;
                                                } else {
                                                    form.setValue('menuFunctionIds', []);
                                                }
                                            }}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        </div>
                        <div className="flex flex-col gap-5 w-full">    
                            {!hideTree && (
                                <>
                                    {idsList.length > 0 ? (
                                        <FormField
                                            control={form.control}
                                            name="menuFunctionIds"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Access Name
                                                    </FormLabel>
                                                    <FormControl>
                                                        <MultiSelectCheckbox
                                                            disabledIds={data?.menuFunctionIdsDisable}
                                                            options={transformDataTree ?? []}
                                                            value={field.value}
                                                            onChange={
                                                                field.onChange
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    ) : (
                                        <div className="w-full animate-pulse">
                                            Fetching access name...
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
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
                        disabled={isPendingRole}
                        isLoading={isPendingRole}
                    >
                        <BsDownload className="mr-2" />
                        {isPendingRole ? 'Loading ...' : 'Save'}
                    </Button>
                </div>

            </form>
        </Form>

    )
}

export default FormRole