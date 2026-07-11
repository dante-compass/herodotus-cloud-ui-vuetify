import { RouteLocationNormalizedLoaded } from 'vue-router';
export default function useDetailPage(): {
    parseComponentName: (name: string, route?: RouteLocationNormalizedLoaded) => string;
    goBack: (parentName: string, currentName: string) => void;
};
