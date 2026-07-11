import { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
export default function useDetailPage(): {
    parseComponentName: (name: string, route?: RouteLocationNormalizedLoadedGeneric) => string;
    goBack: (parentName: string, currentName: string) => void;
};
