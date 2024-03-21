import { AxiosError, AxiosResponse } from "axios";
import { HttpClient } from "./httpClient";

export interface ICrudServices<T> {
    get(id: any): Promise<ApiResponse<T> | AxiosError>;
    getMany(params: IFilterParams): Promise<ApiResponse<T[]> | AxiosError>;
    create(item: T): Promise<ApiResponse<T> | AxiosError>;
    update(id: any, item: T): Promise<ApiResponse<T> | AxiosError>;
    delete(id: any): Promise<ApiResponse<T> | AxiosError>;
}

export class ApiResponse<T> {
    data?: T;
}

export type IFilterParams = {
    page: number,
    size: number,
    filterName?: string | undefined
    searchValue?: string | undefined
}

export const transform = (response: AxiosResponse): Promise<ApiResponse<any>> => {
    return new Promise((resolve, reject) => {
      const result: ApiResponse<any> = {
        data: response,
      };
      resolve(result);
    });
};

export abstract class CrudServices<T> extends HttpClient implements ICrudServices<T> {

    protected controllerPath: string | undefined;

    public async get(id: any): Promise<ApiResponse<T> | AxiosError> {
        try {
            const instance = this.createInstance();
            const result = await instance.get(`${this.baseURL}${this.controllerPath}/${id}`).then(transform);
            return result as ApiResponse<T>;
        } catch (AxiosError) {
            return AxiosError as ApiResponse<any>
        }
    }
    public async getMany(params: IFilterParams): Promise<ApiResponse<T[]> | AxiosError> {
        try {
            const instance = this.createInstance();
            const result = await instance.get(`${this.baseURL}${this.controllerPath}/`, { params }).then(transform);
            return result as ApiResponse<T[]>;
        } catch (AxiosError) {
            return AxiosError as ApiResponse<any>
        }
    }
    public async create(item: T): Promise<ApiResponse<T> | AxiosError> {
       try {
            const instance = this.createInstance();
            const result = await instance.post(`${this.baseURL}${this.controllerPath}/`, item).then(transform);
            return result as ApiResponse<T>;
       } catch (AxiosError) {
            return AxiosError as ApiResponse<any>
       }
    }
    public async update(id: any, item: T): Promise<ApiResponse<T> | AxiosError> {
        try {
            const instance = this.createInstance();
            const result = await instance.put(`${this.baseURL}${this.controllerPath}/${id}`, item).then(transform);
            return result as ApiResponse<T>;
        } catch (AxiosError) {
            return AxiosError as ApiResponse<any>
        }
    }
    public async delete(id: any): Promise<ApiResponse<T> | AxiosError> {
        try {
            const instance = this.createInstance();
            const result = await instance.delete(`${this.baseURL}${this.controllerPath}/${id}`).then(transform);
            return result as ApiResponse<T>;
        } catch (AxiosError) {
            return AxiosError as ApiResponse<any>
        }
    }
}