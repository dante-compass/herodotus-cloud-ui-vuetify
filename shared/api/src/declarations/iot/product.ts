import type { Conditions, AbstractSysEntity } from '@herodotus/core';

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

export interface ProductCategoryConditions extends Conditions {}
export interface ProductConditions extends Conditions {
  productKey: string;
  productName: string;
  categoryName: string;
}

export type ProductCategoryProps = keyof ProductCategoryEntity;
export type ProductProps = keyof ProductEntity;
