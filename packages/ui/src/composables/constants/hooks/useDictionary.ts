import { onBeforeMount, ref, Ref, nextTick } from 'vue';
import type { Dictionary } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';

import { useDictionaryStore } from '../store';

export default function useDictionary(category: string, ...others: string[]) {
  const dictionaryStore = useDictionaryStore();

  const options = ref([]) as Ref<Array<Dictionary>>;

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
      options.value = getDictionary();
    });
  });

  const getDictionary = () => {
    return dictionaryStore.getDictionary(category);
  };

  const getDictionaryItem = (key: string, value: string) => {
    return dictionaryStore.getDictionaryItem(key, value);
  };

  const getDictionaryItemDisplay = (key: string, value: string) => {
    return dictionaryStore.getDictionaryItemDisplay(key, value);
  };

  return {
    options,
    getDictionary,
    getDictionaryItem,
    getDictionaryItemDisplay,
  };
}
