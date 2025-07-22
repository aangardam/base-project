import { useState } from "react";
import { TApplicationParameter } from "../interfaces/application-parameter";
import { columns } from "./columns"
import { DataTable } from "@/shared/components/ui/data-table"



export default function Client() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search)
  const data: TApplicationParameter[] = [
    {
      id: 1,
      name: "SCHE_COLLECT_DATA_TRANSACTION_LOG",
      description: "CRON_DAILY",
      value: "10:00",
    },
    {
      id: 2,
      name: "SCHE_COLLECT_SETTLEMENT_PAYMENT_PROVIDER",
      description: "CRON_DAILY",
      value: "09:00",
    },

  ];

  const totalData = data.length;
  const totalFilteredData = data.length;


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
      />

    </div>
  )
}
