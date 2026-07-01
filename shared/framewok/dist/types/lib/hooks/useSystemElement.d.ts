import { Router } from 'vue-router';
export default function useSystemElement(vueModules: Record<string, unknown>, locate: (item: string) => string, getRoutesFromServer: (roles: string[]) => Promise<any>): {
    initBackendSecurity: (router: Router, roles: string[]) => Promise<void>;
};
