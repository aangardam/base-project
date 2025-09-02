"use client"

import { ColumnDef } from "@tanstack/react-table"
import { TDummy } from "../interface/dummy"
import { ArrowUp } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Badge } from "@/shared/components/ui/badge";
import { formatRupiah, getBadgeColor } from "@/shared/lib/utils";
import { CellAction } from "@/shared/components/ui/cell-action";
import FormDummy from "./form-dummy";


export const columns: ColumnDef<TDummy>[] = [
  {
    accessorKey: "_id",
    header: "No",
    cell: ({ row, table }) => {
      const pageIndex = table.getState().pagination.pageIndex;
      const pageSize = table.getState().pagination.pageSize;
      return <div>{pageIndex * pageSize + row.index + 1}</div>;
    },
  },
  {
    accessorKey: "name",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
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
    accessorKey: "sttaus",
    header:"Status",
    cell: ({ row }) => {
      let colorBadge = 'Success';
      let text = 'true'
      if(Boolean(row.original.status) !== true ){
        colorBadge = 'Danger';
        text = 'false';
      } 

      return (
        <Badge variant={getBadgeColor(colorBadge)}>
          {text}
        </Badge>
      )
    }
  },
  {
    accessorKey: "total",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        formatRupiah(`${row.original.total}`)
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
          className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Description
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
              formComponent={FormDummy}
              // actionDelete={false}
              params={`${row.original.name}`}
              deleteActionType="dummy"
            />
    },
  },
  
]