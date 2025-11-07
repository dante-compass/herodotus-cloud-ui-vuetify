export * from './plugins';
/**
 * 数据字典定义
 */
export type Dictionary = {
    ordinal: number;
    name: string;
    value: string;
    label: string;
};
/**
 * 数据排序类型定义
 */
export type Direction = 'DESC' | 'ASC';
