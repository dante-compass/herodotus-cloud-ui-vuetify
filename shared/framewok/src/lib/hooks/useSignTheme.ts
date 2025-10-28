import { computed } from 'vue';
import { useSettingsStore } from '@/lib/stores';

import { getColorPalette, mixColor } from '@/lib/utilities';

export default function useSignInTheme() {
  const settings = useSettingsStore();

  const backgroundThemeColor = computed(() => {
    return settings.isDarkenMode
      ? getColorPalette(settings.theme.primary, 7)
      : settings.theme.primary;
  });

  const lightColor = computed(() => {
    return getColorPalette(backgroundThemeColor.value as string, 3);
  });

  const darkColor = computed(() => {
    return getColorPalette(backgroundThemeColor.value as string, 6);
  });

  const backgroundColor = computed(() => {
    const COLOR_WHITE = '#ffffff';
    const ratio = settings.isDarkenMode ? 0.5 : 0.2;
    return mixColor(COLOR_WHITE, settings.theme.primary, ratio);
  });

  return {
    lightColor,
    darkColor,
    backgroundColor,
  };
}
