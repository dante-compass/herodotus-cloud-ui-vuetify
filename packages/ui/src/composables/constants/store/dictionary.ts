import { defineStore } from 'pinia';
import type { ConstantDictionary } from '/@/lib/declarations';

export const useDictionaryStore = defineStore('Dictionary', {
  state: () => ({
    dictionaries: {} as Record<string, ConstantDictionary[]>,
  }),

  persist: true,
});
