import { ref, Ref } from 'vue';

import type { SysDictionaryEntity, ConstantDictionary } from '/@/lib/declarations';

import { api, lodash } from '/@/lib/utils';

import { useDictionaryStore } from '../store';
import { useAuthenticationStore } from '/@/stores';

export default function useDictionary() {
  const store = useDictionaryStore();

  const authentication = useAuthenticationStore();

  const convertItem = (item: SysDictionaryEntity): ConstantDictionary => {
    const result: ConstantDictionary = {
      ordinal: item.ordinal,
      name: item.name,
      value: item.value,
      label: item.label,
    };
    return result;
  };

  const convertItems = (items: Array<SysDictionaryEntity>): Array<ConstantDictionary> => {
    if (items) {
      return lodash.orderBy(
        items.map(item => convertItem(item)),
        ['ordinal'],
        ['asc'],
      );
    } else {
      return [];
    }
  };

  const getFromServer = async (category: string) => {
    if (authentication.token) {
      await api
        .sysDictionary()
        .fetchByCategory(category)
        .then(response => {
          const data = response.data;
          store.dictionaries[category] = convertItems(data);
        });
    }
  };

  const getFromLocal = (category: string): Array<ConstantDictionary> => {
    return store.dictionaries[category];
  };

  const getDictionary = (category: string): Array<ConstantDictionary> => {
    let dictionary = getFromLocal(category);
    if (lodash.isEmpty(dictionary)) {
      getFromServer(category);
      dictionary = getFromLocal(category);
    }
    return dictionary;
  };

  const getDictionaryItem = (category: string, value: string): ConstantDictionary => {
    const dictionary = getDictionary(category);
    if (dictionary) {
      return dictionary[Number(value)];
    } else {
      return {} as ConstantDictionary;
    }
  };

  const display = (category: string, value: string) => {
    const dictionary = getDictionaryItem(category, value);
    if (!lodash.isEmpty(dictionary)) {
      return dictionary.label;
    } else {
      return value;
    }
  };

  return {
    getDictionary,
    getDictionaryItem,
    display,
  };
}
