import type {
  OAuth2ApplicationEntity,
  OAuth2ScopeEntity,
  OAuth2AuthorizationEntity,
  OAuth2CredentialRecordEntity,
  OAuth2UserLoggingEntity,
  OAuth2InterfaceAuditEntity,
  OAuth2PersistentTokenEntity,
  OAuth2ResourceEntity,
  OAuth2SupportedScopeEntity,
  OAuth2ScopeAssignedBody,
} from "@/declarations";
import type { AxiosHttpResult } from "@herodotus/core";

import { HttpConfig, AbstractService } from "@herodotus/core";

class OAuth2ApplicationService extends AbstractService<OAuth2ApplicationEntity> {
  private static instance: OAuth2ApplicationService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2ApplicationService {
    if (this.instance == null) {
      this.instance = new OAuth2ApplicationService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + "/authorize/application";
  }
}

class OAuth2ScopeService extends AbstractService<OAuth2ScopeEntity> {
  private static instance: OAuth2ScopeService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2ScopeService {
    if (this.instance == null) {
      this.instance = new OAuth2ScopeService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + "/authorize/scope";
  }

  private getAssignedAddress(): string {
    return this.getBaseAddress() + "/assigned";
  }

  private getScopeCodePath(scopeCode: string): string {
    return this.getParamPath(this.getBaseAddress(), scopeCode);
  }

  public fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2ScopeEntity>> {
    return this.getConfig().getHttp().get<OAuth2ScopeEntity, string>(this.getScopeCodePath(scopeCode));
  }

  public assigned(data: OAuth2ScopeAssignedBody): Promise<AxiosHttpResult<OAuth2ScopeEntity>> {
    return this.getConfig().getHttp().post(this.getAssignedAddress(), data);
  }
}

class OAuth2AuthorizationService extends AbstractService<OAuth2AuthorizationEntity> {
  private static instance: OAuth2AuthorizationService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2AuthorizationService {
    if (this.instance == null) {
      this.instance = new OAuth2AuthorizationService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + "/authorize/authorization";
  }
}

class OAuth2UserLoggingService extends AbstractService<OAuth2UserLoggingEntity> {
  private static instance: OAuth2UserLoggingService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2UserLoggingService {
    if (this.instance == null) {
      this.instance = new OAuth2UserLoggingService(config);
    }
    return this.instance;
  }
  public getBaseAddress(): string {
    return this.getConfig().getUaa() + "/authorize/compliance";
  }
}

class OAuth2InterfaceAuditService extends AbstractService<OAuth2InterfaceAuditEntity> {
  private static instance: OAuth2InterfaceAuditService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2InterfaceAuditService {
    if (this.instance == null) {
      this.instance = new OAuth2InterfaceAuditService(config);
    }
    return this.instance;
  }
  public getBaseAddress(): string {
    return this.getConfig().getUaa() + "/authorize/audit";
  }
}

class OAuth2CredentialRecordService extends AbstractService<OAuth2CredentialRecordEntity> {
  private static instance: OAuth2CredentialRecordService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2CredentialRecordService {
    if (this.instance == null) {
      this.instance = new OAuth2CredentialRecordService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + "/authorize/passkey";
  }
}

class OAuth2PersistentTokenService extends AbstractService<OAuth2PersistentTokenEntity> {
  private static instance: OAuth2PersistentTokenService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2PersistentTokenService {
    if (this.instance == null) {
      this.instance = new OAuth2PersistentTokenService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + "/authorize/persistent";
  }
}

class OAuth2ResourceService extends AbstractService<OAuth2ResourceEntity> {
  private static instance: OAuth2ResourceService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2ResourceService {
    if (this.instance == null) {
      this.instance = new OAuth2ResourceService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + "/authorize/resource";
  }

  private getResourceCodePath(resourceCode: string): string {
    return this.getParamPath(this.getBaseAddress(), resourceCode);
  }

  public fetchByResourceCode(resourceCode: string): Promise<AxiosHttpResult<OAuth2ResourceEntity>> {
    return this.getConfig().getHttp().get<OAuth2ResourceEntity, string>(this.getResourceCodePath(resourceCode));
  }
}

class OAuth2SupportedScopeService extends AbstractService<OAuth2SupportedScopeEntity> {
  private static instance: OAuth2SupportedScopeService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): OAuth2SupportedScopeService {
    if (this.instance == null) {
      this.instance = new OAuth2SupportedScopeService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUaa() + "/authorize/prm";
  }

  private getScopeCodePath(supportedCode: string): string {
    return this.getParamPath(this.getBaseAddress(), supportedCode);
  }

  public fetchByScopeCode(supportedCode: string): Promise<AxiosHttpResult<OAuth2SupportedScopeEntity>> {
    return this.getConfig().getHttp().get<OAuth2SupportedScopeEntity, string>(this.getScopeCodePath(supportedCode));
  }
}

export {
  OAuth2ApplicationService,
  OAuth2ScopeService,
  OAuth2AuthorizationService,
  OAuth2UserLoggingService,
  OAuth2InterfaceAuditService,
  OAuth2CredentialRecordService,
  OAuth2PersistentTokenService,
  OAuth2ResourceService,
  OAuth2SupportedScopeService,
};
