import type { AxiosHttpResult, AxiosProgressEvent } from '@herodotus/core';
import type { MgtCertificateRequest, MgtCertificateResponse, MgtCertificateFileResponse, MgtCertificateFileRequest, MgtCertificateFileDeleteRequest } from '@/declarations';

import { HttpConfig, AbstractWriteableService, AbstractReadableService, ContentTypeEnum } from '@herodotus/core';

class MgtCertificateService extends AbstractWriteableService<MgtCertificateRequest, MgtCertificateResponse> {
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

  public findByAlias(alias: string): Promise<AxiosHttpResult<MgtCertificateResponse>> {
    return this.getConfig().getHttp().get<MgtCertificateResponse, string>(this.getAliasAddress(), { alias: alias });
  }

  public findAllByCertificateCategory(certificateCategory: string): Promise<AxiosHttpResult<Array<MgtCertificateResponse>>> {
    return this.getConfig().getHttp().get<Array<MgtCertificateResponse>, string>(this.getCategoryAddress(), { certificateCategory: certificateCategory });
  }
}

class MgtCertificateFileService extends AbstractReadableService<MgtCertificateFileResponse> {
  private static instance: MgtCertificateFileService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MgtCertificateFileService {
    if (this.instance == null) {
      this.instance = new MgtCertificateFileService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getManage() + '/manage/certificate/file';
  }

  public getDownloadAddress(): string {
    return this.getBaseAddress() + '/download';
  }

  public download(request: MgtCertificateFileRequest, onProgress: (progressEvent: AxiosProgressEvent) => void): Promise<AxiosHttpResult<Blob>> {
    return this.getConfig()
      .getHttp()
      .post<Blob, any>(this.getDownloadAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: 'blob', onDownloadProgress: onProgress });
  }

  public delete(request: MgtCertificateFileDeleteRequest): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().delete<string, MgtCertificateFileDeleteRequest>(this.getBaseAddress(), request);
  }
}

export { MgtCertificateService, MgtCertificateFileService };
