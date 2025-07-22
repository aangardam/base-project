
import { TLogsReqBussniespartner } from "../interface/request-bussnies-partner";
import { DataTable } from "@/shared/components/ui/data-table"
import { columns } from "./columns";



export default function Client() {
  const data: TLogsReqBussniespartner[] = [
    {
        id: 1,
        requestId:"REQ-123456789",
        bussniesPartner:"BUSSNIES PARTNER",
        reportId:"REPORT-123456789",
        reportDate:"2023-01-01",
        orderId:"ORDER-123456789",
        submitTime:"2023-01-01 10:00:00",
        trxCount:20,
        status:"Success",
    },
    {
        id: 2,
        requestId:"REQ-123456789",
        bussniesPartner:"BUSSNIES PARTNER 2",
        reportId:"REPORT-123456789",
        reportDate:"2023-01-01",
        orderId:"ORDER-123456789",
        submitTime:"2023-01-01 10:00:00",
        trxCount:2,
        status:"Failed",
    },
    {
        id: 3,
        requestId:"REQ-123456789",
        bussniesPartner:"BUSSNIES PARTNER 3",
        reportId:"REPORT-123456789",
        reportDate:"2023-01-01",
        orderId:"ORDER-123456789",
        submitTime:"2023-01-01 10:00:00",
        trxCount:10,
        status:"In-Progress",
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
        totalData={totalData}
        totalFilteredData={totalFilteredData}
        // nameAddButton="Add"
        // onClickAdd={() => setOpen(true)}
      />

    </div>
  )
}
