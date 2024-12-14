import { BaseSysEntity, Entity, Conditions, AbstractJpaEntity } from '../base';
export interface BaseRegisteredClientEntity extends BaseSysEntity {
    clientId: string;
    clientIdIssuedAt: string;
    clientSecret: string;
    clientSecretExpiresAt: string;
    clientAuthenticationMethods: Array<string>;
    authorizationGrantTypes: Array<string>;
    redirectUris: string;
    postLogoutRedirectUris: string;
    requireProofKey: boolean;
    requireAuthorizationConsent: boolean;
    jwkSetUrl: string;
    authenticationSigningAlgorithm: string;
    accessTokenFormat: string;
    accessTokenValidity: string;
    refreshTokenValidity: string;
    authorizationCodeValidity: string;
    deviceCodeValidity: string;
    reuseRefreshTokens: boolean;
    signature: string;
    idTokenSignatureAlgorithm: string;
    scopes: Array<OAuth2ScopeEntity>;
}
export interface OAuth2ApplicationEntity extends BaseRegisteredClientEntity {
    applicationId: string;
    applicationName: string;
    abbreviation: string;
    logo: string;
    homepage: string;
    applicationType: string;
}
export interface OAuth2PermissionEntity extends BaseSysEntity {
    permissionId: string;
    permissionCode: string;
    permissionName: string;
}
export interface OAuth2ScopeEntity extends BaseSysEntity {
    scopeId: string;
    scopeCode: string;
    scopeName: string;
    permissions: Array<OAuth2PermissionEntity>;
}
export interface OAuth2AuthorizationEntity extends Entity {
    id: string;
    registeredClientId: string;
    principalName: string;
    authorizationGrantType: string;
    attributes: string;
    state: string;
    authorizationCodeValue: string;
    authorizationCodeIssuedAt: string;
    authorizationCodeExpiresAt: string;
    authorizationCodeMetadata: string;
    accessTokenValue: string;
    accessTokenIssuedAt: string;
    accessTokenExpiresAt: string;
    accessTokenMetadata: string;
    accessTokenType: string;
    accessTokenScopes: string;
    oidcIdTokenValue: string;
    oidcIdTokenIssuedAt: string;
    oidcIdTokenExpiresAt: string;
    oidcIdTokenMetadata: string;
    oidcIdTokenClaims: string;
    refreshTokenValue: string;
    refreshTokenIssuedAt: string;
    refreshTokenExpiresAt: string;
    refreshTokenMetadata: string;
    userCodeValue: string;
    userCodeIssuedAt: string;
    userCodeExpiresAt: string;
    userCodeMetadata: string;
    deviceCodeValue: string;
    deviceCodeIssuedAt: string;
    deviceCodeExpiresAt: string;
    deviceCodeMetadata: string;
}
export interface AbstractOAuth2Secure extends AbstractJpaEntity {
    principalName: string;
    clientId: string;
    ip: string;
    mobile: boolean;
    browserName: string;
    mobileBrowser: boolean;
    browserVersion: string;
    platformName: string;
    osName: string;
    osVersion: string;
    browserEngineName: string;
    browserEngineVersion: string;
}
export interface OAuth2AuditEntity extends AbstractOAuth2Secure {
    auditId: string;
    requestMethod: string;
    url: string;
    serviceId: string;
}
export interface OAuth2ComplianceEntity extends AbstractOAuth2Secure {
    complianceId: string;
    operation: string;
    location: string;
}
export interface OAuth2ApplicationConditions extends Conditions {
}
export interface OAuth2PermissionCondition extends Conditions {
}
export interface OAuth2ScopeConditions extends Conditions {
}
export interface OAuth2AuthorizationConditions extends Conditions {
}
export interface OAuth2ComplianceConditions extends Conditions {
    principalName: string;
    clientId: string;
    ip: string;
}
export interface OAuth2AuditConditions extends OAuth2ComplianceConditions {
    requestMethod: string;
    url: string;
}
export type OAuth2ApplicationProps = keyof OAuth2ApplicationEntity;
export type OAuth2PermissionProps = keyof OAuth2PermissionEntity;
export type OAuth2ScopeProps = keyof OAuth2ScopeEntity;
export type OAuth2AuthorizationProps = keyof OAuth2AuthorizationEntity;
export type OAuth2ComplianceProps = keyof OAuth2ComplianceEntity;
export type OAuth2AuditProps = keyof OAuth2AuditEntity;
export interface OAuth2PermissionBody extends Conditions {
    permissionId: string;
    permissionCode: string;
    permissionName: string;
}
export interface OAuth2ScopeAssignedBody extends Conditions {
    scopeId: string;
    permissions: Array<OAuth2PermissionBody>;
}
