import { AxiosHttpResult, HttpConfig, AbstractWriteableService } from '@herodotus/core';
import { MgtCertificateRequest, MgtCertificateResponse } from '../../declarations';
declare class MgtCertificateService extends AbstractWriteableService<MgtCertificateRequest, MgtCertificateResponse> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MgtCertificateService;
    getBaseAddress(): string;
    getAliasAddress(): string;
    getCategoryAddress(): string;
    findByAlias(alias: string): Promise<AxiosHttpResult<MgtCertificateResponse>>;
    findAllByCertificateCategory(certificateCategory: string): Promise<AxiosHttpResult<Array<MgtCertificateResponse>>>;
}
export { MgtCertificateService };
