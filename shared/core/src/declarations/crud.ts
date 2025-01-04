import { StatusEnum } from '/@/enums';

export interface Entity {}

export interface Conditions {}

export interface BaseEntity extends Entity {
  createTime?: Date;
  updateTime?: Date;
}

export interface AbstractJpaEntity extends BaseEntity {
  createBy?: string;
  updateBy?: string;
  ranking?: number;
}

export interface BaseSysEntity extends AbstractJpaEntity {
  status: StatusEnum;
  reserved: boolean;
  reversion: number;
  description: string;
}

export type Page<T extends Entity> = {
  content: T[];
  totalElements: string;
  totalPages: number;
};

export type Slice<T extends Entity> = {
  content: T[];
  hasNext: boolean;
  hasPrevious: boolean;
};

export interface Sort {
  direction?: 'ASC' | 'DESC';
  properties?: Array<string>;
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
}

export interface Pageable extends Pagination, Sort {}

export interface Tree {
  id: string;
  parentId: string;
  name: string;
  selector: number;
  children?: Array<Tree>;
}
