import type { Conditions, AbstractSysEntity } from "@herodotus/core";

export interface ProductCategoryEntity extends AbstractSysEntity {
  id: string;
  name: string;
  sceneId: string;
}

export interface ProductEntity extends AbstractSysEntity {
  id: string;
  productKey: string;
  productName: string;
  productSecret: string;
  category: ProductCategoryEntity;
  nodeType: string;
  gatewayProtocol: string;
  networkingMethod: string;
  authenticationMode: string;
  storagePolicy: string;
  registration: boolean;
  verification: boolean;
  photoUrl: string;
  quantity: number;
  release: boolean;
}

export interface DeviceEntity extends AbstractSysEntity {
  id: string;
  deviceName: string;
  deviceSecret: string;
  clientId: string;
  product: ProductEntity;
  activated: boolean;
  redirectUris: string;
}

export interface ProductCategoryConditions extends Conditions {}
export interface ProductConditions extends Conditions {
  productKey: string;
  productName: string;
  nodeType: number;
  categoryName: string;
}

export interface DeviceConditions extends Conditions {
  productKey: string;
  deviceName: string;
  clientId: string;
}

export type ProductCategoryProps = keyof ProductCategoryEntity;
export type ProductProps = keyof ProductEntity;
export type DeviceProps = keyof DeviceEntity;
