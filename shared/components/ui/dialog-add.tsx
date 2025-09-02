import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/shared/components/ui/dialog";
import { DialogSize, getDialogSizeClass } from "@/shared/utils/utils";
import { DialogDescription } from "@radix-ui/react-dialog";
  
  interface CrudDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    title?: string;
    children: React.ReactNode;
    size?: DialogSize;
  }
  
  export default function DialogAdd({
    open,
    onOpenChange,
    title = "Tambah Data",
    children,
    size = "md",
  }: CrudDialogProps) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        {/* <DialogContent className="lg:w-3/4  p-4 max-h-[97vh]"> */}
        <DialogContent className={`p-4 max-h-[97vh] ${getDialogSizeClass(size)}`}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-sm">Add new data {title}</DialogDescription>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  