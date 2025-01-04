import {
  OAuth2ApplicationEntity,
  OAuth2ScopeEntity,
  OAuth2AuthorizationEntity,
  OAuth2UserLoggingEntity,
  OAuth2InterfaceAuditEntity,
  OAuth2ScopeAssignedBody,
  AxiosHttpResult,
} from '/@/declarations';

import { HttpConfig, BaseService } from '../base';

class OAuth2ApplicationService extends BaseService<OAuth2ApplicationEntity> {
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
    return this.getConfig().getUaa() + '/authorize/application';
  }
}

class OAuth2ScopeService extends BaseService<OAuth2ScopeEntity> {
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
    return this.getConfig().getUaa() + '/authorize/scope';
  }

  public getAssignedAddress(): string {
    return this.getBaseAddress() + '/assigned';
  }

  public getScopeCodePath(scopeCode: string): string {
    return this.getParamPath(this.getBaseAddress(), scopeCode);
  }

  public fetchByScopeCode(scopeCode: string): Promise<AxiosHttpResult<OAuth2ScopeEntity>> {
    return this.getConfig().getHttp().get<OAuth2ScopeEntity, string>(this.getScopeCodePath(scopeCode));
  }

  public assigned(data: OAuth2ScopeAssignedBody): Promise<AxiosHttpResult<OAuth2ScopeEntity>> {
    return this.getConfig().getHttp().post(this.getAssignedAddress(), data);
  }
}

class OAuth2AuthorizationService extends BaseService<OAuth2AuthorizationEntity> {
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
    return this.getConfig().getUaa() + '/authorize/authorization';
  }
}

class OAuth2UserLoggingService extends BaseService<OAuth2UserLoggingEntity> {
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
    return this.getConfig().getUaa() + '/authorize/compliance';
  }
}

class OAuth2InterfaceAuditService extends BaseService<OAuth2InterfaceAuditEntity> {
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
    return this.getConfig().getUaa() + '/authorize/audit';
  }
}

export {
  OAuth2ApplicationService,
  OAuth2ScopeService,
  OAuth2AuthorizationService,
  OAuth2UserLoggingService,
  OAuth2InterfaceAuditService,
};
