import { RequestAdapter } from "@/shared/lib/http/request-adapter"
import { TDummyRequestBody, TGetListResponse } from "../interface/dummy";
import { TBaseResponse, TPayloadGetList } from "@/shared/interfaces/global";


export class DummyService extends RequestAdapter {
    constructor() {
        super();
    }

    public async getDataDummyList(payload:TPayloadGetList): Promise<TBaseResponse<Array<TGetListResponse>>>{
        try {
            const { data } = await this.sendPostRequest<
                TPayloadGetList,
                TBaseResponse<Array<TGetListResponse>>
            >('/dummy', payload);
            return data;
        } catch (error) {
            throw error;
        }
    }

    public async addDummy(payload:TDummyRequestBody): Promise<TBaseResponse<TGetListResponse>>{
        try {
            const { data } = await this.sendPostRequest<
                TDummyRequestBody,
                TBaseResponse<TGetListResponse>
            >('/dummy/create', payload);
            return data;
        } catch (error) {
            throw error;
        }
    }

    public async updateDummy(payload:TDummyRequestBody, id:string): Promise<TBaseResponse<TGetListResponse>>{
        try {
            const { data } = await this.sendPutRequest<
                TDummyRequestBody,
                TBaseResponse<TGetListResponse>
            >(`/dummy/update/${id}`, payload);
            return data;
        } catch (error) {
            throw error;
        }
    }

    public async deleteDummy(id:string): Promise<TBaseResponse<TGetListResponse>>{
        try {
            const { data } = await this.sendDeleteRequest<
                void,
                TBaseResponse<TGetListResponse>
            >(`/dummy/delete/${id}`);
            return data;
        } catch (error) {
            throw error;
        }
    }
}