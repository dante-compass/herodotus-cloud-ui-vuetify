import { ThemeModeEnum } from '../../declarations';
export default function useThemeTransition(): {
    theme: import('vue').ComputedRef<ThemeModeEnum>;
};
