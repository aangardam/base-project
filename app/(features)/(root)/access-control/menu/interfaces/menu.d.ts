/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUserMenuInfo } from "@/shared/interfaces/global";

export type TMenu = {
    id: number;
    rowNum?: number;
    name: string;
    url: string;
    icon: string;
    show?: any;
    parentId: number;
    parentName: string;
    functions?: number[];
}

export type TMenuResponse = TMenu;

export type TMenuRequestBody = {
    requestId: string;
    requestTime: string;
    data:{
        id?: number;
        show: any;
        name: string;
        icon: string;
        parentId: number;
        functions: number[];
        authorizeUrl: string;
        userMenuInfo: userMenuInfo;
    }
    
};

export type TMenuTree = {
    id: string;
    name: string;
    subMenu?: TMenuTree[];
}

export type TDataMenuTree = {
    id: number;
    name: string;
    parent: number;
}

export type MenuItemPayload = {
    requestId: string;
    requestTime: string;
    data: {
        menu: TDataMenuTree[];
        userMenuInfo: TUserMenuInfo;
    };
}
