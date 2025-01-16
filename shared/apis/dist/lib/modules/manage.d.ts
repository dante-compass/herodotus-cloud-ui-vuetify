import { AxiosHttpResult, MgtCertificateEntity } from '../../declarations';
import { HttpConfig, BaseService } from '../base';
declare class MgtCertificateService extends BaseService<MgtCertificateEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MgtCertificateService;
    getBaseAddress(): string;
    getCommonNameAddress(): string;
    getCategoryAddress(): string;
    findByCommonName(certificateCategory: string): Promise<AxiosHttpResult<Record<string, MgtCertificateEntity>>>;
    findAllByCertificateCategory(commonName: string): Promise<AxiosHttpResult<Record<string, Array<MgtCertificateEntity>>>>;
}
export { MgtCertificateService };
