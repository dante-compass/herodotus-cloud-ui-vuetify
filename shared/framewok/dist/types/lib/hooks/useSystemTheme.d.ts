import { ThemeModeEnum } from '@herodotus/core';
export default function useSystemTheme(): {
    isLightenMode: import('vue').ComputedRef<boolean>;
    lightColor: import('vue').ComputedRef<string>;
    darkColor: import('vue').ComputedRef<string>;
    backgroundColor: import('vue').ComputedRef<string>;
    currentTheme: import('vue').WritableComputedRef<ThemeModeEnum, ThemeModeEnum>;
    systemTheme: import('vue').ComputedRef<ThemeModeEnum>;
    cycleChangeThemeIcon: import('vue').ComputedRef<string>;
    onCycleThemeChanged: () => void;
    themeItems: {
        text: string;
        icon: string;
        value: string;
    }[];
};
