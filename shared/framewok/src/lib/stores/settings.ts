import { defineStore } from 'pinia';

import type { SystemSetting } from '@/declarations';
import { ThemeModeEnum, LayoutModeEnum } from '@/declarations';

export const useSettingsStore = defineStore('SystemSetting', {
  state: (): SystemSetting => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum.SYSTEM,
      // 默认 primary 主题颜色
      dark: {
        primary: '#2563eb',
      },
      light: {
        primary: '#6750A4',
      },
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum.DEFAULT,
    /**
     * 界面效果
     */
    effect: {
      // 是否开启菜单手风琴效果
      isUniqueOpened: false,
    },
    display: {
      // 是否开启 TabsView
      isTabsView: true,
      // 关闭标签页，激活左侧标签页
      isActivateLeftTab: true,
      // 显示面包屑
      showBreadcrumbs: true,
      // 显示面包屑图标
      showBreadcrumbsIcon: true,
      table: {
        dense: false,
      },
    },
  }),

  getters: {
    isDark: (state) => state.theme.mode === ThemeModeEnum.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum.SYSTEM,
    isDarkenMode: (state) => state.theme.mode !== ThemeModeEnum.LIGHT,
    isLightenMode: (state) => state.theme.mode === ThemeModeEnum.LIGHT,
  },

  actions: {
    toDark() {
      this.theme.mode = ThemeModeEnum.DARK;
    },

    toLight() {
      this.theme.mode = ThemeModeEnum.LIGHT;
    },

    toSystem() {
      this.theme.mode = ThemeModeEnum.SYSTEM;
    },
  },
  persist: true,
});
