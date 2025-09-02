/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { useUserStore } from '@/shared/store/user.store';
import axios, {
    AxiosError,
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    CreateAxiosDefaults,
    InternalAxiosRequestConfig,
} from 'axios';

interface RequestAdapterProps extends CreateAxiosDefaults {}

export class RequestAdapter {
    public adapter: AxiosInstance;

    constructor(props?: RequestAdapterProps) {
        const { baseURL = process.env.NEXT_PUBLIC_API_URL, ...rest } =
            props || {};
        this.adapter = axios.create({
            baseURL,
            ...rest,
        });

        // Bind 'this' context to the methods
        this.interceptRequest = this.interceptRequest.bind(this);
        this.interceptResponse = this.interceptResponse.bind(this);
        this.handleError = this.handleError.bind(this);
        // this.sendLogToBackend = this.sendLogToBackend.bind(this);

        this.adapter.interceptors.request.use(this.interceptRequest);
        this.adapter.interceptors.response.use(
            this.interceptResponse,
            this.handleError,
        );
    }

    // private async sendLogToBackend(log: any): Promise<void> {
    //     try {
    //         await this.sendPostRequest('/log/audit/add', {
    //             duration: log.data.log.duration,
    //             ipAddress: log.data.log.ipAddress,
    //             memoryUsage: log.data.log.memoryUsage,
    //             typeExec: 'frontend',
    //             method: log.config.method,
    //             path: log.config.url,
    //             status: log.status,
    //             time: new Date(),
    //             reqBody: JSON.parse(log.config.data),
    //             respBody: log.data,
    //         });
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

    private async interceptRequest(
        config: InternalAxiosRequestConfig,
    ): Promise<InternalAxiosRequestConfig> {

        const token = useUserStore.getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    }

    private async interceptResponse(
        response: AxiosResponse,
    ): Promise<AxiosResponse> {
        // Log certain requests
        // if (
        //     (response.status === 201 && response.config.method === 'post') ||
        //     (response.status === 200 && response.config.method === 'put') ||
        //     (response.status === 200 &&
        //         response.config.method === 'delete' &&
        //         !response.config.params?.filename) ||
        //     response.status >= 400 ||
        //     (response.status === 401 && response.config.method === 'get')
        // ) {
        //     await this.sendLogToBackend(response);
        // }

        // Handle session expiration
        if (response.status === 401 || response.status === 403) {
            useUserStore.getState().logout();
            window.location.href = '/login?sessionExpired=true';
        }

        return response;
    }

    private async handleError(error: AxiosError): Promise<AxiosError> {
        // Send log to backend if not a log request
        // await this.sendLogToBackend(error.response);

       
        const isUnauthorized = error.response?.status === 401;
        const isForbiden = error.response?.status === 403;

        if (isUnauthorized || isForbiden) {
            useUserStore.getState().logout();
            window.location.href = '/login?sessionExpired=true';
        } 

        throw error;
    }

    public sendGetRequest<T>(
        url: string,
        params?: AxiosRequestConfig['params'],
        config?: AxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.adapter.get<T, AxiosResponse<T>>(url, {
            ...config,
            params,
        });
    }

    public sendPostRequest<B, T>(
        url: string,
        data?: B,
        config?: InternalAxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.adapter.post<B, AxiosResponse<T>>(url, data, config);
    }

    public sendPutRequest<B, T>(
        url: string,
        data?: B,
        config?: InternalAxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.adapter.put<B, AxiosResponse<T>>(url, data, config);
    }

    public sendPatchRequest<B, T>(
        url: string,
        data?: B,
        config?: InternalAxiosRequestConfig,
    ): Promise<AxiosResponse<B>> {
        return this.adapter.patch<T, AxiosResponse<B>>(url, data, config);
    }

    public sendDeleteRequest<B, T>(
        url: string,
        data?: B,
        params?: AxiosRequestConfig['params'],
        config?: InternalAxiosRequestConfig,
    ): Promise<AxiosResponse<T>> {
        return this.adapter.delete<T, AxiosResponse<T>>(url, {
            data,
            params,
            ...config,
        });
    }
}
