import { VDataTableServer } from 'vuetify/components';
import VueJsonPretty from 'vue-json-pretty';

/**
 * VDataTableServer Headers 属性类型的提取，方便表格页面定义时使用
 */
export type VDataTableHeaders = NonNullable<InstanceType<typeof VDataTableServer>['$props']['headers']>[number];

/**
 * DataTable sortBy 属性类型的提取，方便表格页面定义时使用
 */
export type SortItem = NonNullable<InstanceType<typeof VDataTableServer>['$props']['sortBy']>[number];

/**
 * VueJsonPretty JSON 数据类型
 */
export type JSONDataType = typeof VueJsonPretty;
