import { DataTable } from "@/shared/components/ui/data-table"
import { columns } from "./column";
import useMenu from "../hooks/use-menu";

export default function Client() {

  const {
    ListMenu,
    isPending,
    onPaginationChange,
    onSortingChange,
    handleFilter,
    pagination,
    sorting, 
    pageCount,
  } = useMenu();

  return (
    <div className="container mx-auto py-10">
      <DataTable 
        columns={columns}
        data={ListMenu?.data || []}
        isLoading={isPending}
        onPaginationChange={onPaginationChange}
        pageCount={pageCount}
        pagination={pagination}
        sorting={sorting}
        onSortingChange={onSortingChange}
        filter={handleFilter}
        totalData={ListMenu?.totalRecord || 0}
        totalFilteredData={ListMenu?.filteredRecord || 0}
      />

    </div>
  )
}
