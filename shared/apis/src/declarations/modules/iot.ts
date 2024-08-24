import type { BaseSysEntity, Conditions, EmptyObject, Entity } from '../base';

export interface IotProductCategoryEntity extends BaseSysEntity {
  categoryId: string;
  categoryName: string;
  parentId: string;
}

export interface IotProductEntity extends BaseSysEntity {
  productId: string;
  productKey: string;
  productName: string;
  productSecret: string;
  photoUrl: string;
  category: IotProductCategoryEntity;
}

export interface IotDeviceEntity extends BaseSysEntity {
  deviceId: string;
  productKey: string;
  deviceName: string;
  deviceSecret: string;
  clientId: string;
  username: string;
  password: string;
  salt: string;
  keepAlive: number;
  protocolVersion: number;
  connected: boolean;
  connectedAt: Date;
  disconnectedAt: Date;
}

export interface IotProductCategoryConditions extends Conditions {}

export interface IotProductConditions extends Conditions {
  productKey: string;
  productName: string;
  categoryId: string;
}

export interface IotDeviceConditions extends Conditions {}

export type IotProductCategoryProps = keyof IotProductCategoryEntity;

export type IotProductProps = keyof IotProductEntity;

export type IotDeviceProps = keyof IotDeviceEntity;
