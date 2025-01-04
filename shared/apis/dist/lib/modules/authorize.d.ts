import { OAuth2ApplicationEntity, OAuth2ScopeEntity, OAuth2AuthorizationEntity, OAuth2UserLoggingEntity, OAuth2InterfaceAuditEntity, OAuth2ScopeAssignedBody, AxiosHttpResult } from '../../declarations';
import { HttpConfig, BaseService } from '../base';
declare class OAuth2ApplicationService extends BaseService<OAuth2ApplicationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ApplicationService;
    getBaseAddress(): string;
}
declare class OAuth2ScopeService extends BaseService<OAuth2ScopeEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2ScopeService;
    getBaseAddress(): string;
    getAssignedAddress(): string;
    getScopeCodePath(scopeCode: string): string;
    fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2ScopeEntity>>;
    assigned(data: OAuth2ScopeAssignedBody): Promise<AxiosHttpResult<OAuth2ScopeEntity>>;
}
declare class OAuth2AuthorizationService extends BaseService<OAuth2AuthorizationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2AuthorizationService;
    getBaseAddress(): string;
}
declare class OAuth2UserLoggingService extends BaseService<OAuth2UserLoggingEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2UserLoggingService;
    getBaseAddress(): string;
}
declare class OAuth2InterfaceAuditService extends BaseService<OAuth2InterfaceAuditEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): OAuth2InterfaceAuditService;
    getBaseAddress(): string;
}
export { OAuth2ApplicationService, OAuth2ScopeService, OAuth2AuthorizationService, OAuth2UserLoggingService, OAuth2InterfaceAuditService, };
