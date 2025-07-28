/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBaseResponse } from "@/shared/interfaces/global";
import endpoint from "@/shared/lib/endpoin";
import { RequestAdapter } from "@/shared/lib/http/request-adapter";


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
}