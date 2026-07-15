import { SystemSetting, LayoutModeEnum, LibraryEnum, TableStyleEnum } from '../../declarations';
import { ThemeModeEnum } from '@herodotus/core';
export declare const useSettingsStore: import('pinia').StoreDefinition<"SystemSettings", SystemSetting, {
    isDark: (state: {
        library: LibraryEnum;
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
                style: TableStyleEnum;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
    isLight: (state: {
        library: LibraryEnum;
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
                style: TableStyleEnum;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
    isSystem: (state: {
        library: LibraryEnum;
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
                style: TableStyleEnum;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
    isDarkenMode: (state: {
        library: LibraryEnum;
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
                style: TableStyleEnum;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
    isLightenMode: (state: {
        library: LibraryEnum;
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
                style: TableStyleEnum;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
    density: (state: {
        library: LibraryEnum;
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
                style: TableStyleEnum;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => "compact" | "default";
    densitySwitch: (state: {
        library: LibraryEnum;
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
                style: TableStyleEnum;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => (trueValue: string, falseValue: string) => string;
    displayAsCard: (state: {
        library: LibraryEnum;
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
                style: TableStyleEnum;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
    displayAsList: (state: {
        library: LibraryEnum;
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
                style: TableStyleEnum;
            };
        };
    } & import('pinia').PiniaCustomStateProperties<SystemSetting>) => boolean;
}, {
    toDark(): void;
    toLight(): void;
    toSystem(): void;
    changeTableStyle(style: TableStyleEnum): void;
}>;
