"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUp } from "lucide-react"
 
import { Button } from "@/shared/components/ui/button"
import { CellAction } from "@/shared/components/ui/cell-action"

import { TBusinessPartnerIntegration } from "../interface/business-partner-integration"
import { encrypt, formatRupiah } from "@/shared/utils/utils"


export const columns: ColumnDef<TBusinessPartnerIntegration>[] = [
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
    enableHiding: false,
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
    },
    meta: {
      label: "Request ID",
    },
  },
  {
    accessorKey: "reportId",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
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
    },
    meta: {
      label: "Report ID", // dipakai untuk dropdown column toggle
    },
  },
  {
    accessorKey: "reportDate",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
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
    },
    meta: {
      label: "Report Date", // dipakai untuk dropdown column toggle
    },
  },
  {
    accessorKey: "invoiceNo",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">INVOICE NO.</span>
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    },
    meta: {
      label: "Invoice No.", // dipakai untuk dropdown column toggle
    },
  },
  {
    accessorKey: "invoiceDate",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">invoice date</span>
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    },
    meta: {
      label: "Invoice Date", // dipakai untuk dropdown column toggle
    },
  },
  {
    accessorKey: "transactionDate",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">transaction date</span>
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    },
    meta: {
      label: "Transaction Date", // dipakai untuk dropdown column toggle
    },
  },
  {
    accessorKey: "paidAt",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">paid at</span>
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    },
    meta: {
      label: "Paid At", // dipakai untuk dropdown column toggle
    },
  },
  {
    accessorKey: "businessPartner",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">business partner</span>
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    },
    meta: {
      label: "Business Partner", // dipakai untuk dropdown column toggle
    },
  },
  {
    accessorKey: "paymentAmount",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">payment amount</span>
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    },
    meta: {
      label: "Payment Amount", // dipakai untuk dropdown column toggle
    },
  },
  {
    accessorKey: "totalAmount",
    header:({column}) => {
      return(
        <Button
          variant={"ghost"}
          size={"sm"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="uppercase">total amount</span>
          <ArrowUp 
            className={`ml-2 h-4 w-4 ${
               column.getIsSorted() === "asc" ? "" : "rotate-180"
              } `}
          />

        </Button>
      )
    },
    meta: {
      label: "Total Amount", // dipakai untuk dropdown column toggle
    },
    cell:({row}) =>{
      return(
        <div className="text-right">
          Rp. {formatRupiah(`${row.original.totalAmount}`)}
        </div>
      )
    }
  },
  
  {
    id: "actions",
    header:"Action",
    cell:({row}) => {
    const id = encrypt(row.original.id);
      return <CellAction 
              row={row.original} 
              // title="Detail Payload" 
              actionDelete={false}
              actionUpdate={false}
              actionView={true}
              isPopUp={false}
              link={`/reporting/business-partner-integration/detail/${id}`}
            />
    },
  },
]
