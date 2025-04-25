import { watch, ref, computed } from 'vue';

import { ThemeModeEnum } from '@/lib/definitions';
import { useSettingsStore } from '@/stores';
import { CONSTANTS } from '@/configurations';

export default function useSystemTheme() {
  let media: MediaQueryList;

  const settings = useSettingsStore();
  const systemTheme = ref<string>(ThemeModeEnum.DARK);

  const getMatchMedia = () => {
    if (!CONSTANTS.IN_BROWSER) return;

    return window.matchMedia('(prefers-color-scheme: dark)');
  };

  const onThemeChange = () => {
    systemTheme.value = media!.matches ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT;
  };

  watch(
    () => settings.theme.mode,
    (val) => {
      if (val === ThemeModeEnum.SYSTEM) {
        media = getMatchMedia()!;
        media.addEventListener('change', onThemeChange);
        onThemeChange();
      } else if (media) {
        media.removeEventListener('change', onThemeChange);
      }
    },
    { immediate: true },
  );

  const theme = computed(() => {
    return settings.isSystem ? systemTheme.value : settings.theme.mode;
  });

  return {
    theme,
  };
}
