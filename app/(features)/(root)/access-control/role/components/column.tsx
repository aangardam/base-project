"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUp } from "lucide-react"
import { Button } from "@/shared/components/ui/button"
import { CellAction } from "@/shared/components/ui/cell-action"
import { TRole } from "../interfaces/role"
import FormRole from "./form-role"

export const columns: ColumnDef<TRole>[] = [
  {
    accessorKey: "rowNum",
    header: "No",
  },
  {
    accessorKey: "name",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">name</span>
          <ArrowUp 
            className={`ml-2 h-4 w-full ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    },
  },
  {
    id: "actions",
    header:"Action",
    cell:({row}) => {
      return <CellAction 
              title="Role"
              row={row.original}
              formComponent={FormRole}
              actionUpdate={true}
              dialogSizeUpdate="lg"
              actionDelete={row.original.name !== 'Default Role' ? true : false}
              params={row.original.name}
              deleteActionType="role"
            />
    },
  },
]
