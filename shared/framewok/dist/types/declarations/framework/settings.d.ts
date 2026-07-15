import { ThemeModeEnum } from '@herodotus/core';
import { LayoutModeEnum, LibraryEnum, TableStyleEnum } from '../enums';
export interface ThemeColor {
    primary: string;
}
export interface Theme {
    mode: ThemeModeEnum;
    dark: ThemeColor;
    light: ThemeColor;
}
export interface Effect {
    isUniqueOpened: boolean;
}
export interface TableDisplay {
    dense: boolean;
    style: TableStyleEnum;
}
export interface Display {
    isTabsView: boolean;
    isActivateLeftTab: boolean;
    showBreadcrumbs: boolean;
    showBreadcrumbsIcon: boolean;
    table: TableDisplay;
}
export interface SystemSetting {
    library: LibraryEnum;
    theme: Theme;
    layout: LayoutModeEnum;
    effect: Effect;
    display: Display;
}
