import { ThemeModeEnum } from '../../declarations';
export default function useSystemTheme(): {
    currentSystemTheme: import('vue').ComputedRef<ThemeModeEnum>;
    lightColor: import('vue').ComputedRef<string>;
    darkColor: import('vue').ComputedRef<string>;
    backgroundColor: import('vue').ComputedRef<string>;
    onCycleChangeTheme: () => void;
    cycleChangeThemeIcon: import('vue').ComputedRef<string>;
};
