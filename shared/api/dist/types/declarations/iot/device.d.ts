import { Conditions, AbstractSysEntity } from '@herodotus/core';
import { ProductEntity } from './product';
export interface DeviceEntity extends AbstractSysEntity {
    id: string;
    deviceName: string;
    deviceSecret: string;
    clientId: string;
    product: ProductEntity;
    activated: boolean;
    redirectUris: string;
}
export interface DeviceConditions extends Conditions {
}
export type DeviceProps = keyof DeviceEntity;
