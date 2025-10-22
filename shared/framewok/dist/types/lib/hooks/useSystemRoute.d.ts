import { Router } from 'vue-router';
export default function useSystemRoute(routeModules: Record<string, unknown>, vueModules: Record<string, unknown>, locate: (item: string) => string, getRoutesFromServer: () => Promise<any>): {
    initBackEndRoutes: (router: Router) => Promise<void>;
    initFrontEndRoutes: (router: Router) => Promise<void>;
};
