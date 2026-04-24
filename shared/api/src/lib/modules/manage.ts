import type { AxiosHttpResult, AxiosProgressEvent } from '@herodotus/core';
import type {
  MgtCertificateDownloadRequest,
  MgtCertificateRequest,
  MgtCertificateResponse,
  MgtCertificateFileResponse,
  MgtCertificateFileRequest,
} from '@/declarations';

import { HttpConfig, AbstractService } from '@herodotus/core';
import { ContentTypeEnum } from '@/enums';

class MgtCertificateService extends AbstractService<MgtCertificateRequest, MgtCertificateResponse> {
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

  public findAllByCertificateCategory(
    certificateCategory: string,
  ): Promise<AxiosHttpResult<Array<MgtCertificateResponse>>> {
    return this.getConfig().getHttp().get<Array<MgtCertificateResponse>, string>(this.getCategoryAddress(), {
      certificateCategory: certificateCategory,
    });
  }
}

class MgtCertificateFileService extends AbstractService<MgtCertificateFileRequest, MgtCertificateFileResponse> {
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
    return this.getConfig().getManage() + '/manage/certificate-file';
  }

  private getDownloadAddress(): string {
    return this.getBaseAddress() + '/download';
  }

  public download(
    request: MgtCertificateDownloadRequest,
    onProgress?: (progressEvent: AxiosProgressEvent) => void,
  ): Promise<AxiosHttpResult<Blob>> {
    if (onProgress) {
      return this.getConfig()
        .getHttp()
        .post<
          Blob,
          any
        >(this.getDownloadAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: 'blob', onDownloadProgress: onProgress });
    } else {
      return this.getConfig().getHttp().post<Blob, any>(this.getDownloadAddress(), request);
    }
  }
}

export { MgtCertificateService, MgtCertificateFileService };
