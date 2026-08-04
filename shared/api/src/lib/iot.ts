import type { AxiosHttpResult } from "@herodotus/core";
import type {
  ProductEntity,
  ProductCategoryEntity,
  DeviceEntity,
  TslUnitEntity,
  TslArgumentEntity,
  TslFunctionEntity,
  MqttCategoryEntity,
  MqttAuthorityEntity,
  MqttAccountEntity,
  TslInvokeServiceRequest,
  TslSetPropertyRequest,
} from "@/declarations";

import { AbstractService, HttpConfig } from "@herodotus/core";

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
    return this.getConfig().getIot() + "/iot/product-category";
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
    return this.getConfig().getIot() + "/iot/product";
  }

  private getValidateProductKeyAddress(): string {
    return this.getBaseAddress() + "/validation";
  }

  private getToggleAddress(): string {
    return this.getBaseAddress() + "/toggle";
  }

  private getValidateProductKeyPath(productKey: string): string {
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
    return this.getConfig().getIot() + "/iot/device";
  }

  private getToggleAddress(): string {
    return this.getBaseAddress() + "/toggle";
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
    return this.getConfig().getIot() + "/iot/tsl/unit";
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
    return this.getConfig().getIot() + "/iot/tsl/argument";
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
    return this.getConfig().getIot() + "/iot/tsl/function";
  }

  private getSetAddress(): string {
    return this.getBaseAddress() + "/set";
  }

  private getInvokeAddress(): string {
    return this.getBaseAddress() + "/invoke";
  }

  public set(data: TslSetPropertyRequest): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().put<string, TslSetPropertyRequest>(this.getSetAddress(), data);
  }

  public invoke(data: TslInvokeServiceRequest): Promise<AxiosHttpResult<string>> {
    return this.getConfig().getHttp().put<string, TslInvokeServiceRequest>(this.getInvokeAddress(), data);
  }
}

class MqttCategoryService extends AbstractService<MqttCategoryEntity> {
  private static instance: MqttCategoryService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MqttCategoryService {
    if (this.instance == null) {
      this.instance = new MqttCategoryService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getIot() + "/iot/mqtt/category";
  }
}

class MqttAuthorityService extends AbstractService<MqttAuthorityEntity> {
  private static instance: MqttAuthorityService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MqttAuthorityService {
    if (this.instance == null) {
      this.instance = new MqttAuthorityService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getIot() + "/iot/mqtt/authority";
  }
}

class MqttAccountService extends AbstractService<MqttAccountEntity> {
  private static instance: MqttAccountService;

  private constructor(config: HttpConfig) {
    super(config);
  }

  public static getInstance(config: HttpConfig): MqttAccountService {
    if (this.instance == null) {
      this.instance = new MqttAccountService(config);
    }
    return this.instance;
  }

  public getBaseAddress(): string {
    return this.getConfig().getIot() + "/iot/mqtt/account";
  }
}

export {
  DeviceService,
  ProductCategoryService,
  ProductService,
  TslUnitService,
  TslArgumentService,
  TslFunctionService,
  MqttCategoryService,
  MqttAuthorityService,
  MqttAccountService,
};
