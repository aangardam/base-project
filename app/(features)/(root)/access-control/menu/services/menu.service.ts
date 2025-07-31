/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBaseResponse, TPayloadGetList } from "@/shared/interfaces/global";
import endpoint from "@/shared/lib/endpoin";
import { RequestAdapter } from "@/shared/lib/http/request-adapter";
import { TMenuRequestBody, TMenuResponse, TMenuTreeRequestBody } from "../interfaces/menu";


export class MenuService extends RequestAdapter {
    constructor() {
        super();
    }

    public async getMenuTree():Promise<IBaseResponse<Array<any>>> {
        try {
            const { data } = await this.sendGetRequest<
                IBaseResponse<Array<any>>
            >(`${endpoint.access}/access-management/menu/tree`);

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async updateMenuTree(body:TMenuTreeRequestBody): Promise<IBaseResponse<string>> {
        try {
            const { data } = await this.sendPutRequest<
            TMenuTreeRequestBody,
                IBaseResponse<string>
            >(`${endpoint.access}/access-management/menu/tree/update`, body);

            return data;
        } catch (error) {
            throw error;
        }
    } 

    public async getList(
        payload: TPayloadGetList,
    ): Promise<IBaseResponse<Array<TMenuResponse>>> {
        try {
            const { data } = await this.sendPostRequest<
                TPayloadGetList,
                IBaseResponse<Array<TMenuResponse>>
            >(`${endpoint.access}/access-management/menu/list`, payload);

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async updateMenu(body:TMenuRequestBody): Promise<IBaseResponse<string>> {
        try {
            const { data } = await this.sendPutRequest<
                TMenuRequestBody,
                IBaseResponse<string>
            >(`${endpoint.access}/access-management/menu/update`, body);

            return data;
        } catch (error) {
            throw error;
        }
    }

}