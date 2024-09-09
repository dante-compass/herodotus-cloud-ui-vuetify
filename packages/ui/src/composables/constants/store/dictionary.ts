import { defineStore } from 'pinia';

import type { Dictionary, SysDictionaryEntity } from '/@/lib/declarations';

import { lodash, api } from '/@/lib/utils';
import { useAuthenticationStore } from '/@/stores';

export const useDictionaryStore = defineStore('Dictionary', {
  state: () => ({
    dictionaries: {} as Record<string, Dictionary[]>
  }),

  actions: {
    convertItem(item: SysDictionaryEntity): Dictionary {
      const result: Dictionary = {
        ordinal: item.ordinal,
        name: item.name,
        value: item.value,
        label: item.label
      };
      return result;
    },

    convertItems(items: Array<SysDictionaryEntity>): Array<Dictionary> {
      if (items) {
        return lodash.orderBy(
          items.map(item => this.convertItem(item)),
          ['ordinal'],
          ['asc']
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

    getFromClient(category: string): Array<Dictionary> {
      return this.dictionaries[category];
    },

    getFromServer(category: string): Array<Dictionary> {
      this.fetchFromServer(category);
      return this.getFromClient(category);
    },

    getDictionary(category: string): Array<Dictionary> {
      let dictionary = this.getFromClient(category);
      if (lodash.isEmpty(dictionary)) {
        return this.getFromServer(category);
      } else {
        return dictionary;
      }
    },

    getDictionaryItem(category: string, value: string): Dictionary {
      const dictionary = this.getDictionary(category);
      if (dictionary) {
        return dictionary[Number(value)];
      } else {
        return {} as Dictionary;
      }
    },

    display(category: string, value: string) {
      const dictionary = this.getDictionaryItem(category, value);
      if (!lodash.isEmpty(dictionary)) {
        return dictionary.label;
      } else {
        return value;
      }
    }
  },

  persist: true
});
