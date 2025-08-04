/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUserMenuInfo } from "@/shared/interfaces/global";

export type TRole = {
    id: number;
    name: string;
    menuFunctionIds:string[];
    menuFunctionIdsDisable:string[];
    rowNum:number;
}

export type TRoleResponse = TRole;

export type TRoleRequestBody = {
    requestId: string;
    requestTime: string;
    data: {
        id?: number;
        name: string;
        menuFunctionIds: string[];
        userMenuInfo: TUserMenuInfo;
    },

}

export type TRoleDeleteRequestBody = {
    requestId: string;
    requestTime: string;
    data: {
        id: number;
        userMenuInfo: TUserMenuInfo;
    }
}



