"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUp } from "lucide-react"
 
import { Button } from "@/shared/components/ui/button"
// import CellAction from "./cell-action"
import { TApplicationParameter } from "../interfaces/application-parameter"
import { CellAction } from "@/shared/components/ui/cell-action"
import FormApplicationParameter from "./form-application-parameter"



export const columns: ColumnDef<TApplicationParameter>[] = [
  {
    accessorKey: "id",
    header: "No",
    cell: ({ cell }) => {
      return (
          cell.row.index+1
      );
    },
  },
  {
    accessorKey: "name",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NAME
          <ArrowUp 
            className={`ml-2 h-4 w-full ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    }
  },
  {
    accessorKey: "description",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DESCRIPTION
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    }
  },
  {
    accessorKey: "value",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          VALUE
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    }
  },
  {
    id: "actions",
    header:"Action",
    cell:({row}) => {
      // return <CellAction row={row.original} actionDelete={false}  />
      return <CellAction 
              row={row.original} 
              title="Application Parameter" 
              formComponent={FormApplicationParameter}
              actionDelete={false}
              // params={`Code : ${row.original.code}`}
            />
    },
  },
]
