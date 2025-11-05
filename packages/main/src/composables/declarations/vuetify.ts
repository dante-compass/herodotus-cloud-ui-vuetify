import { VDataTableServer } from 'vuetify/components';

/**
 * VDataTableServer Headers 属性类型的提取，方便表格页面定义时使用
 */
export type VDataTableHeaders = NonNullable<
  InstanceType<typeof VDataTableServer>['$props']['headers']
>[number];
