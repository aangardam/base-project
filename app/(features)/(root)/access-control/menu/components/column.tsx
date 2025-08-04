"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUp } from "lucide-react"
 
import { Button } from "@/shared/components/ui/button"
// import CellAction from "./cell-action"

import { CellAction } from "@/shared/components/ui/cell-action"
import { TMenu } from "../interfaces/menu"
import FormMenu from "./form-menu"

export const columns: ColumnDef<TMenu>[] = [
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
          // className="text-wrap"
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
    accessorKey: "url",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">url</span>
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
    accessorKey: "icon",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">icon</span>
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
    accessorKey: "parentName",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">parent name</span>
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    },
    meta: {
        label: "Parent Name",
      },
  },
  {
    id: "actions",
    header:"Action",
    cell:({row}) => {
      return <CellAction 
              title="Menu"
              row={row.original}
              formComponent={FormMenu}

              actionUpdate={true}
              dialogSizeUpdate="lg"

              actionDelete={false}

            />
    },
  },
]
