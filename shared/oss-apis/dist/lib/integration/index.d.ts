import { AxiosHttpResult, AxiosProgressEvent, ObjectStreamDownloadArguments, PutObjectDomain, CreateMultipartUploadArguments, CreateMultipartUploadBusiness, CompleteMultipartUploadArguments, CompleteMultipartUploadDomain, CreateBucketArgument, DeleteBucketArgument, DeleteObjectArgument, DeleteObjectsArgument, ListObjectsV2Argument, CreateBucketResult, DeleteBucketResult, DeleteObjectResult, DeleteObjectsResult, ListObjectsV2Result, ListBucketsResult } from '../../declarations';
import { Service, HttpConfig } from '../base';
declare class BucketService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): BucketService;
    getBaseAddress(): string;
    private getListAddress;
    listBuckets(): Promise<AxiosHttpResult<ListBucketsResult>>;
    createBucket(request: CreateBucketArgument): Promise<AxiosHttpResult<CreateBucketResult>>;
    deleteBucket(request: DeleteBucketArgument): Promise<AxiosHttpResult<DeleteBucketResult>>;
}
declare class ObjectService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ObjectService;
    getBaseAddress(): string;
    private getListV2Address;
    private getMultiDeleteAddress;
    listObjectsV2(request: ListObjectsV2Argument): Promise<AxiosHttpResult<ListObjectsV2Result>>;
    delete(request: DeleteObjectArgument): Promise<AxiosHttpResult<DeleteObjectResult>>;
    batchDelete(request: DeleteObjectsArgument): Promise<AxiosHttpResult<DeleteObjectsResult>>;
}
declare class ObjectStreamService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ObjectStreamService;
    getBaseAddress(): string;
    private getDownloadAddress;
    private getDisplayAddress;
    getUploadAddress(): string;
    download(request: ObjectStreamDownloadArguments, onProgress?: (progressEvent: AxiosProgressEvent) => void): Promise<AxiosHttpResult<Blob>>;
    display(request: ObjectStreamDownloadArguments): Promise<AxiosHttpResult<Blob>>;
    upload(bucketName: string, file: File, onProgress?: (progressEvent: AxiosProgressEvent) => void): Promise<AxiosHttpResult<PutObjectDomain>>;
}
declare class MultipartUploadService extends Service {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MultipartUploadService;
    getBaseAddress(): string;
    getCreateMultipartUploadAddress(): string;
    getCompleteMultipartUploadAddress(): string;
    createChunkUpload(request: CreateMultipartUploadArguments): Promise<AxiosHttpResult<CreateMultipartUploadBusiness>>;
    completeChunkUpload(request: CompleteMultipartUploadArguments): Promise<AxiosHttpResult<CompleteMultipartUploadDomain>>;
}
export { BucketService, ObjectService, ObjectStreamService, MultipartUploadService };
