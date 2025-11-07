import type { Conditions, Entity, Page } from '@herodotus/core';
import type { SortItem } from '@/composables/declarations';

import { useRouter } from 'vue-router';
import { capitalize } from 'lodash-es';
import { OperationEnum } from '@herodotus/core';
import { useRouterStore } from '@herodotus/framework';

/**
 * 数据表格基础定义
 * @param name 页面名称（用于定位子页面（三级路由））
 * @param fetchAll 是否为读取全部数据
 * @returns 相关操作和定义
 */
export default function useBaseTable<E extends Entity, C extends Conditions>(name: string) {
  const loading = shallowRef(false);
  const totalPages = shallowRef(0);
  const totalItems = shallowRef(0);
  const tableRows = ref([]) as Ref<Array<E>>;
  const conditions = ref({}) as Ref<C>;

  const store = useRouterStore();
  const router = useRouter();

  /**
   * 进入 Table 详情页(三级路由页面)传递的参数
   * @param componentName 详情页(三级路由页面) 对应的组件名称
   * @param operation 对应的操作类型 {@link OperationEnum}
   * @param item 传递的数据
   */
  const addRoutePushParam = (
    componentName: string,
    operation: OperationEnum,
    item: E = {} as E,
    additional: Record<string, unknown> = {},
  ) => {
    store.addRoutePushParam(componentName, {
      item: JSON.stringify(item),
      operation: operation,
      additional: JSON.stringify(additional),
    });
    router.push({ name: componentName });
  };

  const appendSuffix = (name: string, suffix: string, withSuffix = true) => {
    return withSuffix ? name + suffix : name;
  };

  const toEdit = (item: E, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, 'Content', withSuffix);
    addRoutePushParam(componentName, OperationEnum.EDIT, item, additional);
  };

  const toCreate = (withSuffix = true) => {
    const componentName = appendSuffix(name, 'Content', withSuffix);
    addRoutePushParam(componentName, OperationEnum.CREATE);
  };

  const toAuthorize = (item: E, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, capitalize(OperationEnum.AUTHORIZE), withSuffix);
    addRoutePushParam(componentName, OperationEnum.AUTHORIZE, item, additional);
  };

  const toInfo = (item: E, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, capitalize(OperationEnum.INFO), withSuffix);
    addRoutePushParam(componentName, OperationEnum.INFO, item, additional);
  };

  const toSetup = (item: E, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, capitalize(OperationEnum.SETUP), withSuffix);
    addRoutePushParam(componentName, OperationEnum.SETUP, item, additional);
  };

  const toInvoke = (item: E, additional: Record<string, unknown> = {}, withSuffix = true) => {
    const componentName = appendSuffix(name, capitalize(OperationEnum.INVOKE), withSuffix);
    addRoutePushParam(componentName, OperationEnum.INVOKE, item, additional);
  };

  /**
   * 分页查询返回的结果数据
   * @param data
   */
  const setAllData = (data: Array<E>) => {
    tableRows.value = data;
    totalPages.value = 1;
    totalItems.value = data.length;
  };

  /**
   * 分页查询返回的结果数据
   * @param data
   */
  const setPageData = (data: Page<E>) => {
    tableRows.value = data.content;
    totalPages.value = data.totalPages;
    totalItems.value = parseInt(data.totalElements, 0);
  };

  /**
   * 数据相关对象重置为初始值
   */
  const resetPageData = () => {
    tableRows.value = [];
    totalPages.value = 0;
    totalItems.value = 0;
  };

  /**
   * 显示 Loading 状态
   */
  const showLoading = () => {
    loading.value = true;
  };

  /**
   * 隐藏 Loading 状态
   */
  const hideLoading = () => {
    loading.value = false;
  };

  return {
    conditions,
    loading,
    tableRows,
    totalPages,
    totalItems,
    addRoutePushParam,
    setAllData,
    setPageData,
    resetPageData,
    showLoading,
    hideLoading,
    toAuthorize,
    toCreate,
    toEdit,
    toInfo,
    toSetup,
    toInvoke,
  };
}
