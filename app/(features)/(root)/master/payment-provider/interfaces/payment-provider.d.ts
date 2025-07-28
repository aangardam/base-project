export type TPaymentProvider = {
    id: number;
    code: string;
    name: string;
    email:string;
    address:string;
    description:string;
}

export type TGetListResponse = TPaymentProvider;
