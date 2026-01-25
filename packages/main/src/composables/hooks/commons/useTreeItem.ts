import type { Domain, Conditions, Tree } from '@herodotus/core';
import { AbstractService } from '@herodotus/core';

export default function useTreeItem<C extends Conditions, I extends Domain>(
  AbstractService: AbstractService<I>,
  immediate = true,
) {
  const treeItems = ref<Tree[]>([]) as Ref<Tree[]>;
  const conditions = ref({}) as Ref<C>;
  const loading = shallowRef<boolean>(false);

  const fetchTree = (params: Conditions = {}) => {
    loading.value = true;
    AbstractService.fetchTree(params)
      .then((result) => {
        const data = result.data as Array<Tree>;
        if (data) {
          treeItems.value = data;
        } else {
          treeItems.value = [];
        }
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  };

  watch(
    conditions,
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
