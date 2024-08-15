import { Entity } from '../base';
import { DeleteDomain } from './domain';
export interface AbstractArgument extends Entity {
}
export interface AbstractBucketArgument extends AbstractArgument {
    bucketName: string;
}
export interface AbstractExpectedBucketOwnerArgument extends AbstractBucketArgument {
    expectedBucketOwner?: string;
}
export interface AbstractObjectRequestPayerArgument extends AbstractExpectedBucketOwnerArgument {
    requestPayer?: string;
}
export interface AbstractObjectArgument extends AbstractObjectRequestPayerArgument {
    objectName: string;
}
export interface AbstractObjectVersionArgument extends AbstractObjectArgument {
    versionId?: string;
}
export interface CreateBucketArgument extends AbstractBucketArgument {
    acl?: string;
    grantFullControl?: string;
    grantRead?: string;
    grantReadACP?: string;
    grantWrite?: string;
    grantWriteACP?: string;
    objectLockEnabledForBucket?: boolean;
    objectOwnership?: string;
}
export interface DeleteBucketArgument extends AbstractExpectedBucketOwnerArgument {
}
export interface ListBucketsArgument extends AbstractArgument {
}
export interface DeleteObjectArgument extends AbstractObjectVersionArgument {
    mfa?: string;
    bypassGovernanceRetention?: boolean;
}
export interface DeleteObjectsArgument extends AbstractObjectRequestPayerArgument {
    delete: Array<DeleteDomain>;
    quiet?: boolean;
    mfa?: string;
    bypassGovernanceRetention?: boolean;
    checksumAlgorithm?: string;
}
export interface ListObjectsV2Argument extends AbstractObjectRequestPayerArgument {
    delimiter?: string;
    encodingType?: string;
    maxKeys?: number;
    prefix?: string;
    continuationToken?: string;
    fetchOwner?: boolean;
    startAfter?: string;
}
export interface BaseArguments extends Entity {
    extraHeaders?: Map<string, string>;
    extraQueryParams?: Map<string, string>;
}
export interface BucketArguments extends BaseArguments {
    bucketName: string;
    region?: string;
}
export interface ObjectArguments extends BucketArguments {
    objectName: string;
}
export interface BasePartArguments extends ObjectArguments {
    uploadId: string;
}
export interface ObjectStreamDownloadArguments extends ObjectArguments {
}
export interface CreateMultipartUploadArguments extends ObjectArguments {
    partNumber: number;
}
export interface CompleteMultipartUploadArguments extends BasePartArguments {
}
