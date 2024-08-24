import { defineStore } from 'pinia';
import type { SysDictionaryEntity, ConstantDictionary } from '/@/lib/declarations';

import { api } from '/@/lib/utils';

export const useConstantsStore = defineStore('Constants', {
  state: () => ({
    enums: {} as Record<string, ConstantDictionary[]>,
  }),

  actions: {
    to(item: SysDictionaryEntity): ConstantDictionary {
      const result: ConstantDictionary = {
        ordinal: item.ordinal,
        name: item.name,
        value: item.value,
        label: item.label,
      };
      return result;
    },

    convert(items: Array<SysDictionaryEntity>): Array<ConstantDictionary> {
      if (items) {
        return items.map(item => this.to(item));
      } else {
        return [];
      }
    },

    async fetch(category: string) {
      await api
        .sysDictionary()
        .fetchByCategory(category)
        .then(response => {
          const data = response.data;
          this.enums[category] = this.convert(data);
        });
    },

    read(category: string): Array<ConstantDictionary> {
      return this.enums[category];
    },

    getDictionary(category: string): Array<ConstantDictionary> {
      let dictionary = this.read(category);
      if (!dictionary) {
        this.fetch(category);
        dictionary = this.read(category);
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
