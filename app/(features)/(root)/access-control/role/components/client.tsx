import { DataTable } from "@/shared/components/ui/data-table"
import { columns } from "./column";
import useRole from "../hooks/use-role";
import { useState } from "react";
import DialogAdd from "@/shared/components/ui/dialog-add";
import FormRole from "./form-role";

export default function Client() {

  const {
    ListRole,
    isPending,
    onPaginationChange,
    onSortingChange,
    handleFilter,
    pagination,
    sorting, 
    pageCount,
  } = useRole();

  
  const [open, setOpen] = useState(false)
  return (
    <div className="container mx-auto py-10">
      <DataTable 
        columns={columns}
        data={ListRole?.data || []}
        isLoading={isPending}
        onPaginationChange={onPaginationChange}
        pageCount={pageCount}
        pagination={pagination}
        sorting={sorting}
        onSortingChange={onSortingChange}
        filter={handleFilter}
        totalData={ListRole?.totalRecord || 0}
        totalFilteredData={ListRole?.filteredRecord || 0}
        nameAddButton="Add"
        onClickAdd={() => setOpen(true)}
      />

      <DialogAdd
        open={open}
        onOpenChange={setOpen}
        title="Role"
        size="xl"
      >
        <FormRole onClose={() => setOpen(false)} />
      </DialogAdd>

    </div>
  )
}
