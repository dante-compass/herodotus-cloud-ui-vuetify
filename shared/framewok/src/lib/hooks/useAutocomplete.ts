import type { Conditions, Domain, AbstractService } from "@herodotus/core";
import type { Ref } from "vue";

import { shallowRef, ref } from "vue";
import { isEmpty } from "lodash-es";
import { watchDebounced } from "@vueuse/core";

/**
 * 自动补全（Autocompletes）使用 hooks
 *
 * @param property 查询属性
 * @param service API 服务
 * @param <I> 输入值类型。传递给三级路由页面操作数据类型。通常为输入和输出为相同的实体类型，也可为非实体的 Dto 类型。
 * @param <O> 输出值类型，数据表格显示接口返回内容数据类型。通常为输入和输出为相同的实体类型，也可为非实体的 Dto 类型。
 * @returns
 */
export default function useAutocomplete<C extends Conditions, I extends Domain, O extends Domain = I>(
  property: keyof C,
  service: AbstractService<I, O>,
) {
  const search = shallowRef("");
  const loading = shallowRef(false);
  const items = ref([]) as Ref<Array<O>>;
  const conditions = {} as C;

  /**
   * 查询返回的结果数据
   * @param data
   */
  const setData = (data: Array<O>) => {
    items.value = data;
  };

  /**
   * 数据相关对象重置为初始值
   */
  const resetData = () => {
    items.value = [];
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

  const setParam = (value: any) => {
    conditions[property] = value;
  };

  const findItems = (value: any) => {
    showLoading();
    setParam(value);
    service
      .fetchAll({
        ...conditions,
      })
      .then((result) => {
        const data = result.data as Array<O>;
        if (!isEmpty(data)) {
          setData(data);
        } else {
          resetData();
        }
        hideLoading();
      })
      .catch((error) => {
        hideLoading();
      });
  };

  watchDebounced(
    search,
    (newValue) => {
      if (isEmpty(newValue)) {
        resetData();
      } else {
        findItems(newValue);
      }
    },
    { debounce: 1000, maxWait: 1000, deep: true },
  );

  return {
    search,
    loading,
    items,
  };
}
