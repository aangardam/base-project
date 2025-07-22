"use client"

import { RootLayout } from "@/shared/components/layout/root-layout";
import CardRekonsialisasiDana from "./components/card-rekonsialisasi-dana";
import CardTotalDana from "./components/card-total-dana";
import CardPerbandinganDana from "./components/card-perbandingan-dana";
import CardStatusJurnal from "./components/card-status-jurnal";
import CardPaymentMatchUnMatch from "./components/card-payment-match";

const DashboardPage = () => {

    const rekonsiliasiDana = {
        data:[
            {
                name: "Dana Masuk",
                value: 550,
                fill:"#60A5FA"
            },
            {
                name: "Data Payment",
                value: 600,
                fill:"#3B82F6"
            }
        ],
        selisih : Number(-83)
    };
        

    const totalDana = '23500000';

    const perbandinganDana = [
        { bulan: "JAN", dana: 7800, fill:"#60A5FA" },
        { bulan: "FEB", dana: 10000, fill:"#3B82F6" },
        { bulan: "MAR", dana: 8500, fill:"#60A5FA" },
        { bulan: "APR", dana: 5000, fill:"#3B82F6" },
    ];

 
    const statusJurnal = [
        { name: "Posted", value: 40, color:"#1D4ED8" },
        { name: "Unposted", value: 50, color:"#93C5FD" },
        { name: "Failed", value: 10, color:"#B91C1C" },
    ];

    const paymentMatchUnMatch = [
        { name: "Match", value: 40, fill:"#60A5FA" },
        { name: "Unmatch", value: 50, fill:"#ff5733" },
    ];

    
    return (
        <RootLayout title="Dashboard - Internal ASDP">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                <CardRekonsialisasiDana data={rekonsiliasiDana} />
                <CardTotalDana data={totalDana}/>
                <CardPerbandinganDana data={perbandinganDana} />
                <CardStatusJurnal data={statusJurnal} />
                <CardPaymentMatchUnMatch data={paymentMatchUnMatch} />
            </div>
            
        </RootLayout>
    )
};

export default DashboardPage;