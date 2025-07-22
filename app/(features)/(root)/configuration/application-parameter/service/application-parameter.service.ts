/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBaseResponse, IPayloadGetList } from "@/shared/interfaces/global";
import { RequestAdapter } from "@/shared/lib/http/request-adapter";
import { TGetListResponse } from "../interfaces/application-parameter";
import endpoint from "@/shared/lib/endpoin";



export class ApplicationParameterService extends RequestAdapter {
    constructor() {
        super();
    }
    
    public async getList(
        payload: IPayloadGetList,
    ): Promise<IBaseResponse<Array<TGetListResponse>>> {
        try {
            const { data } = await this.sendPostRequest<
                IPayloadGetList,
                IBaseResponse<Array<TGetListResponse>>
            >(`${endpoint.access}/access-management/menu/list`, payload);

            return data;
        } catch (error) {
            throw error;
        }
    }

    // public async updateAccount(
    //     body: IAccountRequestBody,
    // ): Promise<IBaseResponse<string>> {
    //     const { id, ...payload } = body;
    //     try {
    //         const { data } = await this.sendPutRequest<
    //             IAccountRequestBody,
    //             IBaseResponse<string>
    //         >(`/accesscontrol/account/edit/${id}`, payload);

    //         return data;
    //     } catch (error) {
    //         throw error;
    //     }
    // }

}
