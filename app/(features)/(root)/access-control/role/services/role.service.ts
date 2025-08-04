/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBaseResponse, TPayloadGetList } from "@/shared/interfaces/global";
import endpoint from "@/shared/lib/endpoin";
import { RequestAdapter } from "@/shared/lib/http/request-adapter";
import { TRoleDeleteRequestBody, TRoleRequestBody, TRoleResponse } from "../interfaces/role";


export class RoleService extends RequestAdapter {
    constructor() {
        super();
    }

    public async getRoleTree(
        userId:number,
        roleId:number
    ): Promise<IBaseResponse<any>> {
        try {
            const { data } = await this.sendGetRequest<
                IBaseResponse<any>
            >(`${endpoint.access}/access-management/role/menu/tree?userId=${userId}&roleId=${roleId}`);

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async getList(
        payload: TPayloadGetList,
    ): Promise<IBaseResponse<Array<TRoleResponse>>> {
        try {
            const { data } = await this.sendPostRequest<
                TPayloadGetList,
                IBaseResponse<Array<TRoleResponse>>
            >(`${endpoint.access}/access-management/role/list`, payload);

            return data;
        } catch (error) {
            throw error;
        }
    }


    public async create(body:TRoleRequestBody): Promise<IBaseResponse<string>> {
        try {
            const { data } = await this.sendPostRequest<
                TRoleRequestBody,
                IBaseResponse<string>
            >(`${endpoint.access}/access-management/role/create`, body);

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async update(body:TRoleRequestBody): Promise<IBaseResponse<string>> {
        try {
            const { data } = await this.sendPutRequest<
                TRoleRequestBody,
                IBaseResponse<string>
            >(`${endpoint.access}/access-management/role/update`, body);

            return data;
        } catch (error) {
            throw error;
        }
    }

    public async delete(body: TRoleDeleteRequestBody): Promise<IBaseResponse<string>> {
        try {
            const { data } = await this.sendDeleteRequest<
                any,
                IBaseResponse<string>
            >(`${endpoint.access}/access-management/role/delete`, body);

            return data;
        } catch (error) {
            throw error;
        }
    }

}