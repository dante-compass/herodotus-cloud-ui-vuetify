import type { MgtCertificateEntity } from '@/declarations';
import type { AxiosHttpResult } from '@herodotus/core';

import { HttpConfig, AbstractService } from '@herodotus/core';

class MgtCertificateService extends AbstractService<MgtCertificateEntity> {
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

  public getAliasAddress(): string {
    return this.getBaseAddress() + '/alias';
  }

  public getCategoryAddress(): string {
    return this.getBaseAddress() + '/category';
  }

  public findByAlias(alias: string): Promise<AxiosHttpResult<MgtCertificateEntity>> {
    return this.getConfig()
      .getHttp()
      .get<MgtCertificateEntity, string>(this.getAliasAddress(), { alias: alias });
  }

  public findAllByCertificateCategory(
    certificateCategory: string,
  ): Promise<AxiosHttpResult<Array<MgtCertificateEntity>>> {
    return this.getConfig()
      .getHttp()
      .get<
        Array<MgtCertificateEntity>,
        string
      >(this.getCategoryAddress(), { certificateCategory: certificateCategory });
  }
}

export { MgtCertificateService };
