import type { Conditions, AbstractSysEntity } from "@herodotus/core";

export interface MqttCategoryEntity extends AbstractSysEntity {
  id: string;
  name: string;
  area: number;
  action: number;
  purpose: number;
}

export interface MqttAuthorityEntity extends AbstractSysEntity {
  id: string;
  topic: string;
  permission: number;
  action: number;
  qos: number;
  retain: number;
  categories: MqttCategoryEntity[];
}

export interface MqttAccountEntity extends AbstractSysEntity {
  id: string;
  clientId: string;
  username: string;
  password: string;
  superUser: boolean;
  categories: MqttCategoryEntity[];
}

export interface MqttCategoryConditions extends Conditions {
  area: number;
  action: number;
  purpose: number;
}
export interface MqttAuthorityConditions extends Conditions {
  topic: string;
  permission: number;
  action: number;
  qos: number;
  retain: number;
}
export interface MqttAccountConditions extends Conditions {
  clientId: string;
  username: string;
}

export type MqttCategoryProps = keyof MqttCategoryEntity;
export type MqttAuthorityProps = keyof MqttAuthorityEntity;
export type MqttAccountProps = keyof MqttAccountEntity;
