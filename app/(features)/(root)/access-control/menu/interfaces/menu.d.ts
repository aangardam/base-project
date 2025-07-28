import { TUserMenuInfo } from "@/shared/interfaces/global";

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
