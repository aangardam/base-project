"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUp } from "lucide-react"
 
import { Button } from "@/shared/components/ui/button"
// import CellAction from "./cell-action"
import { CellAction } from "@/shared/components/ui/cell-action"

import { TLogsReqBussniespartner } from "../interface/request-bussnies-partner"
import { Badge } from "@/shared/components/ui/badge"
import { getBadgeColor } from "@/shared/utils/utils"
import { BsCheckSquare, BsHourglassTop, BsXLg } from "react-icons/bs"
import DataDetail from "./data-detail"



export const columns: ColumnDef<TLogsReqBussniespartner>[] = [
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
    accessorKey: "requestId",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          REQUEST ID
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
    accessorKey: "bussniesPartner",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BUSNIESS PARTNER
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
    accessorKey: "reportId",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          REPORT ID
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
    accessorKey: "reportDate",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          REPORT DATE
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
    accessorKey: "orderId",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ORDER ID
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
    accessorKey: "submitTime",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SUBMIT TIME
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
    accessorKey: "status",
    header:"STATUS",
    cell: ({ row }) => {
        const status = row.original.status;
        let icon = <BsCheckSquare className="mr-2" />
        let color = 'success'
        if(status === 'Failed'){
            icon = <BsXLg className="mr-2" />
            color="Danger"
        }
        if(status === 'In-Progress'){
            icon = <BsHourglassTop className="mr-2" />
            color="Gray"
        }
        return (
            <div className="whitespace-nowrap flex items-center">
                <Badge variant={getBadgeColor(color)}>
                {icon} {status}
                </Badge>
            </div>
        );
    },
  },
  {
    accessorKey: "trxCount",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          // className="flex items-center gap-2 text-wrap"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TRX COUNT
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
      return row.original && DataDetail ? (
        <CellAction 
          row={row.original} 
          title="Detail Payload" 
          actionDelete={false}
          actionUpdate={false}
          actionView={true}
          formComponent={DataDetail}
        />
      ) : null;
    },
  },
]
