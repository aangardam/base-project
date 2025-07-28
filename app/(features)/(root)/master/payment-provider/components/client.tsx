import { TPaymentProvider } from "../interfaces/payment-provider";
import { columns } from "./columns"
import { DataTable } from "@/shared/components/ui/data-table"
import { useState } from "react";
import DialogAdd from "@/shared/components/ui/dialog-add";
import FormPaymentProvider from "./form-payment-provider";

export default function Client() {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState([]);
  const [search, setSearch] = useState("");
  console.log(search)
  const data: TPaymentProvider[] = [
    {
      id: 1,
      code: "A001",
      name: "Aplikasi ABC",
      email: "abc@gmail.com",
      address: "Jl. Sido Mulyo No.29, Sukaluyu, Kec. Cibeunying Kaler, Kota Bandung",
      description: "System Ancillary Business Channel",
    },
    {
      id: 2,
      code: "A002",
      name: "POS Retail",
      email: "pos@gmail.com",
      address: "Jl. Dago No. 15, Kota Bandung",
      description: "Point of Sales integration with store",
    },
    {
      id: 3,
      code: "A003",
      name: "Booking Engine",
      email: "booking@domain.com",
      address: "Jl. Cihampelas No. 101, Kota Bandung",
      description: "Online booking system for passengers",
    },
    {
      id: 4,
      code: "A004",
      name: "Inventory Management",
      email: "inventory@corp.com",
      address: "Jl. Merdeka No. 17, Bandung",
      description: "Manages item stock and logistics",
    },
    {
      id: 5,
      code: "A005",
      name: "E-Payment Gateway",
      email: "epay@fintech.com",
      address: "Jl. Soekarno Hatta No. 9, Bandung",
      description: "Digital payment processing service",
    },
    {
      id: 6,
      code: "A006",
      name: "HRIS System",
      email: "hris@company.com",
      address: "Jl. Riau No. 22, Bandung",
      description: "Human Resource Information System",
    },
    {
      id: 7,
      code: "A007",
      name: "Fleet Management",
      email: "fleet@transport.co.id",
      address: "Jl. Cipaganti No. 30, Bandung",
      description: "Monitors and manages vehicle operations",
    },
    {
      id: 8,
      code: "A008",
      name: "Maintenance Tracker",
      email: "maint@system.com",
      address: "Jl. Buah Batu No. 45, Bandung",
      description: "Tracks equipment and asset maintenance",
    },
    {
      id: 9,
      code: "A009",
      name: "Customer Portal",
      email: "support@portal.com",
      address: "Jl. Pasteur No. 3, Bandung",
      description: "Customer service and complaint system",
    },
    {
      id: 10,
      code: "A010",
      name: "Business Analytics",
      email: "analytics@data.com",
      address: "Jl. Asia Afrika No. 100, Bandung",
      description: "Dashboard and reporting system",
    },
  ];
  

  const totalData = data.length;
  const totalFilteredData = data.length;


  const [open, setOpen] = useState(false)
  return (
    <div className="container mx-auto py-10">
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
        nameAddButton="Add"
        onClickAdd={() => setOpen(true)}
        
      />

      <DialogAdd
        open={open}
        onOpenChange={setOpen}
        title="Payment Provider"
      >
        <FormPaymentProvider onClose={() => setOpen(false)} />
      </DialogAdd>
    </div>
  )
}
