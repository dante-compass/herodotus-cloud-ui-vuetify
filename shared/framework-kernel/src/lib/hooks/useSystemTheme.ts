import { watch, shallowRef, computed } from 'vue';

import { ThemeModeEnum } from '@/declarations';
import { useSettingsStore } from '../stores';

export default function useSystemTheme() {
  let media: MediaQueryList;

  const settings = useSettingsStore();
  const systemTheme = shallowRef(ThemeModeEnum.DARK);
  const IN_BROWSER = typeof window !== 'undefined';

  const getMatchMedia = () => {
    if (!IN_BROWSER) return;

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
