import type { AxiosHttpResult, AxiosProgressEvent } from "@herodotus/core";
import type {
  PkiCertificateDownloadRequest,
  PkiCertificateRequest,
  PkiCertificateResponse,
  PkiCertificateFileResponse,
  PkiCertificateFileRequest,
} from "@/declarations";

import { HttpConfig, AbstractService } from "@herodotus/core";
import { ContentTypeEnum } from "@/enums";

class PkiCertificateService extends AbstractService<PkiCertificateRequest, PkiCertificateResponse> {
  private static instance: PkiCertificateService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): PkiCertificateService {
    if (this.instance == null) {
      this.instance = new PkiCertificateService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getManage() + "/manage/pki/certificate";
  }

  private getAliasAddress(): string {
    return this.getBaseAddress() + "/alias";
  }

  private getCategoryAddress(): string {
    return this.getBaseAddress() + "/category";
  }

  public findByAlias(alias: string): Promise<AxiosHttpResult<PkiCertificateResponse>> {
    return this.getConfig().getHttp().get<PkiCertificateResponse, string>(this.getAliasAddress(), { alias: alias });
  }

  public findAllByCertificateCategory(
    certificateCategory: string,
  ): Promise<AxiosHttpResult<Array<PkiCertificateResponse>>> {
    return this.getConfig().getHttp().get<Array<PkiCertificateResponse>, string>(this.getCategoryAddress(), {
      certificateCategory: certificateCategory,
    });
  }
}

class PkiCertificateFileService extends AbstractService<PkiCertificateFileRequest, PkiCertificateFileResponse> {
  private static instance: PkiCertificateFileService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): PkiCertificateFileService {
    if (this.instance == null) {
      this.instance = new PkiCertificateFileService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getManage() + "/manage/pki/certificate-file";
  }

  private getDownloadAddress(): string {
    return this.getBaseAddress() + "/download";
  }

  public download(
    request: PkiCertificateDownloadRequest,
    onProgress?: (progressEvent: AxiosProgressEvent) => void,
  ): Promise<AxiosHttpResult<Blob>> {
    if (onProgress) {
      return this.getConfig()
        .getHttp()
        .post<
          Blob,
          any
        >(this.getDownloadAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: "blob", onDownloadProgress: onProgress });
    } else {
      return this.getConfig().getHttp().post<Blob, any>(this.getDownloadAddress(), request);
    }
  }
}

export { PkiCertificateService, PkiCertificateFileService };
