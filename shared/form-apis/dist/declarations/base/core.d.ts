export type { Entity, Conditions, AxiosHttpResult, Page, Pageable, QBaseDataItem } from '@herodotus-cloud/core';
export interface BaseMongoEntity {
    id?: string;
    createTime?: Date;
    updateTime?: Date;
}
