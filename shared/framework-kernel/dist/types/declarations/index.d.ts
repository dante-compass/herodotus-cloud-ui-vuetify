import { Router, RouteLocationRaw } from 'vue-router';
export interface RouterOptions {
    instance: Router;
    path: {
        root: RouteLocationRaw;
        home: RouteLocationRaw;
        signIn: RouteLocationRaw;
    };
}
export interface KernelOptions {
    router: RouterOptions;
}
