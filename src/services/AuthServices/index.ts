import { ApiResponse, CrudServices, transform } from "../base/ICrudServices";

class AuthServices extends CrudServices<any> {
    controllerPath = 'public';

    public async login(username: string, password: string): Promise<ApiResponse<any>> {
        try {
            const instance = this.createInstance();
            const result = await instance.post(`${this.baseURL}${this.controllerPath}/login`, { username, password}).then(transform);
            return result as ApiResponse<any>;
        } catch (AxiosError) {
            return AxiosError as ApiResponse<any>
        }
    }
}

export default AuthServices