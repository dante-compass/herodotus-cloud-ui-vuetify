import { AbstractSysEntity, AbstractSysDto, Conditions, Dto } from '@herodotus/core';
export interface MgtCertificateRequest extends AbstractSysDto {
    alias: string;
    /**
     * 证书所有者的公共名称
     * <p>
     * 简称：CN 字段，对于 SSL 证书，一般为网站域名；而对于代码签名证书则为申请单位名称；而对于客户端证书则为证书申请者的姓名；
     */
    commonName: string;
    /**
     * 组织单元
     * <p>
     * 简称：OU 字段。组织单位，表示在组织内部负责证书管理的部门或分支
     */
    organizationUnit: string;
    /**
     * 组织
     * <p>
     * 简称：O 字段，对于 SSL 证书，一般为网站域名；而对于代码签名证书则为申请单位名称；而对于客户端单位证书则为证书申请者所在单位名称；
     */
    organization: string;
    /**
     * 位置或城市
     * <p>
     * 简称：L 字段，进一步细化了CA的所在地。
     */
    locality: string;
    /**
     * 州或省
     * <p>
     * 简称：ST 字段，标识证书主体的地理位置。
     */
    stateOrProvince: string;
    /**
     * 国家或地区
     * <p>
     * 简称：C 字段，只能是国家字母缩写，如中国：CN 。
     */
    country: string;
    startTime: string;
    endTime: string;
    password: string;
    parentId: string;
    certificateCategory: string;
    ocsp: boolean;
}
export interface MgtCertificateResponse extends AbstractSysEntity {
    certId: string;
    alias: string;
    password: string;
    certificateCategory: string;
    serialNumber: string;
    subjectDn: string;
    issuerDn: string;
    startTime: string;
    endTime: string;
    ocsp: boolean;
    revocationReason: string;
}
interface AbstractCertificateFileDto extends Dto {
    certId: string;
    certificateFileCategory: string;
}
export interface MgtCertificateFileRequest extends AbstractCertificateFileDto {
    keyStoreFormat: string;
    keyStoreCategory: string;
    pemPrivateKeyFormat: string;
    pemCertificateFormat: string;
    encryptPrivateKey: boolean;
}
export interface MgtCertificateFileDeleteRequest extends AbstractCertificateFileDto {
    suffix: string;
}
export interface MgtCertificateFileResponse extends MgtCertificateFileDeleteRequest, AbstractSysDto {
    fileName: string;
    certificateCategory: string;
}
export interface MgtCertificateConditions extends Conditions {
}
export interface MgtCertificateFileConditions extends Conditions {
}
export type MgtCertificateProps = keyof MgtCertificateResponse;
export type MgtCertificateFileProps = keyof MgtCertificateFileResponse;
export {};
