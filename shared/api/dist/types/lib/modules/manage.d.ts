import { AxiosHttpResult, HttpConfig, AbstractService } from '@herodotus/core';
import { CertificateRequest, CertificateResponse } from '../../declarations';
declare class MgtCertificateService extends AbstractService<CertificateRequest, CertificateResponse> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MgtCertificateService;
    getBaseAddress(): string;
    getAliasAddress(): string;
    getCategoryAddress(): string;
    findByAlias(alias: string): Promise<AxiosHttpResult<CertificateResponse>>;
    findAllByCertificateCategory(certificateCategory: string): Promise<AxiosHttpResult<Array<CertificateResponse>>>;
}
export { MgtCertificateService };
