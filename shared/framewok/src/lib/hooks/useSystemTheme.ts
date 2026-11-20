import { computed, watch, shallowRef } from "vue";

import { toast, notify } from "@herodotus/core";
import { ThemeModeEnum } from "@herodotus/core";
import { useSettingsStore } from "../stores";
import { getColorPalette, mixColor } from "@/lib/utilities";

export default function useSystemTheme() {
  const settings = useSettingsStore();

  const darkTheme = shallowRef(ThemeModeEnum.DARK);

  // ---------- 登录页面 Theme ----------
  const backgroundThemeColor = computed(() => {
    return settings.isDarkenMode ? settings.theme.dark.primary : settings.theme.light.primary;
  });

  const lightColor = computed(() => {
    return getColorPalette(backgroundThemeColor.value as string, 3);
  });

  const darkColor = computed(() => {
    return getColorPalette(backgroundThemeColor.value as string, 6);
  });

  const backgroundColor = computed(() => {
    const COLOR_WHITE = "#ffffff";
    const ratio = settings.isDarkenMode ? 0.5 : 0.2;
    return mixColor(COLOR_WHITE, backgroundThemeColor.value, ratio);
  });

  /**
   * 登录页面循环切换系统主题按钮事件
   */
  const onCycleThemeChanged = () => {
    if (settings.isDark) {
      settings.toSystem();
      return;
    }

    if (settings.isSystem) {
      settings.toLight();
      return;
    }

    if (settings.isLight) {
      settings.toDark();
      return;
    }
  };

  const currentTheme = computed({
    get() {
      return settings.theme.mode;
    },
    set(newValue) {
      settings.theme.mode = newValue;
    },
  });

  const systemTheme = computed(() => {
    return settings.isSystem ? darkTheme.value : settings.theme.mode;
  });

  watch(
    () => settings.theme.mode,
    (newValue) => {
      if (newValue === ThemeModeEnum.SYSTEM) {
        toast.setTheme(ThemeModeEnum.DARK);
        notify.setTheme(ThemeModeEnum.DARK);
      } else {
        toast.setTheme(newValue);
        notify.setTheme(newValue);
      }
    },
  );

  /**
   * 登录页面循环切换系统主题按钮 Icon
   */
  const cycleChangeThemeIcon = computed((): string => {
    switch (settings.theme.mode) {
      case ThemeModeEnum.SYSTEM:
        return "mdi-brightness-5";
      case ThemeModeEnum.DARK:
        return "mdi-brightness-auto";
      default:
        return "mdi-brightness-4";
    }
  });

  const isLightenMode = computed(() => {
    return settings.isLightenMode;
  });

  const themeItems = [
    {
      text: "浅色主题",
      icon: "mdi-white-balance-sunny",
      value: "light",
    },
    {
      text: "深色主题",
      icon: "mdi-weather-night",
      value: "dark",
    },
    {
      text: "跟随系统",
      icon: "mdi-desktop-tower-monitor",
      value: "system",
    },
  ];

  return {
    isLightenMode,
    lightColor,
    darkColor,
    backgroundColor,
    currentTheme,
    systemTheme,
    cycleChangeThemeIcon,
    onCycleThemeChanged,
    themeItems,
  };
}
