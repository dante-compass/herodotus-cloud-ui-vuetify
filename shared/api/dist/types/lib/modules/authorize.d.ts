import { OAuth2ApplicationEntity, OAuth2ScopeEntity, OAuth2AuthorizationEntity, OAuth2CredentialRecordEntity, OAuth2UserLoggingEntity, OAuth2InterfaceAuditEntity, OAuth2PersistentTokenEntity, OAuth2ResourceEntity, OAuth2SupportedScopeEntity, OAuth2ScopeAssignedBody } from '../../declarations';
import { AxiosHttpResult, HttpConfig, AbstractService } from '@herodotus/core';
declare class OAuth2ApplicationService extends AbstractService<OAuth2ApplicationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ApplicationService;
    getBaseAddress(): string;
}
declare class OAuth2ScopeService extends AbstractService<OAuth2ScopeEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ScopeService;
    getBaseAddress(): string;
    private getAssignedAddress;
    private getScopeCodePath;
    fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2ScopeEntity>>;
    assigned(data: OAuth2ScopeAssignedBody): Promise<AxiosHttpResult<OAuth2ScopeEntity>>;
}
declare class OAuth2AuthorizationService extends AbstractService<OAuth2AuthorizationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2AuthorizationService;
    getBaseAddress(): string;
}
declare class OAuth2UserLoggingService extends AbstractService<OAuth2UserLoggingEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2UserLoggingService;
    getBaseAddress(): string;
}
declare class OAuth2InterfaceAuditService extends AbstractService<OAuth2InterfaceAuditEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2InterfaceAuditService;
    getBaseAddress(): string;
}
declare class OAuth2CredentialRecordService extends AbstractService<OAuth2CredentialRecordEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2CredentialRecordService;
    getBaseAddress(): string;
}
declare class OAuth2PersistentTokenService extends AbstractService<OAuth2PersistentTokenEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2PersistentTokenService;
    getBaseAddress(): string;
}
declare class OAuth2ResourceService extends AbstractService<OAuth2ResourceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ResourceService;
    getBaseAddress(): string;
    private getResourceCodePath;
    fetchByResourceCode(resourceCode: string): Promise<AxiosHttpResult<OAuth2ResourceEntity>>;
}
declare class OAuth2SupportedScopeService extends AbstractService<OAuth2SupportedScopeEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2SupportedScopeService;
    getBaseAddress(): string;
    private getScopeCodePath;
    fetchByScopeCode(supportedCode: string): Promise<AxiosHttpResult<OAuth2SupportedScopeEntity>>;
}
export { OAuth2ApplicationService, OAuth2ScopeService, OAuth2AuthorizationService, OAuth2UserLoggingService, OAuth2InterfaceAuditService, OAuth2CredentialRecordService, OAuth2PersistentTokenService, OAuth2ResourceService, OAuth2SupportedScopeService, };
