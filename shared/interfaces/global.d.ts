/* eslint-disable @typescript-eslint/no-explicit-any */

export type SelectOption = any;

export type SelectOptions = SelectOption[];
export type TBaseResponse<T> = {
    success: boolean;
    message: string;
    code: number;
    recordsTotal?: number;
    recordsFiltered?: number;
    data: T;
    subTotal?: number;
    total?: number;
    totalPages?: number;
    pagination?: {
        recordsTotal: number;
        recordsFiltered: number;
        totalPages: number;
    };
}

export type TPayloadGetList = {
    order: {
        column: string;
        dir: string;
    }[];
    search: {
        regex: boolean;
        value: string;
    };
    length: number;
    start: number;
}

