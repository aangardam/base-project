/* eslint-disable @typescript-eslint/no-explicit-any */

import { IBaseResponse } from "../interfaces/global";
import endpoint from "../lib/endpoin";

import { RequestAdapter } from "../lib/http/request-adapter";

export class RoleAccessService extends RequestAdapter {
    constructor(){
        super();
    }

    public async getRoleAccess(roleId:number, userId:number):Promise<IBaseResponse<Array<any>>>{
        try {
            const { data } = await this.sendGetRequest<IBaseResponse<Array<any>>>(
                `${endpoint.access}/access-management/role/access?roleId=${roleId}&userId=${userId}`
            )
            return data
        } catch (error) {
            throw error
        }
    }
}