
import { AlertDialogDelete } from "./alert-dialog-delete";
import { Button } from "./button";
import DialogEdit from "./dialog-edit"
import { Search } from "lucide-react";
import DialogView from "./dialog-view";
import Link from "next/link";
import { DialogSize, getMenuPermission } from "@/shared/utils/utils";
import { useUserStore } from "@/shared/store/user.store";
import { usePathname } from "next/navigation";
import { formatRequestTime, generateRequestId } from "@/shared/utils/request.untils";
import { useDeleteByMenuType } from "@/shared/hooks/use-delete-by-type";


interface HasId {
  id: string | number;
}

interface FormDialogGlobalProps<T> {
  title?: string
  row: T
  formComponent?: React.ComponentType<{ data: T }>

  // view
  actionView?: boolean;
  isPopUp?: boolean;
  link?: string;
  dialogSizeView?: DialogSize;

  // update
  actionUpdate?: boolean;
  dialogSizeUpdate?: DialogSize;

  // delete
  actionDelete?: boolean;
  params?: string;
  deleteActionType?:string;
 
}
  
export function CellAction<T extends HasId>(props: FormDialogGlobalProps<T>) {
  const {
    title = "Form",
    row,
    formComponent: FormComponent,
    actionView = false,
    isPopUp = true,
    link = '',
    dialogSizeView = 'md',
    actionUpdate = true,
    dialogSizeUpdate = 'md',
    actionDelete = true,
    params = '',
    deleteActionType,
  } = props;

  const pathName = usePathname()
  const { userMenuInfo, menuPermission } = useUserStore();
  const permission = getMenuPermission(menuPermission, pathName);
  const mutateDelete = useDeleteByMenuType(deleteActionType ?? "");
 
  const handleDelete = () => {
    // console.log("delete", row?.id)
    const body = {
      requestId:generateRequestId(),
      requestTime:formatRequestTime(),
      data:{
        id: Number(row?.id),
        userMenuInfo: {
            ...userMenuInfo,
            menuId: permission[0].id,
            parent: permission[0].parent,
        },
      }
      
    };
    if (mutateDelete) {
      mutateDelete(body);
    } else {
      console.warn("Delete handler not found for", deleteActionType);
    }
    // console.log('body', body)
  }

  return (
    <div className="flex justify-center">
      {actionView && (
        isPopUp && FormComponent ? (
          <DialogView size={dialogSizeView}>
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
        <DialogEdit title={title} size={dialogSizeUpdate}>
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
  