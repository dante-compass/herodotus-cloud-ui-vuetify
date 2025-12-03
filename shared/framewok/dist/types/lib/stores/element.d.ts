import { RouteRecordRaw, RouteLocationNormalizedLoaded } from 'vue-router';
import { PushParam, MenuItem } from '../../declarations';
export declare const useElementStore: import('pinia').StoreDefinition<"SystemElement", Pick<{
    isDynamicRouteAdded: import('vue').ComputedRef<boolean>;
    getDetailComponent: (key: string) => any;
    getRoutePushParam: (key: string) => PushParam | undefined;
    addCachedRoute: (route: RouteLocationNormalizedLoaded) => void;
    addDetailRoute: (item: RouteRecordRaw) => void;
    addMenus: (app: MenuItem[], personal: MenuItem[]) => void;
    hasParameter: (route: RouteLocationNormalizedLoaded) => boolean;
    isDetailRoute: (route: RouteLocationNormalizedLoaded) => boolean;
    isValidDetailRoute: (route: RouteLocationNormalizedLoaded) => boolean;
    addRoutePushParam: (name: string, params?: PushParam) => void;
    removeRoutePushParam: (name: string) => void;
}, never>, Pick<{
    isDynamicRouteAdded: import('vue').ComputedRef<boolean>;
    getDetailComponent: (key: string) => any;
    getRoutePushParam: (key: string) => PushParam | undefined;
    addCachedRoute: (route: RouteLocationNormalizedLoaded) => void;
    addDetailRoute: (item: RouteRecordRaw) => void;
    addMenus: (app: MenuItem[], personal: MenuItem[]) => void;
    hasParameter: (route: RouteLocationNormalizedLoaded) => boolean;
    isDetailRoute: (route: RouteLocationNormalizedLoaded) => boolean;
    isValidDetailRoute: (route: RouteLocationNormalizedLoaded) => boolean;
    addRoutePushParam: (name: string, params?: PushParam) => void;
    removeRoutePushParam: (name: string) => void;
}, "isDynamicRouteAdded">, Pick<{
    isDynamicRouteAdded: import('vue').ComputedRef<boolean>;
    getDetailComponent: (key: string) => any;
    getRoutePushParam: (key: string) => PushParam | undefined;
    addCachedRoute: (route: RouteLocationNormalizedLoaded) => void;
    addDetailRoute: (item: RouteRecordRaw) => void;
    addMenus: (app: MenuItem[], personal: MenuItem[]) => void;
    hasParameter: (route: RouteLocationNormalizedLoaded) => boolean;
    isDetailRoute: (route: RouteLocationNormalizedLoaded) => boolean;
    isValidDetailRoute: (route: RouteLocationNormalizedLoaded) => boolean;
    addRoutePushParam: (name: string, params?: PushParam) => void;
    removeRoutePushParam: (name: string) => void;
}, "getDetailComponent" | "getRoutePushParam" | "addCachedRoute" | "addDetailRoute" | "addMenus" | "hasParameter" | "isDetailRoute" | "isValidDetailRoute" | "addRoutePushParam" | "removeRoutePushParam">>;
