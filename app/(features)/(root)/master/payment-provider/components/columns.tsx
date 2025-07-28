"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUp } from "lucide-react"
 
import { Button } from "@/shared/components/ui/button"
// import CellAction from "./cell-action"
import { TPaymentProvider } from "../interfaces/payment-provider"
import { CellAction } from "@/shared/components/ui/cell-action"
import FormPaymentProvider from "./form-payment-provider"



export const columns: ColumnDef<TPaymentProvider>[] = [
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
    accessorKey: "code",
    enableHiding: false,
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CODE
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
    id: "actions",
    header:"Action",
    cell:({row}) => {
      // return <CellAction row={row.original} name="Bussiness Partner" />
      return <CellAction 
              row={row.original} 
              title="Payment Provider"
              formComponent={FormPaymentProvider}
              params={row.original.code}
            />
    },
  },
]
