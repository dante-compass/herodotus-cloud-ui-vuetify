import type {
  Page,
  Sort,
  Entity,
  Conditions,
  HttpResult,
  AbstractService,
  Direction,
} from '@herodotus/core';
import type { SortItem } from '../../declarations';

import { concat, isBoolean, isEmpty, isString, map, pickBy, isNil } from 'lodash-es';
import { toast, standardDeleteNotify } from '@herodotus/core';
import useBaseTable from './useBaseTable';

/**
 * 数据表格通用操作定义
 * @param service 后端 API 对应服务
 * @param name 表格页面 Index.vue 对应组件名称
 * @param fetchAll 是否为查询全部数据
 * @param sorted 排序字段
 * @param direction 排序方向
 * @param loadOnMount 是否在 onMount 阶段加载
 * @returns
 */
export default function <E extends Entity, C extends Conditions>(
  service: AbstractService<E>,
  name: string,
  fetchAll = false,
  sorted = [] as Array<string>,
  direction = 'DESC' as Direction,
  loadOnMount = true,
) {
  const {
    loading,
    tableRows,
    totalPages,
    totalItems,
    conditions,
    showLoading,
    hideLoading,
    toCreate,
    toEdit,
    toAuthorize,
    toInfo,
    setAllData,
    setPageData,
    resetPageData,
  } = useBaseTable<E, C>(name);

  const pageNumber = shallowRef(1);
  const pageSize = shallowRef(10);
  const sortBy = ref([]) as Ref<Array<SortItem>>;

  const parseDirection = (sortBy: Array<SortItem>): Direction => {
    const flag = sortBy[0];
    if (flag && flag.order) {
      if (isBoolean(flag.order)) {
        return flag.order ? 'DESC' : 'ASC';
      }

      if (isString(flag.order)) {
        return flag.order.toUpperCase() as 'DESC' | 'ASC';
      }
    }

    return 'DESC';
  };

  const createSort = (sortBy: Array<SortItem>): Sort => {
    if (!isEmpty(sortBy)) {
      return {
        properties: concat(map(sortBy, 'key'), 'updateTime'),
        direction: parseDirection(sortBy),
      };
    } else {
      if (!isEmpty(sorted)) {
        return {
          properties: sorted,
          direction: direction,
        };
      } else {
        return { properties: ['updateTime'], direction: 'DESC' };
      }
    }
  };

  const findItems = () => {
    if (fetchAll) {
      findAllItems();
    } else {
      findItemsByPage(pageNumber.value, pageSize.value);
    }
  };

  const findAllItems = () => {
    showLoading();
    service
      .fetchAll({
        ...createSort(sortBy.value),
        ...conditions.value,
      })
      .then((result) => {
        const data = result.data as Array<E>;
        if (!isEmpty(data)) {
          setAllData(data);
        } else {
          resetPageData();
        }
        hideLoading();
      })
      .catch((error) => {
        hideLoading();
      });
  };

  const findItemsByPage = (pageNumber = 1, pageSize = 10, others = {}) => {
    showLoading();
    service
      .fetchByPage(
        {
          pageNumber: pageNumber - 1,
          pageSize: pageSize,
          ...createSort(sortBy.value),
        },
        others,
      )
      .then((result) => {
        const data = result.data as Page<E>;
        // 用户文档列表中无结果时也要更新列表数据
        if (!isEmpty(data)) {
          setPageData(data);
        } else {
          resetPageData();
        }
        hideLoading();
      })
      .catch(() => {
        hideLoading();
      });
  };

  const deleteItemById = (id: string) => {
    standardDeleteNotify(() => {
      service
        .delete(id)
        .then((response) => {
          const result = response as HttpResult<string>;
          if (result.message) {
            toast.success(result.message);
          } else {
            toast.success('删除成功');
          }

          findItemsByPage(pageNumber.value, pageSize.value, conditions.value);
        })
        .catch((error) => {
          if (error.message) {
            toast.error(error.message);
          } else {
            toast.error('删除失败');
          }
        });
    });
  };

  const refresh = () => {
    findItems();
  };

  const removeEmptyProperties = (conditions: C) => {
    return pickBy(conditions, (value) => !isNil(value) && value !== '');
  };

  onMounted(() => {
    if (loadOnMount) {
      refresh();
    }
  });

  watch(
    conditions,
    (newValue) => {
      if (newValue && !fetchAll) {
        const validCondtions = removeEmptyProperties(newValue);
        findItemsByPage(pageNumber.value, pageSize.value, validCondtions);
      }
    },
    { deep: true },
  );

  return {
    loading,
    pageNumber,
    pageSize,
    tableRows,
    totalPages,
    totalItems,
    conditions,
    findItems,
    toCreate,
    toEdit,
    toAuthorize,
    toInfo,
    findItemsByPage,
    deleteItemById,
    refresh,
  };
}
