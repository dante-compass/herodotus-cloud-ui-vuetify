import { MgtCertificateEntity } from '../../declarations';
import { AxiosHttpResult, HttpConfig, AbstractService } from '@herodotus/core';
declare class MgtCertificateService extends AbstractService<MgtCertificateEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MgtCertificateService;
    getBaseAddress(): string;
    getAliasAddress(): string;
    getCategoryAddress(): string;
    findByAlias(alias: string): Promise<AxiosHttpResult<MgtCertificateEntity>>;
    findAllByCertificateCategory(certificateCategory: string): Promise<AxiosHttpResult<Array<MgtCertificateEntity>>>;
}
export { MgtCertificateService };
