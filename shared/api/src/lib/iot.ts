import type { AxiosHttpResult } from '@herodotus/core';
import type {
  ProductEntity,
  ProductCategoryEntity,
  DeviceEntity,
  TslUnitEntity,
  TslArgumentEntity,
  TslFunctionEntity,
} from '@/declarations';

import { AbstractService, HttpConfig } from '@herodotus/core';

class ProductCategoryService extends AbstractService<ProductCategoryEntity> {
  private static instance: ProductCategoryService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ProductCategoryService {
    if (this.instance == null) {
      this.instance = new ProductCategoryService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getIot() + '/iot/product-category';
  }
}

class ProductService extends AbstractService<ProductEntity> {
  private static instance: ProductService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): ProductService {
    if (this.instance == null) {
      this.instance = new ProductService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getIot() + '/iot/product';
  }

  public getValidateProductKeyAddress(): string {
    return this.getBaseAddress() + '/validation';
  }

  public getToggleAddress(): string {
    return this.getBaseAddress() + '/toggle';
  }

  public getValidateProductKeyPath(productKey: string): string {
    return this.getParamPath(this.getValidateProductKeyAddress(), productKey);
  }

  public validateProductKey(productKey: string): Promise<AxiosHttpResult<ProductEntity>> {
    return this.getConfig().getHttp().get<ProductEntity, string>(this.getValidateProductKeyPath(productKey));
  }

  public toggle(entity: ProductEntity): Promise<AxiosHttpResult<ProductEntity>> {
    return this.getConfig().getHttp().put<ProductEntity, ProductEntity>(this.getToggleAddress(), entity);
  }
}

class DeviceService extends AbstractService<DeviceEntity> {
  private static instance: DeviceService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): DeviceService {
    if (this.instance == null) {
      this.instance = new DeviceService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getIot() + '/iot/device';
  }

  public getToggleAddress(): string {
    return this.getBaseAddress() + '/toggle';
  }

  // public toggle(entity: IotDeviceEntity): Promise<AxiosHttpResult<IotDeviceEntity>> {
  //   return this.getConfig()
  //     .getHttp()
  //     .put<IotDeviceEntity, IotDeviceEntity>(this.getToggleAddress(), entity);
  // }
}

class TslUnitService extends AbstractService<TslUnitEntity> {
  private static instance: TslUnitService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): TslUnitService {
    if (this.instance == null) {
      this.instance = new TslUnitService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getIot() + '/iot/tsl/unit';
  }
}

class TslArgumentService extends AbstractService<TslArgumentEntity> {
  private static instance: TslArgumentService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): TslArgumentService {
    if (this.instance == null) {
      this.instance = new TslArgumentService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getIot() + '/iot/tsl/argument';
  }
}

class TslFunctionService extends AbstractService<TslFunctionEntity> {
  private static instance: TslFunctionService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): TslFunctionService {
    if (this.instance == null) {
      this.instance = new TslFunctionService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getIot() + '/iot/tsl/function';
  }

  // public getSettableAddress(): string {
  //   return this.getBaseAddress() + '/settable';
  // }

  // public getCallableAddress(): string {
  //   return this.getBaseAddress() + '/callable';
  // }

  // public fetchAllSettable(
  //   productKey: string,
  // ): Promise<AxiosHttpResult<Array<IotTslFunctionEntity>>> {
  //   return this.getConfig()
  //     .getHttp()
  //     .get<
  //       Array<IotTslFunctionEntity>,
  //       string
  //     >(this.getSettableAddress(), { productKey: productKey });
  // }

  // public fetchAllCallable(
  //   productKey: string,
  // ): Promise<AxiosHttpResult<Array<IotTslFunctionEntity>>> {
  //   return this.getConfig()
  //     .getHttp()
  //     .get<
  //       Array<IotTslFunctionEntity>,
  //       string
  //     >(this.getCallableAddress(), { productKey: productKey });
  // }

  // public setup(data: IotTslSetupProperty): Promise<AxiosHttpResult<string>> {
  //   return this.getConfig()
  //     .getHttp()
  //     .put<string, IotTslSetupProperty>(this.getSettableAddress(), data);
  // }

  // public invoke(data: IotTslInvokeService): Promise<AxiosHttpResult<string>> {
  //   return this.getConfig()
  //     .getHttp()
  //     .put<string, IotTslInvokeService>(this.getCallableAddress(), data);
  // }
}

export {
  DeviceService,
  ProductCategoryService,
  ProductService,
  TslUnitService,
  TslArgumentService,
  TslFunctionService,
};
