import { AxiosHttpResult, Pageable, Page, HttpConfig, Service } from '@herodotus/core';
import { CertificateRequest, CertificateResponse } from '../../declarations';
declare class MgtCertificateService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MgtCertificateService;
    getBaseAddress(): string;
    private getConditionAddress;
    getAliasAddress(): string;
    getCategoryAddress(): string;
    fetchByPage(params: Pageable, others?: {}): Promise<AxiosHttpResult<Page<CertificateResponse>>>;
    saveOrUpdate(data: CertificateRequest): Promise<AxiosHttpResult<CertificateResponse>>;
    delete(id: string): Promise<AxiosHttpResult<string>>;
    findByAlias(alias: string): Promise<AxiosHttpResult<CertificateResponse>>;
    findAllByCertificateCategory(certificateCategory: string): Promise<AxiosHttpResult<Array<CertificateResponse>>>;
}
export { MgtCertificateService };
