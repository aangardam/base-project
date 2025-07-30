/* eslint-disable @typescript-eslint/no-explicit-any */

import { IBaseResponse } from "../interfaces/global";
import endpoint from "../lib/endpoin";
import { RequestAdapter } from "../lib/http/request-adapter";

export class DropdownService extends RequestAdapter {
    constructor() {
       super(); 
    }

    // dropdown menu
    public async getDropdownMenu():Promise<IBaseResponse<Array<any>>>{
        try {
            const { data } = await this.sendGetRequest<
                IBaseResponse<Array<any>>
            >(
                `${endpoint.access}/access-management/menu/list`
            )
            return data
        } catch (error) {
            throw error
        }
    }

    // dropdown function
    public async getDropdownFunction():Promise<IBaseResponse<Array<any>>>{
        try {
            const { data } = await this.sendGetRequest<
                IBaseResponse<Array<any>>
            >(
                `${endpoint.access}/access-management/function`
            )
            return data
        } catch (error) {
            throw error
        }
    }
}