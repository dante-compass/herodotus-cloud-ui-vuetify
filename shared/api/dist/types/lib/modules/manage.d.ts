import { AxiosHttpResult, AxiosProgressEvent, HttpConfig, AbstractService } from '@herodotus/core';
import { PkiCertificateDownloadRequest, PkiCertificateRequest, PkiCertificateResponse, PkiCertificateFileResponse, PkiCertificateFileRequest } from '../../declarations';
declare class PkiCertificateService extends AbstractService<PkiCertificateRequest, PkiCertificateResponse> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): PkiCertificateService;
    getBaseAddress(): string;
    private getAliasAddress;
    private getCategoryAddress;
    findByAlias(alias: string): Promise<AxiosHttpResult<PkiCertificateResponse>>;
    findAllByCertificateCategory(certificateCategory: string): Promise<AxiosHttpResult<Array<PkiCertificateResponse>>>;
}
declare class PkiCertificateFileService extends AbstractService<PkiCertificateFileRequest, PkiCertificateFileResponse> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): PkiCertificateFileService;
    getBaseAddress(): string;
    private getDownloadAddress;
    download(request: PkiCertificateDownloadRequest, onProgress?: (progressEvent: AxiosProgressEvent) => void): Promise<AxiosHttpResult<Blob>>;
}
export { PkiCertificateService, PkiCertificateFileService };
