import { computed } from "vue";

import { toast, notify } from "@herodotus/core";
import { ThemeModeEnum } from "@herodotus/core";
import { useSettingsStore } from "../stores";
import { getColorPalette, mixColor } from "@/lib/utilities";

export default function useSystemTheme() {
  const settings = useSettingsStore();

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

  const currentTheme = computed({
    get() {
      return settings.theme.mode;
    },
    set(newValue) {
      settings.theme.mode = newValue;
      toast.setTheme(newValue);
      notify.setTheme(newValue);
    },
  });

  const supportedThemes = [ThemeModeEnum.LIGHT, ThemeModeEnum.DARK, ThemeModeEnum.SYSTEM];

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

  return {
    isLightenMode,
    lightColor,
    darkColor,
    backgroundColor,
    currentTheme,
    cycleChangeThemeIcon,
    supportedThemes,
  };
}
