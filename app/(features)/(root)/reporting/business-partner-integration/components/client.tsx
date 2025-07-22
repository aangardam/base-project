
import { TBusinessPartnerIntegration } from "../interface/business-partner-integration";
import { DataTable } from "@/shared/components/ui/data-table"
import { columns } from "./columns";
import { useState } from "react";



export default function Client() {

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search)

  const data: TBusinessPartnerIntegration[] = [
    {
      id: 1,
      requestId: "REQ-001",
      reportId: "REP-001",
      reportDate: "2025-07-01",
      invoiceNo: "INV-2025-0001",
      invoiceDate: "2025-06-28",
      transactionDate: "2025-06-30",
      paidAt: "2025-07-02T09:15:30",
      businessPartner: "PT. Maju Jaya",
      paymentAmount: 2500000,
      totalAmount: 2500000,
    },
    {
      id: 2,
      requestId: "REQ-002",
      reportId: "REP-002",
      reportDate: "2025-07-02",
      invoiceNo: "INV-2025-0002",
      invoiceDate: "2025-06-29",
      transactionDate: "2025-07-01",
      paidAt: "2025-07-03T14:45:00",
      businessPartner: "CV. Sumber Rejeki",
      paymentAmount: 1250000,
      totalAmount: 1500000,
    },
    {
      id: 3,
      requestId: "REQ-003",
      reportId: "REP-003",
      reportDate: "2025-07-03",
      invoiceNo: "INV-2025-0003",
      invoiceDate: "2025-07-01",
      transactionDate: "2025-07-02",
      paidAt: "2025-07-04T11:22:10",
      businessPartner: "PT. Indo Makmur",
      paymentAmount: 3000000,
      totalAmount: 3000000,
    },
    {
      id: 4,
      requestId: "REQ-004",
      reportId: "REP-004",
      reportDate: "2025-07-04",
      invoiceNo: "INV-2025-0004",
      invoiceDate: "2025-07-01",
      transactionDate: "2025-07-03",
      paidAt: "2025-07-11T13:10:05",
      businessPartner: "CV. Anugerah Abadi",
      paymentAmount: 0,
      totalAmount: 500000,
    },
    {
      id: 5,
      requestId: "REQ-005",
      reportId: "REP-005",
      reportDate: "2025-07-05",
      invoiceNo: "INV-2025-0005",
      invoiceDate: "2025-07-02",
      transactionDate: "2025-07-04",
      paidAt: "2025-07-05T10:00:00",
      businessPartner: "PT. Sinar Terang",
      paymentAmount: 1000000,
      totalAmount: 1000000,
    },
    {
      id: 6,
      requestId: "REQ-006",
      reportId: "REP-006",
      reportDate: "2025-07-06",
      invoiceNo: "INV-2025-0006",
      invoiceDate: "2025-07-03",
      transactionDate: "2025-07-05",
      paidAt: "2025-07-11T13:10:05",
      businessPartner: "PT. Cahaya Timur",
      paymentAmount: 0,
      totalAmount: 750000,
    },
    {
      id: 7,
      requestId: "REQ-007",
      reportId: "REP-007",
      reportDate: "2025-07-07",
      invoiceNo: "INV-2025-0007",
      invoiceDate: "2025-07-04",
      transactionDate: "2025-07-06",
      paidAt: "2025-07-08T08:30:45",
      businessPartner: "CV. Karya Bersama",
      paymentAmount: 600000,
      totalAmount: 600000,
    },
    {
      id: 8,
      requestId: "REQ-008",
      reportId: "REP-008",
      reportDate: "2025-07-08",
      invoiceNo: "INV-2025-0008",
      invoiceDate: "2025-07-05",
      transactionDate: "2025-07-07",
      paidAt: "2025-07-09T16:55:10",
      businessPartner: "PT. Global Nusantara",
      paymentAmount: 5000000,
      totalAmount: 5000000,
    },
    {
      id: 9,
      requestId: "REQ-009",
      reportId: "REP-009",
      reportDate: "2025-07-09",
      invoiceNo: "INV-2025-0009",
      invoiceDate: "2025-07-06",
      transactionDate: "2025-07-08",
      paidAt: "2025-07-11T12:10:05",
      businessPartner: "CV. Tiga Saudara",
      paymentAmount: 0,
      totalAmount: 850000,
    },
    {
      id: 10,
      requestId: "REQ-010",
      reportId: "REP-010",
      reportDate: "2025-07-10",
      invoiceNo: "INV-2025-0010",
      invoiceDate: "2025-07-07",
      transactionDate: "2025-07-09",
      paidAt: "2025-07-11T13:10:05",
      businessPartner: "PT. Mandiri Sejahtera",
      paymentAmount: 1750000,
      totalAmount: 1750000,
    },
   
  ];

  const totalData = data.length;
  const totalFilteredData = data.length;


  return (
    <div className="container mx-auto">
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
        isExportPDF={true}
        isExportExcel={true}
      />

    </div>
  )
}
