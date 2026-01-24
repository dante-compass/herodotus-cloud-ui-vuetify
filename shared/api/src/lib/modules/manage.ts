import type { AxiosHttpResult } from '@herodotus/core';
import type { CertificateRequest, CertificateResponse } from '@/declarations';

import { HttpConfig, AbstractService } from '@herodotus/core';

class MgtCertificateService extends AbstractService<CertificateRequest, CertificateResponse> {
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

  public findByAlias(alias: string): Promise<AxiosHttpResult<CertificateResponse>> {
    return this.getConfig()
      .getHttp()
      .get<CertificateResponse, string>(this.getAliasAddress(), { alias: alias });
  }

  public findAllByCertificateCategory(
    certificateCategory: string,
  ): Promise<AxiosHttpResult<Array<CertificateResponse>>> {
    return this.getConfig()
      .getHttp()
      .get<
        Array<CertificateResponse>,
        string
      >(this.getCategoryAddress(), { certificateCategory: certificateCategory });
  }
}

export { MgtCertificateService };
