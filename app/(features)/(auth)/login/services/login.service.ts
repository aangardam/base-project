
import { ILoginRequestBody, ILoginResponse } from "../interfaces/login.interface";
import { IBaseResponse } from "@/shared/interfaces/global";
import endpoint from "@/shared/lib/endpoin";
import { RequestAdapter } from "@/shared/lib/http/request-adapter";

export class LoginService extends RequestAdapter {
    constructor() {
        super();
    }

    public async login(body: ILoginRequestBody): Promise<IBaseResponse<ILoginResponse>> {
        try {
            const response = await this.sendPostRequest<
                ILoginRequestBody,
                IBaseResponse<ILoginResponse>
            >(`${endpoint.auth}/auth/login`, body);

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}