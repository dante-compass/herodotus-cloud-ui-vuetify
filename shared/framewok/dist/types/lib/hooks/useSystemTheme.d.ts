export default function useSystemTheme(): {
    lightColor: import('vue').ComputedRef<string>;
    darkColor: import('vue').ComputedRef<string>;
    backgroundColor: import('vue').ComputedRef<string>;
    onCycleChangeTheme: () => void;
    cycleChangeThemeIcon: import('vue').ComputedRef<string>;
};
