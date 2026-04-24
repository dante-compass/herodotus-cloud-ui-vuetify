import type { Conditions, AbstractSysEntity } from '@herodotus/core';
import type { ProductEntity } from './product';

export interface DeviceEntity extends AbstractSysEntity {
  id: string;
  deviceName: string;
  deviceSecret: string;
  clientId: string;
  product: ProductEntity;
  activated: boolean;
  redirectUris: string;
}

export interface DeviceConditions extends Conditions {}

export type DeviceProps = keyof DeviceEntity;
