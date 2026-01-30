import { OAuth2ApplicationEntity, OAuth2ScopeEntity, OAuth2AuthorizationEntity, OAuth2CredentialRecordEntity, OAuth2UserLoggingEntity, OAuth2InterfaceAuditEntity, OAuth2ScopeAssignedBody } from '../../declarations';
import { AxiosHttpResult, HttpConfig, AbstractWriteableService } from '@herodotus/core';
declare class OAuth2ApplicationService extends AbstractWriteableService<OAuth2ApplicationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ApplicationService;
    getBaseAddress(): string;
}
declare class OAuth2ScopeService extends AbstractWriteableService<OAuth2ScopeEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ScopeService;
    getBaseAddress(): string;
    getAssignedAddress(): string;
    getScopeCodePath(scopeCode: string): string;
    fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2ScopeEntity>>;
    assigned(data: OAuth2ScopeAssignedBody): Promise<AxiosHttpResult<OAuth2ScopeEntity>>;
}
declare class OAuth2AuthorizationService extends AbstractWriteableService<OAuth2AuthorizationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2AuthorizationService;
    getBaseAddress(): string;
}
declare class OAuth2UserLoggingService extends AbstractWriteableService<OAuth2UserLoggingEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2UserLoggingService;
    getBaseAddress(): string;
}
declare class OAuth2InterfaceAuditService extends AbstractWriteableService<OAuth2InterfaceAuditEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2InterfaceAuditService;
    getBaseAddress(): string;
}
declare class OAuth2CredentialRecordService extends AbstractWriteableService<OAuth2CredentialRecordEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2CredentialRecordService;
    getBaseAddress(): string;
}
export { OAuth2ApplicationService, OAuth2ScopeService, OAuth2AuthorizationService, OAuth2UserLoggingService, OAuth2InterfaceAuditService, OAuth2CredentialRecordService };
