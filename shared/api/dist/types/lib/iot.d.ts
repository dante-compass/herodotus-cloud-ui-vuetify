import { AxiosHttpResult, AbstractService, HttpConfig } from '@herodotus/core';
import { ProductEntity, ProductCategoryEntity, DeviceEntity, TslUnitEntity, TslArgumentEntity, TslFunctionEntity, MqttCategoryEntity, MqttAuthorityEntity, MqttAccountEntity, TslInvokeServiceRequest, TslSetPropertyRequest } from '../declarations';
declare class ProductCategoryService extends AbstractService<ProductCategoryEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ProductCategoryService;
    getBaseAddress(): string;
}
declare class ProductService extends AbstractService<ProductEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): ProductService;
    getBaseAddress(): string;
    private getValidateProductKeyAddress;
    private getToggleAddress;
    private getValidateProductKeyPath;
    validateProductKey(productKey: string): Promise<AxiosHttpResult<ProductEntity>>;
    toggle(entity: ProductEntity): Promise<AxiosHttpResult<ProductEntity>>;
}
declare class DeviceService extends AbstractService<DeviceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DeviceService;
    getBaseAddress(): string;
    private getToggleAddress;
}
declare class TslUnitService extends AbstractService<TslUnitEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TslUnitService;
    getBaseAddress(): string;
}
declare class TslArgumentService extends AbstractService<TslArgumentEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TslArgumentService;
    getBaseAddress(): string;
}
declare class TslFunctionService extends AbstractService<TslFunctionEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): TslFunctionService;
    getBaseAddress(): string;
    private getSetAddress;
    private getInvokeAddress;
    set(data: TslSetPropertyRequest): Promise<AxiosHttpResult<string>>;
    invoke(data: TslInvokeServiceRequest): Promise<AxiosHttpResult<string>>;
}
declare class MqttCategoryService extends AbstractService<MqttCategoryEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MqttCategoryService;
    getBaseAddress(): string;
}
declare class MqttAuthorityService extends AbstractService<MqttAuthorityEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MqttAuthorityService;
    getBaseAddress(): string;
}
declare class MqttAccountService extends AbstractService<MqttAccountEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): MqttAccountService;
    getBaseAddress(): string;
}
export { DeviceService, ProductCategoryService, ProductService, TslUnitService, TslArgumentService, TslFunctionService, MqttCategoryService, MqttAuthorityService, MqttAccountService, };
