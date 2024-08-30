import { defineStore } from 'pinia';

import type { ConstantDictionary, SysDictionaryEntity } from '/@/lib/declarations';

import { lodash, api } from '/@/lib/utils';
import { useAuthenticationStore } from '/@/stores';

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
        return lodash.orderBy(
          items.map(item => this.convertItem(item)),
          ['ordinal'],
          ['asc'],
        );
      } else {
        return [];
      }
    },

    async fetchFromServer(category: string): Promise<void> {
      const authentication = useAuthenticationStore();

      if (authentication.token) {
        await api
          .sysDictionary()
          .fetchByCategory(category)
          .then(response => {
            const data = response.data;
            this.dictionaries[category] = data;
          });
      }
    },

    getFromClient(category: string): Array<ConstantDictionary> {
      return this.dictionaries[category];
    },

    getFromServer(category: string): Array<ConstantDictionary> {
      this.fetchFromServer(category);
      return this.getFromClient(category);
    },

    getDictionary(category: string): Array<ConstantDictionary> {
      let dictionary = this.getFromClient(category);
      if (lodash.isEmpty(dictionary)) {
        return this.getFromServer(category);
      } else {
        return dictionary;
      }
    },

    getDictionaryItem(category: string, value: string): ConstantDictionary {
      const dictionary = this.getDictionary(category);
      if (dictionary) {
        return dictionary[Number(value)];
      } else {
        return {} as ConstantDictionary;
      }
    },

    display(category: string, value: string) {
      const dictionary = this.getDictionaryItem(category, value);
      if (!lodash.isEmpty(dictionary)) {
        return dictionary.label;
      } else {
        return value;
      }
    },
  },

  persist: true,
});
