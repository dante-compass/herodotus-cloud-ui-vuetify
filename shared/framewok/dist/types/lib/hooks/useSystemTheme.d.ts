import { ThemeModeEnum } from '@herodotus/core';
export default function useSystemTheme(): {
    lightColor: import('vue').ComputedRef<string>;
    darkColor: import('vue').ComputedRef<string>;
    backgroundColor: import('vue').ComputedRef<string>;
    onCycleChangeTheme: () => void;
    currentTheme: import('vue').WritableComputedRef<ThemeModeEnum, ThemeModeEnum>;
    cycleChangeThemeIcon: import('vue').ComputedRef<string>;
    systemTheme: import('vue').ShallowRef<ThemeModeEnum, ThemeModeEnum>;
};
