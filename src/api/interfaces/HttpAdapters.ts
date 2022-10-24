export interface HttpAdapter {
    get<T>(url: string, config?: Object): Promise<T>;
    post<T>(url: string, data: any, config?: Object): Promise<T>;
    put<T>(url: string, data: any, config?: Object): Promise<T>;
    delete<T>(url: string, config?: Object): Promise<T>;
}