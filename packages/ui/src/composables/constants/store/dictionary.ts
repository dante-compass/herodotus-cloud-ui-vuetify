import { defineStore } from 'pinia';
import type { SysDictionaryEntity, ConstantDictionary } from '/@/lib/declarations';

import { api } from '/@/lib/utils';

export const useDictionaryStore = defineStore('Dictionary', {
  state: () => ({
    dictionaries: {} as Record<string, ConstantDictionary[]>,
  }),

  actions: {
    convertItem(item: SysDictionaryEntity): ConstantDictionary {
      const result: ConstantDictionary = {
        ordinal: item.ordinal,
        name: item.name,
        value: item.value,
        label: item.label,
      };
      return result;
    },

    convertItems(items: Array<SysDictionaryEntity>): Array<ConstantDictionary> {
      if (items) {
        return items.map(item => this.convertItem(item));
      } else {
        return [];
      }
    },

    async getFromServer(category: string) {
      await api
        .sysDictionary()
        .fetchByCategory(category)
        .then(response => {
          const data = response.data;
          this.dictionaries[category] = this.convertItems(data);
        });
    },

    getFromLocal(category: string): Array<ConstantDictionary> {
      return this.dictionaries[category];
    },

    getDictionary(category: string): Array<ConstantDictionary> {
      let dictionary = this.getFromLocal(category);
      if (!dictionary) {
        this.getFromServer(category);
        dictionary = this.getFromLocal(category);
      }
      return dictionary;
    },

    getDictionaryItem(category: string, index: number): ConstantDictionary {
      const dictionary = this.getDictionary(category);
      if (dictionary) {
        return dictionary[index];
      } else {
        return {} as ConstantDictionary;
      }
    },
  },

  persist: true,
});
