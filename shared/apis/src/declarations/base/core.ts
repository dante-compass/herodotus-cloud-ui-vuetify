import type {
  AxiosHttpResult,
  OAuth2Token,
  Conditions,
  Dictionary,
  EmptyObject,
  Entity,
  Page,
  Pageable,
  Pagination,
  Sort,
  Tree,
  BaseEntity,
  AbstractSysEntity,
  AbstractAuditEntity,
} from '@herodotus/core';

import { ApplicationEnum } from '@/enums';

export interface BaseAppEntity extends AbstractSysEntity {
  appSecret: string;
  appName: string;
  appCode: string;
  applicationType: ApplicationEnum;
}

export interface BaseCmdbEntity extends AbstractSysEntity {
  purpose: string;
  contacts: string;
  phoneNumber: string;
}

export type {
  AxiosHttpResult,
  OAuth2Token,
  Conditions,
  Dictionary,
  EmptyObject,
  Entity,
  Page,
  Pageable,
  Pagination,
  Sort,
  Tree,
  BaseEntity,
  AbstractSysEntity,
  AbstractAuditEntity,
};
