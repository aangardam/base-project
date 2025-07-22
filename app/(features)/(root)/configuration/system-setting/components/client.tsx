import { TSystemSetting } from "../interfaces/system-setting";
import { columns } from "./columns"
import { DataTable } from "@/shared/components/ui/data-table"
import { useState } from "react";
import FormSystemSetting from "./form-system-setting";
import DialogAdd from "@/shared/components/ui/dialog-add";

export default function Client() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search)
  const data: TSystemSetting[] = [
    {
      id: 1,
      name: "VERIFY_TOKEN_EXPIRED",
      description: "IN SECONDS",
      value: "3600",
    },
    {
      id: 2,
      name: "RESET_PASSWORD_EXPIRED",
      description: "IN SECONDS",
      value: "1800",
    },

  ];

  const totalData = data.length;
  const totalFilteredData = data.length;

  const [open, setOpen] = useState(false)
  return (
    <div className="container mx-auto py-10">
      <DataTable 
        columns={columns}
        data={data || []}
        isLoading={false}
        pagination={pagination}
        onPaginationChange={setPagination}
        sorting={sorting}
        onSortingChange={setSorting}
        filter={(value) => setSearch(value)}
        totalData={totalData}
        totalFilteredData={totalFilteredData}
        nameAddButton="Add"
        onClickAdd={() => setOpen(true)}
      />

      <DialogAdd
        open={open}
        onOpenChange={setOpen}
        title="System Setting"
      >
        <FormSystemSetting onClose={() => setOpen(false)} />
      </DialogAdd>

    </div>
  )
}
