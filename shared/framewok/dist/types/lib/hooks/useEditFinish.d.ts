import { RouteLocationNormalizedGeneric } from 'vue-router';
export default function useEditFinish(realRoute?: RouteLocationNormalizedGeneric): {
    onFinish: () => void;
};
