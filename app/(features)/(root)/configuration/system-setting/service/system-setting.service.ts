/* eslint-disable @typescript-eslint/no-explicit-any */
import { IBaseResponse, TPayloadGetList } from "@/shared/interfaces/global";
import { RequestAdapter } from "@/shared/lib/http/request-adapter";
import { TGetListResponse } from "../interfaces/system-setting";
import endpoint from "@/shared/lib/endpoin";



export class SystemSettingService extends RequestAdapter {
    constructor() {
        super();
    }
    
    public async getList(
        payload: TPayloadGetList,
    ): Promise<IBaseResponse<Array<TGetListResponse>>> {
        try {
            const { data } = await this.sendPostRequest<
                TPayloadGetList,
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
