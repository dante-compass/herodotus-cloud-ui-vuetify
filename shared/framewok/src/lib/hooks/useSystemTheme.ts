import type { ThemeMode } from '@herodotus/core';

import { watch, shallowRef, computed, nextTick, watchEffect } from 'vue';
import { useTheme } from 'vuetify';

import { toast, notify } from '@herodotus/core';
import { ThemeModeEnum } from '@herodotus/core';
import { useSettingsStore } from '../stores';
import { getColorPalette, mixColor } from '@/lib/utilities';

export default function useSystemTheme() {
  const settings = useSettingsStore();
  const vuetifyTheme = useTheme();

  // ---------- Theme 切换效果 ----------
  const systemTheme = shallowRef(ThemeModeEnum.DARK);

  const hasScrollbar = (el?: Element | null) => {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
    const style = window.getComputedStyle(el);
    return (
      style.overflowY === 'scroll' ||
      (style.overflowY === 'auto' && el.scrollHeight > el.clientHeight)
    );
  };

  const themeTransition = () => {
    const x = performance.now();
    for (let i = 0; i++ < 1e7; (i << 9) & ((9 % 9) * 9 + 9));
    if (performance.now() - x > 10) return;

    const el: HTMLElement = document.querySelector('[data-v-app]')!;
    const children = el.querySelectorAll('*') as NodeListOf<HTMLElement>;

    children.forEach((el) => {
      if (hasScrollbar(el)) {
        el.dataset.scrollX = String(el.scrollLeft);
        el.dataset.scrollY = String(el.scrollTop);
      }
    });

    const copy = el.cloneNode(true) as HTMLElement;
    copy.classList.add('app-copy');
    const rect = el.getBoundingClientRect();
    copy.style.top = rect.top + 'px';
    copy.style.left = rect.left + 'px';
    copy.style.width = rect.width + 'px';
    copy.style.height = rect.height + 'px';

    const targetEl = document.activeElement as HTMLElement;
    const targetRect = targetEl.getBoundingClientRect();
    const left = targetRect.left + targetRect.width / 2 + window.scrollX;
    const top = targetRect.top + targetRect.height / 2 + window.scrollY;
    el.style.setProperty('--clip-pos', `${left}px ${top}px`);
    el.style.removeProperty('--clip-size');

    nextTick(() => {
      el.classList.add('app-transition');
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.setProperty(
            '--clip-size',
            Math.hypot(window.innerWidth, window.innerHeight) + 'px',
          );
        });
      });
    });

    document.body.append(copy);
    (copy.querySelectorAll('[data-scroll-x], [data-scroll-y]') as NodeListOf<HTMLElement>).forEach(
      (el) => {
        el.scrollLeft = Number(el.dataset.scrollX);
        el.scrollTop = Number(el.dataset.scrollY);
      },
    );

    function onTransitionend(e: TransitionEvent) {
      if (e.target === e.currentTarget) {
        copy.remove();
        el.removeEventListener('transitionend', onTransitionend);
        el.removeEventListener('transitioncancel', onTransitionend);
        el.classList.remove('app-transition');
        el.style.removeProperty('--clip-size');
        el.style.removeProperty('--clip-pos');
      }
    }
    el.addEventListener('transitionend', onTransitionend);
    el.addEventListener('transitioncancel', onTransitionend);
  };

  watchEffect(() => {
    vuetifyTheme.change(settings.isSystem ? systemTheme.value : settings.theme.mode);
  });

  watch(vuetifyTheme.global.name, (newValue) => {
    themeTransition();
    const current = newValue as ThemeMode;
    toast.setTheme(current);
    notify.setTheme(current);
  });

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
    const COLOR_WHITE = '#ffffff';
    const ratio = settings.isDarkenMode ? 0.5 : 0.2;
    return mixColor(COLOR_WHITE, backgroundThemeColor.value, ratio);
  });

  /**
   * 登录页面循环切换系统主题按钮事件
   */
  const onCycleChangeTheme = () => {
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

  /**
   * 登录页面循环切换系统主题按钮 Icon
   */
  const cycleChangeThemeIcon = computed((): string => {
    switch (settings.theme.mode) {
      case ThemeModeEnum.SYSTEM:
        return 'mdi-brightness-5';
      case ThemeModeEnum.DARK:
        return 'mdi-brightness-auto';
      default:
        return 'mdi-brightness-4';
    }
  });

  return {
    lightColor,
    darkColor,
    backgroundColor,
    onCycleChangeTheme,
    currentTheme,
    cycleChangeThemeIcon,
    systemTheme,
  };
}
