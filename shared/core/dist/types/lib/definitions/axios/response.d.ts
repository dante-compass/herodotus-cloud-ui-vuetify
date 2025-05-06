import { AxiosResponse, ResponseStatus } from '../../../declarations';
export declare const parseResponseStatus: (response: AxiosResponse<any>, message?: string) => ResponseStatus;
export declare const logResponse: (response: AxiosResponse<any>) => void;
export declare const isSuccess: (response: AxiosResponse<any>) => boolean;
