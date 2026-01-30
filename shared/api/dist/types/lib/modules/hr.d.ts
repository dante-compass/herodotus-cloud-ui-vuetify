import { SysDepartmentEntity, SysEmployeeEntity, SysOrganizationEntity, SysEmployeeAllocatable, AllocatableRemove, AllocatableDeploy } from '../../declarations';
import { AxiosHttpResult, Conditions, Pageable, Page, HttpConfig, AbstractWriteableService } from '@herodotus/core';
declare class SysOrganizationService extends AbstractWriteableService<SysOrganizationEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysOrganizationService;
    getBaseAddress(): string;
}
declare class SysDepartmentService extends AbstractWriteableService<SysDepartmentEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysDepartmentService;
    getBaseAddress(): string;
}
declare class SysEmployeeService extends AbstractWriteableService<SysEmployeeEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysEmployeeService;
    getBaseAddress(): string;
    getAssignedAddress(): string;
    getAllocatableAddress(): string;
    getEmployeeNamePath(employeeName: string): string;
    fetchByEmployeeName(employeeName: string): Promise<AxiosHttpResult<SysEmployeeEntity>>;
    fetchAssignedByPage(params: Pageable, others?: Conditions): Promise<AxiosHttpResult<Page<SysEmployeeEntity>>>;
    deleteAllocatable(data: AllocatableRemove): Promise<AxiosHttpResult<string>>;
    saveAllocatable(data: AllocatableDeploy): Promise<AxiosHttpResult<string>>;
    authorizeUser(data: any): Promise<AxiosHttpResult<SysEmployeeEntity>>;
}
/**
 * 为了在人员归属中，尽量使用已有的 hooks，临时定义的无意义service
 */
declare class SysEmployeeAllocatableService extends AbstractWriteableService<SysEmployeeAllocatable> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): SysEmployeeAllocatableService;
    getBaseAddress(): string;
}
export { SysOrganizationService, SysDepartmentService, SysEmployeeService, SysEmployeeAllocatableService };
