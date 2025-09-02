import { RequestAdapter } from "@/shared/lib/http/request-adapter";
import { ILogin, ILoginResponse } from "../interfaces/login";
import { TBaseResponse } from "@/shared/interfaces/global";


export class LoginService extends RequestAdapter {
    constructor() {
        super();
    }

    public async login(body: ILogin): Promise<TBaseResponse<ILoginResponse>> {
        try {
            const response = await this.sendPostRequest<ILogin, TBaseResponse<ILoginResponse>>('/auth/login', body);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}