
import { AlertDialogDelete } from "./alert-dialog-delete";
import { Button } from "./button";
import DialogEdit from "./dialog-edit"
import { Search } from "lucide-react";
import DialogView from "./dialog-view";
import Link from "next/link";


interface HasId {
  id: string | number;
}

interface FormDialogGlobalProps<T> {
  actionDelete?: boolean;
  actionUpdate?: boolean;
  actionView?: boolean;
  title?: string
  row: T
  formComponent?: React.ComponentType<{ data: T }>
  params?: string;
  isPopUp?: boolean;
  link?: string;
}
  
export function CellAction<T extends HasId>(props: FormDialogGlobalProps<T>) {
  

  const {
    actionDelete = true,
    actionUpdate = true,
    actionView = false,
    title = "Form",
    row,
    formComponent: FormComponent,
    isPopUp = true,
    params,
    link = ''
  } = props;

  const handleDelete = () => {
    console.log("delete", row?.id)
  }

  return (
    <div className="flex justify-center">
      {actionView && (
        isPopUp && FormComponent ? (
          <DialogView>
            {FormComponent && <FormComponent data={row} />}
          </DialogView>
        ) : (
         <Link href={link}>
          <Button variant="outlinePrimary">
            <Search className="mr-1 w-4 h-4" />
            View
          </Button>
        </Link>
        )
      )}

      {actionUpdate && FormComponent && (
        <DialogEdit title={title}>
          <FormComponent data={row} />
        </DialogEdit>
      )}
      {actionDelete && (
          <AlertDialogDelete  
            onAction={handleDelete}
            title={title}
            params={params}
          />
      )}
      
    </div>
  )
}
  