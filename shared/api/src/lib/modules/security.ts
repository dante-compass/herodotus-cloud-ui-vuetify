import type {
  SysPermissionEntity,
  SysRoleEntity,
  SysUserEntity,
  SysAttributeEntity,
  SysDefaultRoleEntity,
  SysElementEntity,
  SysDictionaryEntity,
  SysTenantDataSourceEntity,
  AccessSourceEntity,
} from '@/declarations';
import type { AxiosHttpResult, Elements } from '@herodotus/core';

import { ContentTypeEnum } from '@/enums';
import { HttpConfig, AbstractWriteableService } from '@herodotus/core';

class SysPermissionService extends AbstractWriteableService<SysPermissionEntity> {
  private static instance: SysPermissionService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysPermissionService {
    if (this.instance == null) {
      this.instance = new SysPermissionService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/security/permission';
  }
}

class SysRoleService extends AbstractWriteableService<SysRoleEntity> {
  private static instance: SysRoleService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysRoleService {
    if (this.instance == null) {
      this.instance = new SysRoleService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/security/role';
  }

  public getRoleCodePath(roleCode: string): string {
    return this.getParamPath(this.getBaseAddress(), roleCode);
  }

  public fetchByRoleCode(roleCode: string): Promise<AxiosHttpResult<SysRoleEntity>> {
    return this.getConfig().getHttp().get<SysRoleEntity, string>(this.getRoleCodePath(roleCode));
  }
}

class SysUserService extends AbstractWriteableService<SysUserEntity> {
  private static instance: SysUserService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysUserService {
    if (this.instance == null) {
      this.instance = new SysUserService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/security/user';
  }

  public getUsernameAddress(): string {
    return this.getBaseAddress() + '/sign-in';
  }

  public getChangePasswordAddress(): string {
    return this.getBaseAddress() + '/change-password';
  }

  public getUsernamePath(username: string): string {
    return this.getParamPath(this.getUsernameAddress(), username);
  }

  public fetchByUsername(username: string): Promise<AxiosHttpResult<SysUserEntity>> {
    return this.getConfig().getHttp().get<SysUserEntity, string>(this.getUsernamePath(username));
  }

  public changePassword(userId: string, password: string): Promise<AxiosHttpResult<SysUserEntity>> {
    return this.getConfig().getHttp().put<SysUserEntity, Record<string, string>>(
      this.getChangePasswordAddress(),
      { userId, password },
      {
        contentType: ContentTypeEnum.URL_ENCODED,
      },
    );
  }
}

class SysAttributeService extends AbstractWriteableService<SysAttributeEntity> {
  private static instance: SysAttributeService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysAttributeService {
    if (this.instance == null) {
      this.instance = new SysAttributeService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/security/attribute';
  }
}

class SysDefaultRoleService extends AbstractWriteableService<SysDefaultRoleEntity> {
  private static instance: SysDefaultRoleService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysDefaultRoleService {
    if (this.instance == null) {
      this.instance = new SysDefaultRoleService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/security/default-role';
  }
}

class SysElementService extends AbstractWriteableService<SysElementEntity> {
  private static instance: SysElementService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysElementService {
    if (this.instance == null) {
      this.instance = new SysElementService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/security/element';
  }

  public getResourcesAddress(): string {
    return this.getBaseAddress() + '/resources';
  }

  public fetchById(id: string): Promise<AxiosHttpResult<SysElementEntity>> {
    return this.getConfig().getHttp().get<SysElementEntity, string>(this.getIdPath(id));
  }

  public findResourcesByRoles(roles: string[]): Promise<AxiosHttpResult<Elements>> {
    return this.getConfig().getHttp().get<Elements, string>(this.getResourcesAddress(), { roles: roles });
  }
}

class SysTenantDataSourceService extends AbstractWriteableService<SysTenantDataSourceEntity> {
  private static instance: SysTenantDataSourceService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysTenantDataSourceService {
    if (this.instance == null) {
      this.instance = new SysTenantDataSourceService(config);
    }
    return this.instance;
  }
  public getBaseAddress(): string {
    return this.getConfig().getUaa() + '/security/tenant/datasource';
  }

  public getTenantIdPath(tenantId: string): string {
    return this.getParamPath(this.getBaseAddress(), tenantId);
  }

  public fetchByTenantId(tenantId: string): Promise<AxiosHttpResult<SysTenantDataSourceEntity>> {
    return this.getConfig().getHttp().get<SysTenantDataSourceEntity, string>(this.getTenantIdPath(tenantId));
  }
}

class SysDictionaryService extends AbstractWriteableService<SysDictionaryEntity> {
  private static instance: SysDictionaryService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SysDictionaryService {
    if (this.instance == null) {
      this.instance = new SysDictionaryService(config);
    }
    return this.instance;
  }
  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/security/dictionary';
  }

  public getItemsAddress(): string {
    return this.getBaseAddress() + '/items';
  }

  public getCategoryPath(category: string): string {
    return this.getParamPath(this.getItemsAddress(), category);
  }

  public fetchByCategory(category: string): Promise<AxiosHttpResult<Array<SysDictionaryEntity>>> {
    return this.getConfig().getHttp().get<Array<SysDictionaryEntity>, string>(this.getCategoryPath(category));
  }

  public fetchCategories(categories: string): Promise<AxiosHttpResult<Record<string, Array<SysDictionaryEntity>>>> {
    return this.getConfig().getHttp().get<Record<string, Array<SysDictionaryEntity>>, string>(this.getItemsAddress(), { categories: categories });
  }
}

class SocialBindingService extends AbstractWriteableService<AccessSourceEntity> {
  private static instance: SocialBindingService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): SocialBindingService {
    if (this.instance == null) {
      this.instance = new SocialBindingService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getUpms() + '/security/social/binding';
  }
}

export {
  SysPermissionService,
  SysRoleService,
  SysUserService,
  SysAttributeService,
  SysDefaultRoleService,
  SysElementService,
  SysTenantDataSourceService,
  SysDictionaryService,
  SocialBindingService,
};
