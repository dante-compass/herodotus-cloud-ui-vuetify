import { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
export default function useEditFinish(currentRoute?: RouteLocationNormalizedLoadedGeneric): {
    onFinish: () => void;
};
