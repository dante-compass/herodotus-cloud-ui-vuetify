import { AxiosHttpResult, AxiosProgressEvent, HttpConfig, AbstractService } from '@herodotus/core';
import { PkiCertificateDownloadRequest, PkiCertificateRequest, PkiCertificateResponse, PkiCertificateFileResponse, PkiCertificateFileRequest, TaskDefinitionEntity, TaskExecutionHistoryEntity } from '../../declarations';
declare class PkiCertificateService extends AbstractService<PkiCertificateRequest, PkiCertificateResponse> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): PkiCertificateService;
    getBaseAddress(): string;
    private getAliasAddress;
    private getCategoryAddress;
    findByAlias(alias: string): Promise<AxiosHttpResult<PkiCertificateResponse>>;
    findAllByCertificateCategory(certificateCategory: string): Promise<AxiosHttpResult<Array<PkiCertificateResponse>>>;
}
declare class PkiCertificateFileService extends AbstractService<PkiCertificateFileRequest, PkiCertificateFileResponse> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): PkiCertificateFileService;
    getBaseAddress(): string;
    private getDownloadAddress;
    download(request: PkiCertificateDownloadRequest, onProgress?: (progressEvent: AxiosProgressEvent) => void): Promise<AxiosHttpResult<Blob>>;
}
declare class TaskDefinitionService extends AbstractService<TaskDefinitionEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TaskDefinitionService;
    getBaseAddress(): string;
    private getToggleAddress;
    toggle(entity: TaskDefinitionEntity): Promise<AxiosHttpResult<TaskDefinitionEntity>>;
}
declare class TaskExecutionHistoryService extends AbstractService<TaskExecutionHistoryEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TaskExecutionHistoryService;
    getBaseAddress(): string;
}
export { PkiCertificateService, PkiCertificateFileService, TaskDefinitionService, TaskExecutionHistoryService };
