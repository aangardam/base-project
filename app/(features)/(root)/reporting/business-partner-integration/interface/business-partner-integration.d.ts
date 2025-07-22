export type TBusinessPartnerIntegration = {
    id: number;
    requestId: string;
    reportId: string;
    reportDate: string;
    invoiceNo: string;
    invoiceDate: string;
    transactionDate: string;
    paidAt: string;
    businessPartner: string;
    paymentAmount: number;
    totalAmount: number;
}

export type TGetListResponse = TBusinessPartnerIntegration;
