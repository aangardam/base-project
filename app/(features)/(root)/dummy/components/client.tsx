
'use client';

import { DataTable } from "@/shared/components/ui/data-table"
import { columns } from "./columns"
import useListDummy from "../hooks/use-list-dummy";
import { useState } from "react";
import DialogAdd from "@/shared/components/ui/dialog-add";
import FormDummy from "./form-dummy";

export default function Client() {
    const {
      ListData,
      isPending,
      onPaginationChange,
      onSortingChange,
      handleFilter,
      pagination,
      sorting,
    } = useListDummy();

 
    const [open, setOpen] = useState(false);
    return (
      <div className="container mx-auto py-10">
        <DataTable 
            columns={columns} 
            data={ListData?.data || []} 
            isLoading={isPending}
            onPaginationChange={onPaginationChange}
            pageCount={ListData?.pagination?.totalPages || 1}
            pagination={pagination}
            sorting={sorting}
            onSortingChange={onSortingChange}
            filter={handleFilter}
            totalData={ListData?.pagination?.recordsTotal || 0}
            totalFilteredData={ListData?.pagination?.recordsFiltered || 0}
            nameAddButton="Add"
            onClickAdd={() => setOpen(true)}
        />
            
        <DialogAdd
            open={open}
            onOpenChange={setOpen}
            title="Profile"
            size="md"
        >
            <FormDummy onClose={() => setOpen(false)} />
        </DialogAdd>
      </div>
    )
}