import { RouteRecordRaw } from 'vue-router';
import { MenuItem } from '../../declarations';
export default function useSystemMenu(): {
    getMenuItems: () => Array<MenuItem>;
    hasPermission: (item: RouteRecordRaw) => boolean;
    getTitle: (item: RouteRecordRaw) => string;
    getIcon: (item: RouteRecordRaw) => string;
    getChildren: (item: RouteRecordRaw) => Array<RouteRecordRaw>;
    isDisplayedItem: (item: RouteRecordRaw) => boolean;
};
