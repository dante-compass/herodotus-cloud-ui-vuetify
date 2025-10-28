import { SystemSetting, ThemeModeEnum, LayoutModeEnum } from '../../declarations';
export declare const useSettingsStore: import('pinia').StoreDefinition<"SystemSetting", SystemSetting, {
    isDark: (state: {
        theme: {
            mode: ThemeModeEnum;
            dark: {
                primary: string;
            };
            light: {
                primary: string;
            };
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
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
    isLight: (state: {
        theme: {
            mode: ThemeModeEnum;
            dark: {
                primary: string;
            };
            light: {
                primary: string;
            };
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
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
    isSystem: (state: {
        theme: {
            mode: ThemeModeEnum;
            dark: {
                primary: string;
            };
            light: {
                primary: string;
            };
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
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
    isDarkenMode: (state: {
        theme: {
            mode: ThemeModeEnum;
            dark: {
                primary: string;
            };
            light: {
                primary: string;
            };
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
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
    isLightenMode: (state: {
        theme: {
            mode: ThemeModeEnum;
            dark: {
                primary: string;
            };
            light: {
                primary: string;
            };
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
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
}, {
    toDark(): void;
    toLight(): void;
    toSystem(): void;
}>;
