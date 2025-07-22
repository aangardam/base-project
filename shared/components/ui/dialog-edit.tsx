import { Button } from "@/shared/components/ui/button"
import { FaEdit } from 'react-icons/fa';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog"
import { ReactElement, useState, cloneElement, isValidElement } from "react";

interface formDialogProps {
  children: ReactElement<{ onClose?: () => void }>;
  title?: string;
}

const DialogEdit = ({ children, title } : formDialogProps) => {
  const [open, setOpen] = useState(false);
  const childrenWithOnClose = isValidElement(children)
    ? cloneElement(children, { onClose: () => setOpen(false) })
    : children;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
            <Button variant="outlinePrimary">
                <FaEdit />
            </Button>
            
        </DialogTrigger>
        <DialogContent className="lg:w-3/4  p-4 max-h-[97vh]">
            <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription className="text-sm">View/Update Menu. Click save when you are done.</DialogDescription>
            </DialogHeader>
            {childrenWithOnClose}
        
        </DialogContent>
    </Dialog>
  )
}

export default DialogEdit