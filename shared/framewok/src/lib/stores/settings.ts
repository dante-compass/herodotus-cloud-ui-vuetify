import type { SystemSetting } from "@/declarations";

import { defineStore } from "pinia";

import { ThemeModeEnum } from "@herodotus/core";
import { LayoutModeEnum, LibraryEnum, TableStyleEnum } from "@/declarations";

export const useSettingsStore = defineStore("SystemSettings", {
  state: (): SystemSetting => ({
    /**
     * 组件库
     */
    library: LibraryEnum.VUETIFY,
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum.SYSTEM,
      // 默认 primary 主题颜色
      dark: {
        primary: "#2563eb",
      },
      light: {
        primary: "#6750A4",
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
        style: TableStyleEnum.LIST,
      },
    },
  }),

  getters: {
    isDark: (state) => state.theme.mode === ThemeModeEnum.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum.SYSTEM,
    isDarkenMode: (state) => state.theme.mode !== ThemeModeEnum.LIGHT,
    isLightenMode: (state) => state.theme.mode === ThemeModeEnum.LIGHT,
    density: (state) => (state.display.table.dense ? "compact" : "default"),
    densitySwitch: (state) => {
      return (trueValue: string, falseValue: string) => (state.display.table.dense ? trueValue : falseValue);
    },
    displayAsCard: (state) => state.display.table.style === TableStyleEnum.CARD,
    displayAsList: (state) => state.display.table.style === TableStyleEnum.LIST,
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

    changeTableStyle(style: TableStyleEnum) {
      this.display.table.style === style;
    },
  },
  persist: true,
});
