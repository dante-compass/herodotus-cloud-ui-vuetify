import { RouteLocationNormalizedLoaded, RouteRecordName, RouteRecordNormalized } from 'vue-router';
import { Tab } from '../../declarations';
export declare const useTabsViewStore: import('pinia').StoreDefinition<"TabsView", {
    tabs: Array<Tab>;
    activatedTab: Tab;
    activatedTabName: RouteRecordName | null | undefined;
}, {
    isNotLastTab: (state: {
        tabs: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        }[];
        activatedTab: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        };
        activatedTabName: RouteRecordName | null | undefined;
    } & import('pinia').PiniaCustomStateProperties<{
        tabs: Array<Tab>;
        activatedTab: Tab;
        activatedTabName: RouteRecordName | null | undefined;
    }>) => (index: number) => boolean;
    getLastTabIndex: (state: {
        tabs: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        }[];
        activatedTab: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        };
        activatedTabName: RouteRecordName | null | undefined;
    } & import('pinia').PiniaCustomStateProperties<{
        tabs: Array<Tab>;
        activatedTab: Tab;
        activatedTabName: RouteRecordName | null | undefined;
    }>) => number;
    getTabIndex: (state: {
        tabs: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        }[];
        activatedTab: {
            name: import('vue-router').RouteRecordNameGeneric;
            path: string;
            meta: import('vue-router').RouteMeta;
        };
        activatedTabName: RouteRecordName | null | undefined;
    } & import('pinia').PiniaCustomStateProperties<{
        tabs: Array<Tab>;
        activatedTab: Tab;
        activatedTabName: RouteRecordName | null | undefined;
    }>) => (tab: Tab) => number;
    getActivatedTabIndex(): number;
    /**
     * 最后一个Tab是否为激活状态
     */
    isLastTabActivated(): boolean;
    isFirstTabActivated(): boolean;
    disableCloseCurrentTab(): boolean;
    disableCloseLeftTabs(): boolean;
    disableCloseRightTabs(): boolean;
    disableRefreshCurrentTab(): boolean;
}, {
    convertRouteToTab(route: RouteRecordNormalized | RouteLocationNormalizedLoaded): Tab;
    setActivatedTab(tab: Tab): void;
    isNotExistInStaticRoute(tab: Tab): boolean;
    isTabNotOpened(tab: Tab): boolean;
    openTab(tab: Tab, isDetail?: boolean): void;
    closeTab(tab: Tab): void;
    smartTab(route: RouteLocationNormalizedLoaded): void;
    deleteTab(route: RouteLocationNormalizedLoaded): void;
    closeCurrentTab(): void;
    closeOtherTabs(): void;
    closeLeftTabs(): void;
    closeRightTabs(): void;
}>;
