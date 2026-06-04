import { AxiosHttpResult, AxiosProgressEvent, HttpConfig, AbstractService } from '@herodotus/core';
import { MgtCertificateDownloadRequest, MgtCertificateRequest, MgtCertificateResponse, MgtCertificateFileResponse, MgtCertificateFileRequest } from '../../../declarations';
declare class MgtCertificateService extends AbstractService<MgtCertificateRequest, MgtCertificateResponse> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MgtCertificateService;
    getBaseAddress(): string;
    getAliasAddress(): string;
    getCategoryAddress(): string;
    findByAlias(alias: string): Promise<AxiosHttpResult<MgtCertificateResponse>>;
    findAllByCertificateCategory(certificateCategory: string): Promise<AxiosHttpResult<Array<MgtCertificateResponse>>>;
}
declare class MgtCertificateFileService extends AbstractService<MgtCertificateFileRequest, MgtCertificateFileResponse> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MgtCertificateFileService;
    getBaseAddress(): string;
    private getDownloadAddress;
    download(request: MgtCertificateDownloadRequest, onProgress?: (progressEvent: AxiosProgressEvent) => void): Promise<AxiosHttpResult<Blob>>;
}
export { MgtCertificateService, MgtCertificateFileService };
