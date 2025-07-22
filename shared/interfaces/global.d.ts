/* eslint-disable @typescript-eslint/no-explicit-any */

export type SelectOption = any;

export type SelectOptions = SelectOption[];
export interface IBaseResponse<T> {
    success: boolean;
    message: string;
    code: number;
    recordsTotal?: number;
    recordsFiltered?: number;
    data: T;
    subTotal?: number;
    total?: number;
}

export type IPayloadGetList = {
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