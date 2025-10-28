import { GlobalSetting, ThemeModeEnum, LayoutModeEnum } from '../../declarations';
export declare const useSettingsStore: import('pinia').StoreDefinition<"GlobalSettings", GlobalSetting, {
    isDark: (state: {
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
    isLight: (state: {
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
    isSystem: (state: {
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
    isDarkenMode: (state: {
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
}, {
    toDark(): void;
    toLight(): void;
    toSystem(): void;
}>;
