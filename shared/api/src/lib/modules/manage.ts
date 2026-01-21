import type { AxiosHttpResult, Pageable, Page } from '@herodotus/core';
import type { CertificateRequest, CertificateResponse } from '@/declarations';

import { isEmpty } from 'lodash-es';
import { HttpConfig, Service } from '@herodotus/core';

class MgtCertificateService extends Service {
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

  private getConditionAddress(): string {
    return this.getBaseAddress() + '/condition';
  }

  public getAliasAddress(): string {
    return this.getBaseAddress() + '/alias';
  }

  public getCategoryAddress(): string {
    return this.getBaseAddress() + '/category';
  }

  public fetchByPage(
    params: Pageable,
    others = {},
  ): Promise<AxiosHttpResult<Page<CertificateResponse>>> {
    if (isEmpty(others)) {
      return this.getConfig()
        .getHttp()
        .get<Page<CertificateResponse>, Pageable>(this.getBaseAddress(), params);
    } else {
      const fullParams = Object.assign(params, others);
      return this.getConfig()
        .getHttp()
        .get<Page<CertificateResponse>, Pageable>(this.getConditionAddress(), fullParams);
    }
  }

  public saveOrUpdate(data: CertificateRequest): Promise<AxiosHttpResult<CertificateResponse>> {
    return this.getConfig()
      .getHttp()
      .post<CertificateResponse, CertificateRequest>(this.getBaseAddress(), data);
  }

  public delete(id: string): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, string>(this.getIdPath(id));
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
