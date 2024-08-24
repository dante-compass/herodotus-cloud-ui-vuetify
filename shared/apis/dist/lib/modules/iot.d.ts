import { AxiosHttpResult, IotDeviceEntity, IotProductCategoryEntity, IotProductEntity } from '../../declarations';
import { HttpConfig, BaseService } from '../base';
declare class IotProductCategoryService extends BaseService<IotProductCategoryEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): IotProductCategoryService;
    getBaseAddress(): string;
    fetchById(id: string): Promise<AxiosHttpResult<IotProductCategoryEntity>>;
}
declare class IotProductService extends BaseService<IotProductEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): IotProductService;
    getBaseAddress(): string;
    getProductKeyAddress(): string;
    getProductKeyPath(productKey: string): string;
    fetchByProductKey(productKey: string): Promise<AxiosHttpResult<IotProductEntity>>;
}
declare class IotDeviceService extends BaseService<IotDeviceEntity> {
    private static instance;
    private constructor();
    static getInstance(config: HttpConfig): IotDeviceService;
    getBaseAddress(): string;
}
export { IotProductCategoryService, IotProductService, IotDeviceService };
