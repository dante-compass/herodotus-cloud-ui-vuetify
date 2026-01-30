import { AxiosHttpResult, AxiosProgressEvent, HttpConfig, AbstractService } from '@herodotus/core';
import { MgtCertificateRequest, MgtCertificateResponse, MgtCertificateFileResponse, MgtCertificateFileRequest, MgtCertificateFileDeleteRequest } from '../../declarations';
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
declare class MgtCertificateFileService extends AbstractService<MgtCertificateFileRequest, MgtCertificateFileResponse, MgtCertificateFileDeleteRequest> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MgtCertificateFileService;
    getBaseAddress(): string;
    getDownloadAddress(): string;
    download(request: MgtCertificateFileRequest, onProgress: (progressEvent: AxiosProgressEvent) => void): Promise<AxiosHttpResult<Blob>>;
}
export { MgtCertificateService, MgtCertificateFileService };
