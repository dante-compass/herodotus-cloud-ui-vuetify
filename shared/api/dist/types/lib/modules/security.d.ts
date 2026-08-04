import { SysPermissionEntity, SysRoleEntity, SysUserEntity, SysAttributeEntity, SysDefaultRoleEntity, SysElementEntity, SysDictionaryEntity, SysTenantDataSourceEntity, AccessSourceEntity } from '../../declarations';
import { AxiosHttpResult, Elements, HttpConfig, AbstractService } from '@herodotus/core';
declare class SysPermissionService extends AbstractService<SysPermissionEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysPermissionService;
    getBaseAddress(): string;
}
declare class SysRoleService extends AbstractService<SysRoleEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysRoleService;
    getBaseAddress(): string;
    private getRoleCodePath;
    fetchByRoleCode(roleCode: string): Promise<AxiosHttpResult<SysRoleEntity>>;
}
declare class SysUserService extends AbstractService<SysUserEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysUserService;
    getBaseAddress(): string;
    private getUsernameAddress;
    private getChangePasswordAddress;
    private getUsernamePath;
    fetchByUsername(username: string): Promise<AxiosHttpResult<SysUserEntity>>;
    changePassword(userId: string, password: string): Promise<AxiosHttpResult<SysUserEntity>>;
}
declare class SysAttributeService extends AbstractService<SysAttributeEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysAttributeService;
    getBaseAddress(): string;
}
declare class SysDefaultRoleService extends AbstractService<SysDefaultRoleEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysDefaultRoleService;
    getBaseAddress(): string;
}
declare class SysElementService extends AbstractService<SysElementEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysElementService;
    getBaseAddress(): string;
    private getResourcesAddress;
    fetchById(id: string): Promise<AxiosHttpResult<SysElementEntity>>;
    findResourcesByRoles(roles: string[]): Promise<AxiosHttpResult<Elements>>;
}
declare class SysTenantDataSourceService extends AbstractService<SysTenantDataSourceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysTenantDataSourceService;
    getBaseAddress(): string;
    private getTenantIdPath;
    fetchByTenantId(tenantId: string): Promise<AxiosHttpResult<SysTenantDataSourceEntity>>;
}
declare class SysDictionaryService extends AbstractService<SysDictionaryEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysDictionaryService;
    getBaseAddress(): string;
    private getItemsAddress;
    private getCategoryPath;
    fetchByCategory(category: string): Promise<AxiosHttpResult<Array<SysDictionaryEntity>>>;
    fetchCategories(categories: string): Promise<AxiosHttpResult<Record<string, Array<SysDictionaryEntity>>>>;
}
declare class SocialBindingService extends AbstractService<AccessSourceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SocialBindingService;
    getBaseAddress(): string;
}
export { SysPermissionService, SysRoleService, SysUserService, SysAttributeService, SysDefaultRoleService, SysElementService, SysTenantDataSourceService, SysDictionaryService, SocialBindingService, };
