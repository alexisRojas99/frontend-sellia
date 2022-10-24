import { HttpAdapter } from './interfaces/HttpAdapters'
import { fetchAxios } from './config/fetchConfig';

export class AuthAdapter implements HttpAdapter {

    async get<T>(url: string, config?: Object): Promise<T> {
        const response = await fetchAxios().get(url, config);
        return response as any;
    }

    async post<T>(url: string, data: any, config?: Object): Promise<T> {
        const response = await fetchAxios().post(url, data, config);
        return response as any;
    }

    async put<T>(url: string, data: any, config?: Object): Promise<T> {
        const response = await fetchAxios().put(url, data, config);
        return response as any;
    }

    async delete<T>(url: string, config?: Object): Promise<T> {
        const response = await fetchAxios().delete(url, config);
        return response as any;
    }
}