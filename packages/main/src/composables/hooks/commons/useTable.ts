import type {
  Page,
  Entity,
  Conditions,
  HttpResult,
  AbstractService,
  Direction,
} from '@herodotus/core';
import type { SortItem } from '../../declarations';

import { watchDebounced } from '@vueuse/core';
import { isEmpty, pickBy, isNil } from 'lodash-es';
import { toast, notify } from '@herodotus/core';

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
export default function useTable<C extends Conditions, I extends Entity, O extends Entity = I>(
  service: AbstractService<I, O>,
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
    createSort,
  } = useBaseTable<C, I, O>(name, sorted, direction);

  const pageNumber = shallowRef(1);
  const pageSize = shallowRef(10);
  const sortBy = ref([]) as Ref<Array<SortItem>>;

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
        const data = result.data as Array<O>;
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
        const data = result.data as Page<O>;
        // 用户文档列表中无结果时也要更新列表数据
        if (!isEmpty(data)) {
          setPageData(data);
          hideLoading();
        } else {
          resetPageData();
          hideLoading();
        }
      })
      .catch((error) => {
        hideLoading();
      });
  };

  const deleteItemById = (id: string) => {
    notify.standardDeleteNotify(() => {
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

  const reloadItems = () => {
    findItems();
  };

  const removeEmptyProperties = (conditions: C) => {
    return pickBy(conditions, (value) => !isNil(value) && value !== '');
  };

  onMounted(() => {
    if (loadOnMount) {
      reloadItems();
    }
  });

  watchDebounced(
    conditions,
    (newValue) => {
      if (newValue && !fetchAll) {
        const validCondtions = removeEmptyProperties(newValue);
        findItemsByPage(pageNumber.value, pageSize.value, validCondtions);
      }
    },
    { debounce: 500, maxWait: 1000, deep: true },
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
    reloadItems,
  };
}
