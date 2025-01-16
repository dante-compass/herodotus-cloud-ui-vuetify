import type { AxiosHttpResult, MgtCertificateEntity } from '/@/declarations';

import { HttpConfig, BaseService } from '../base';

class MgtCertificateService extends BaseService<MgtCertificateEntity> {
  private static instance: MgtCertificateService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MgtCertificateService {
    if (this.instance == null) {
      this.instance = new MgtCertificateService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getManage() + '/manage/certificate';
  }

  public getCommonNameAddress(): string {
    return this.getBaseAddress() + '/common-name';
  }

  public getCategoryAddress(): string {
    return this.getBaseAddress() + '/category';
  }

  public findByCommonName(certificateCategory: string): Promise<AxiosHttpResult<Record<string, MgtCertificateEntity>>> {
    return this.getConfig()
      .getHttp()
      .get<
        Record<string, MgtCertificateEntity>,
        string
      >(this.getCommonNameAddress(), { certificateCategory: certificateCategory });
  }

  public findAllByCertificateCategory(
    commonName: string,
  ): Promise<AxiosHttpResult<Record<string, Array<MgtCertificateEntity>>>> {
    return this.getConfig()
      .getHttp()
      .get<Record<string, Array<MgtCertificateEntity>>, string>(this.getCategoryAddress(), { commonName: commonName });
  }
}

export { MgtCertificateService };
