import { defineStore } from 'pinia';
import { isEmpty, kebabCase } from 'lodash-es';
import * as mdiIcons from '@mdi/js';

export const useMdiIconStore = defineStore('MdiIcon', {
  state: () => ({
    icons: [] as string[],
  }),

  getters: {
    // 获取所有图标
    getAllIcons: (state) => state.icons,
  },

  actions: {
    // 初始化图标数据
    initialize() {
      if (isEmpty(this.icons)) {
        const resources = Object.keys(mdiIcons).map((icon) => {
          return kebabCase(icon);
        });

        this.icons = resources;
      }
    },

    // 搜索图标
    search(query: string): string[] {
      if (isEmpty(query.trim())) {
        return this.icons;
      }

      const needle = query.toLowerCase();
      return this.getAllIcons.filter((v) => v.toLowerCase().match(needle));
    },
  },
});
