import { AxiosResponse } from 'axios';
import { ResponseStatus } from '../../../declarations';
export declare const parseResponseStatus: (response: AxiosResponse<any>, message?: string) => ResponseStatus;
