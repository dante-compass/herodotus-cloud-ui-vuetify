import type { Entity, Conditions, Tree } from '@herodotus/core';
import { AbstractService } from '@herodotus/core';

export default function useTreeItem<T extends Entity, C extends Conditions>(
  AbstractService: AbstractService<T>,
  immediate = true,
) {
  const treeItems = ref<Tree[]>([]) as Ref<Tree[]>;
  const conditions = ref({}) as Ref<C>;
  const loading = shallowRef<boolean>(false);

  const fetchTree = (params: Conditions = {}) => {
    AbstractService.fetchTree(params).then((result) => {
      const data = result.data as Array<Tree>;
      if (data) {
        treeItems.value = data;
      } else {
        treeItems.value = [];
      }
    });
  };

  watch(
    () => conditions.value,
    (newValue) => {
      fetchTree(newValue);
    },
    {
      deep: true,
      immediate: immediate,
    },
  );

  return {
    loading,
    conditions,
    treeItems,
    fetchTree,
  };
}
