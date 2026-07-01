import { AxiosHttpResult, AbstractService, HttpConfig } from '@herodotus/core';
import { ProductEntity, ProductCategoryEntity, DeviceEntity, TslUnitEntity, TslArgumentEntity, TslFunctionEntity } from '../declarations';
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
    getValidateProductKeyAddress(): string;
    getToggleAddress(): string;
    getValidateProductKeyPath(productKey: string): string;
    validateProductKey(productKey: string): Promise<AxiosHttpResult<ProductEntity>>;
    toggle(entity: ProductEntity): Promise<AxiosHttpResult<ProductEntity>>;
}
declare class DeviceService extends AbstractService<DeviceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): DeviceService;
    getBaseAddress(): string;
    getToggleAddress(): string;
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
}
export { DeviceService, ProductCategoryService, ProductService, TslUnitService, TslArgumentService, TslFunctionService, };
