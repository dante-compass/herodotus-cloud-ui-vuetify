import { AxiosHttpResult, HttpConfig, AbstractService } from '@herodotus/core';
import { MgtCertificateRequest, MgtCertificateResponse, MgtCertificateFileResponse, MgtCertificateFileRequest, MgtCertificateFileId } from '../../declarations';
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
declare class MgtCertificateFileService extends AbstractService<MgtCertificateFileRequest, MgtCertificateFileResponse, MgtCertificateFileId> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MgtCertificateFileService;
    getBaseAddress(): string;
}
export { MgtCertificateService, MgtCertificateFileService };
