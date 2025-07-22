export type TLogsReqBussniespartner = {
    id: number;
    requestId: string;
    bussniesPartner: string;
    reportId: string;
    reportDate: string;
    orderId: string;
    submitTime: string;
    status: string;
    trxCount: number;
}

export type TGetListResponse = TLogsReqBussniespartner;
