import type { Ref } from 'vue';
import { ref, nextTick, onBeforeMount, computed } from 'vue';
import type { Dictionary } from '@/lib/declarations';

import { lodash } from '@/lib/utils';

import { useDictionaryStore } from '../store';

export default function useDictionary(category: string, ...others: string[]) {
  const dictionaryStore = useDictionaryStore();

  const options = ref<Dictionary[]>([]);

  onBeforeMount(async () => {
    options.value = getDictionary();
    if (lodash.isEmpty(options.value)) {
      if (lodash.isEmpty(others)) {
        await dictionaryStore.fetchByCategory(category);
      } else {
        await dictionaryStore.fetchCategory(category, ...others);
      }
    }
    nextTick(() => {
      if (lodash.isEmpty(options.value)) {
        options.value = getDictionary();
      }
    });
  });

  const getDictionary = (item: string = category): Dictionary[] => {
    const result = dictionaryStore.getDictionary(item);
    // 防止使用时 VSCODE 提示类型 Dictionary[] | undifined 问题
    return result ? result : [];
  };

  const getDictionaryItem = (key: string, value: string) => {
    return dictionaryStore.getDictionaryItem(key, value);
  };

  const getDictionaryItemDisplay = (key: string, value: string) => {
    return dictionaryStore.getDictionaryItemDisplay(key, value);
  };

  const isShow = computed(() => {
    return !lodash.isEmpty(options.value);
  });

  return {
    options,
    isShow,
    getDictionary,
    getDictionaryItem,
    getDictionaryItemDisplay,
  };
}
