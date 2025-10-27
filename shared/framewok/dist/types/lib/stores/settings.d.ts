import { GlobalSetting, ThemeModeEnum, LayoutModeEnum } from '../../declarations';
export declare const useSettingsStore: import('pinia').StoreDefinition<"GlobalSettings", GlobalSetting, {
    isDarkMode: (state: {
        theme: {
            mode: ThemeModeEnum;
            isMixed: boolean;
            primary: string;
        };
        layout: LayoutModeEnum;
        effect: {
            isUniqueOpened: boolean;
        };
        display: {
            isTabsView: boolean;
            isActivateLeftTab: boolean;
            showBreadcrumbs: boolean;
            showBreadcrumbsIcon: boolean;
            table: {
                dense: boolean;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<GlobalSetting>) => boolean;
    isLightMode: (state: {
        theme: {
            mode: ThemeModeEnum;
            isMixed: boolean;
            primary: string;
        };
        layout: LayoutModeEnum;
        effect: {
            isUniqueOpened: boolean;
        };
        display: {
            isTabsView: boolean;
            isActivateLeftTab: boolean;
            showBreadcrumbs: boolean;
            showBreadcrumbsIcon: boolean;
            table: {
                dense: boolean;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<GlobalSetting>) => boolean;
    isSystemMode: (state: {
        theme: {
            mode: ThemeModeEnum;
            isMixed: boolean;
            primary: string;
        };
        layout: LayoutModeEnum;
        effect: {
            isUniqueOpened: boolean;
        };
        display: {
            isTabsView: boolean;
            isActivateLeftTab: boolean;
            showBreadcrumbs: boolean;
            showBreadcrumbsIcon: boolean;
            table: {
                dense: boolean;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<GlobalSetting>) => boolean;
    isDefaultLayout: (state: {
        theme: {
            mode: ThemeModeEnum;
            isMixed: boolean;
            primary: string;
        };
        layout: LayoutModeEnum;
        effect: {
            isUniqueOpened: boolean;
        };
        display: {
            isTabsView: boolean;
            isActivateLeftTab: boolean;
            showBreadcrumbs: boolean;
            showBreadcrumbsIcon: boolean;
            table: {
                dense: boolean;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<GlobalSetting>) => boolean;
    isClassicLayout: (state: {
        theme: {
            mode: ThemeModeEnum;
            isMixed: boolean;
            primary: string;
        };
        layout: LayoutModeEnum;
        effect: {
            isUniqueOpened: boolean;
        };
        display: {
            isTabsView: boolean;
            isActivateLeftTab: boolean;
            showBreadcrumbs: boolean;
            showBreadcrumbsIcon: boolean;
            table: {
                dense: boolean;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<GlobalSetting>) => boolean;
}, {}>;
