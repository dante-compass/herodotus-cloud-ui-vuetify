import type { SysDictionaryEntity, ConstantDictionary } from '/@/lib/declarations';

import { api } from '/@/lib/utils';

import { useDictionaryStore } from '../store';

export default function useDictionary() {
  const store = useDictionaryStore();

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
      return items.map(item => convertItem(item));
    } else {
      return [];
    }
  };

  const getFromServer = async (category: string) => {
    await api
      .sysDictionary()
      .fetchByCategory(category)
      .then(response => {
        const data = response.data;
        store.dictionaries[category] = convertItems(data);
      });
  };

  const getFromLocal = (category: string): Array<ConstantDictionary> => {
    return store.dictionaries[category];
  };

  const getDictionary = (category: string): Array<ConstantDictionary> => {
    let dictionary = getFromLocal(category);
    if (!dictionary) {
      getFromServer(category);
      dictionary = getFromLocal(category);
    }
    return dictionary;
  };

  const getDictionaryItem = (category: string, index: number): ConstantDictionary => {
    const dictionary = getDictionary(category);
    if (dictionary) {
      return dictionary[index];
    } else {
      return {} as ConstantDictionary;
    }
  };

  return {
    getDictionary,
    getDictionaryItem,
  };
}
