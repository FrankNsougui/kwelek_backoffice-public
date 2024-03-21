import axios, { AxiosInstance, AxiosResponse } from "axios";
import { TokenState } from "../../stores/jwtTokenSlice";

export abstract class HttpClient {

    protected instance: AxiosInstance | undefined;
    public baseURL = import.meta.env.VITE_BASE_URL
    public tokenKey = import.meta.env.VITE_TOKEN_KEY

    protected createInstance(): AxiosInstance {
        this.instance = axios.create({
          baseURL: this.baseURL,
          headers: {
            "Content-Type": "application/json",
          },
        });
        this.initializeResponseInterceptor();
        return this.instance;
    }

    private initializeResponseInterceptor = () => {
        this.instance?.interceptors.response.use(this.handleResponse, this.handleError);
        this.instance?.interceptors.request.use((config: any) => {

          const originalConfig: string = config.url

          if (originalConfig.includes('api/v1/')){

            const token =  JSON.parse(localStorage.getItem(this.tokenKey)!) as TokenState

            config.headers = {
              Authorization: `Bearer ${token.accessToken}`,
            };
          }

          return config;

        });
    };

    private handleResponse = ({ data }: AxiosResponse) => data;

    private handleError = (error: any) => Promise.reject(error);
}