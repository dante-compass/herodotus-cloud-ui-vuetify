import { useRoute } from "vue-router";
import { defineStore } from "pinia";
import { lodash } from "@herodotus-cloud/core";
import { nextTick, shallowRef, watch, computed } from "vue";
import "pinia-plugin-persistedstate";
var LayoutModeEnum = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum || {});
var ThemeModeEnum = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum || {});
const useSettingsStore = defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum.DEFAULT,
    /**
     * 界面效果
     */
    effect: {
      // 是否开启菜单手风琴效果
      isUniqueOpened: false
    },
    display: {
      // 是否开启 TabsView
      isTabsView: true,
      // 关闭标签页，激活左侧标签页
      isActivateLeftTab: true,
      // 显示面包屑
      showBreadcrumbs: true,
      // 显示面包屑图标
      showBreadcrumbsIcon: true,
      table: {
        dense: false
      }
    }
  }),
  getters: {
    isDark: (state) => state.theme.mode === ThemeModeEnum.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum.CLASSIC
  }
});
const useRouterStore = defineStore("Router", {
  state: () => ({
    routes: [],
    cachedRoutes: [],
    details: /* @__PURE__ */ new Map(),
    isRemote: true,
    pushParams: {}
  }),
  getters: {
    isDynamicRouteAdded() {
      return !lodash.isEmpty(this.routes);
    }
  },
  actions: {
    /**
     * 查询三级路由组件
     * @param key 三级路由组件名称
     * @returns 组件名称
     */
    getDetailComponent(key) {
      return this.details.get(key);
    },
    /**
     * 获取 Vue Router Push 类型参数
     * @param key 组件名称
     * @returns Push 类型参数
     */
    getRoutePushParam(key) {
      return this.pushParams[key];
    },
    /**
     * 添加动态路由
     * @param routes 路由列表
     */
    addDynamicRoutes(routes) {
      this.routes = routes;
    },
    /**
     * 将路由添加至缓存
     * @param route 路由
     */
    addCachedRoute(route) {
      if (!route.meta?.isNotKeepAlive) {
        const name = route.name;
        if (!this.cachedRoutes.includes(name)) {
          this.cachedRoutes.push(name);
        }
      }
    },
    /**
     * 添加三级路由
     * @param item 路由条目
     */
    addDetailRoutes(item) {
      const children = item.children || [];
      if (!lodash.isEmpty(children)) {
        children.forEach((child) => {
          const componentName = child.name;
          if (componentName) {
            this.details.set(componentName, child.component);
          }
        });
      }
    },
    /**
     * 判断路由中是否包含 Push 路由
     * @param route 路由
     * @returns true 包含参数，false 不包含参数
     */
    hasParameter(route) {
      const name = route.name;
      if (name && lodash.has(this.pushParams, name)) {
        return true;
      }
      return false;
    },
    /**
     * 判断是否为三级路由
     * @param route 路由
     * @returns true 是三级路由，false 不是三级路由
     */
    isDetailRoute(route) {
      if (route.meta) {
        if (route.meta.isDetailContent) {
          return true;
        }
      }
      return false;
    },
    /**
     * 判断当前是否为有效的三级路由
     * @param route 路由
     * @returns true 是三级路由，false 不是三级路由
     */
    isValidDetailRoute(route) {
      return this.isDetailRoute(route) && this.hasParameter(route);
    },
    /**
     * 向当前缓存添加 Push 参数
     * @param name 参数名称
     * @param params 参数值
     */
    addRoutePushParam(name, params = {}) {
      if (name) {
        this.pushParams[name] = params;
      }
    },
    /**
     * 从当前缓存中删除 Push 参数
     * @param name 参数名称
     */
    removeRoutePushParam(name) {
      if (name) {
        delete this.pushParams[name];
      }
    }
  }
});
class OptionsUtilities {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = false;
  options;
  // 私有构造函数防止外部实例化
  constructor(options) {
    this.options = options;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param {KernelOptions} options 配置选项
   * @returns {OptionsUtilities} 单例实例
   */
  static initialize(options) {
    if (OptionsUtilities._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities._instance = new OptionsUtilities(options);
    OptionsUtilities._initialized = true;
    return OptionsUtilities._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities._instance;
  }
  setOptions(options) {
    this.options = options;
  }
  getOptions() {
    return this.options;
  }
}
class RouterUtilities {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = false;
  options;
  router = {};
  // 私有构造函数防止外部实例化
  constructor(options) {
    this.options = options;
    this.router = options.instance;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param {RouterOptions} options 配置选项
   * @returns {RouterUtilities} 单例实例
   */
  static initialize(options) {
    if (RouterUtilities._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities._instance = new RouterUtilities(options);
    RouterUtilities._initialized = true;
    return RouterUtilities._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities._instance;
  }
  setRouter(router) {
    this.router = router;
  }
  getRouter() {
    return this.router;
  }
  isRouterExist() {
    return !lodash.isEmpty(this.router);
  }
  hasParameter(route) {
    return !lodash.isEmpty(route.params) || !lodash.isEmpty(route.query);
  }
  /**
   * 判断是否为三级路由页面
   * @param route 当前路由 {@link RouteLocationNormalizedLoaded}
   * @returns true 是三级路由，false 不是三级路由
   */
  isDetailRoute(route) {
    if (route.meta) {
      if (route.meta.isDetailContent) {
        return true;
      }
    }
    return false;
  }
  isValidDetailRoute(route) {
    return this.isDetailRoute(route) && this.hasParameter(route);
  }
  push(to) {
    return this.router.push(to);
  }
  replace(to) {
    return this.router.replace(to);
  }
  /**
   * 路由跳转
   * @param to - 需要跳转的路由
   * @param isNewTab - 是否在新的浏览器Tab标签打开
   */
  to(to, isPush = false) {
    if (isPush) {
      this.push(to);
    } else {
      this.replace(to);
    }
  }
  /**
   * 打开新页面
   * @param to 需要跳转的路由
   */
  open(to) {
    const route = this.router.resolve(to);
    window.open(route.href, "_blank");
  }
  /**
   * 返回上一级路由
   *
   */
  goBack() {
    this.router.go(-1);
  }
  refresh() {
    if (this.isRouterExist()) {
      this.router.go(0);
    } else {
      window.location.reload();
    }
  }
  toRoot() {
    if (this.isRouterExist()) {
      this.to(this.options.path.root);
    }
  }
  /**
   * 跳转首页
   */
  toHome() {
    if (this.isRouterExist()) {
      this.to(this.options.path.home);
    }
  }
  toSignIn() {
    if (this.isRouterExist()) {
      this.to(this.options.path.signIn);
    } else {
      this.refresh();
    }
  }
  getParent(path) {
    const array = lodash.split(path, "/");
    const result = lodash.dropRight(array);
    return lodash.join(result, "/");
  }
  toPrev(route) {
    if (route.path) {
      const destination = this.getParent(route.path);
      this.to({ path: destination });
    } else {
      this.goBack();
    }
  }
}
const useTabsViewStore = defineStore("TabsView", {
  state: () => ({
    tabs: [],
    activatedTab: {},
    activatedTabName: ""
  }),
  getters: {
    isNotLastTab: (state) => {
      return (index) => state.tabs.length - 1 !== index;
    },
    getLastTabIndex: (state) => {
      return state.tabs.length - 1;
    },
    getTabIndex: (state) => {
      return (tab) => lodash.findIndex(state.tabs, (item) => item.name === tab.name);
    },
    getActivatedTabIndex() {
      return this.getTabIndex(this.activatedTab);
    },
    /**
     * 最后一个Tab是否为激活状态
     */
    isLastTabActivated() {
      const activatedTabIndex = this.getActivatedTabIndex;
      return activatedTabIndex === this.getLastTabIndex;
    },
    isFirstTabActivated() {
      const activatedTabIndex = this.getActivatedTabIndex;
      return activatedTabIndex === 0;
    },
    disableCloseCurrentTab() {
      return this.isLastTabActivated || this.isFirstTabActivated;
    },
    disableCloseLeftTabs() {
      return this.isFirstTabActivated;
    },
    disableCloseRightTabs() {
      return this.isLastTabActivated;
    },
    disableRefreshCurrentTab() {
      if (this.activatedTab.meta) {
        if (this.activatedTab.meta.isDetailContent) {
          return true;
        }
      }
      return false;
    }
  },
  actions: {
    convertRouteToTab(route) {
      return {
        name: route.name,
        path: route.path,
        meta: route.meta
      };
    },
    setActivatedTab(tab) {
      nextTick(() => {
        this.activatedTab = tab;
        this.activatedTabName = tab.name;
      });
    },
    isNotExistInStaticRoute(tab) {
      return lodash.findIndex(
        OptionsUtilities.getInstance().getOptions().staticRoutes,
        (item) => item.path === tab.path
      ) === -1;
    },
    isTabNotOpened(tab) {
      return this.getTabIndex(tab) === -1;
    },
    openTab(tab, isDetail = false) {
      if (this.isNotExistInStaticRoute(tab)) {
        if (this.isTabNotOpened(tab)) {
          if (isDetail) {
            if (this.isLastTabActivated) {
              this.tabs.splice(this.getActivatedTabIndex, 0, tab);
            } else {
              this.tabs.splice(this.getActivatedTabIndex + 1, 0, tab);
            }
          } else {
            this.tabs.push(tab);
          }
        }
        this.setActivatedTab(tab);
      }
    },
    closeTab(tab) {
      lodash.remove(this.tabs, (item) => {
        return item.name === tab.name;
      });
    },
    smartTab(route) {
      const store = useRouterStore();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities.getInstance().goBack();
        }
      } else {
        this.openTab(tab, isDetailRoute);
      }
    },
    deleteTab(route) {
      const tab = this.convertRouteToTab(route);
      this.closeTab(tab);
    },
    closeCurrentTab() {
      this.closeTab(this.activatedTab);
    },
    closeOtherTabs() {
      lodash.remove(this.tabs, (item) => {
        return item.name !== this.activatedTab.name;
      });
    },
    closeLeftTabs() {
      const activatedTabIndex = this.getActivatedTabIndex;
      lodash.remove(this.tabs, (item, index) => {
        return index < activatedTabIndex;
      });
    },
    closeRightTabs() {
      const activatedTabIndex = this.getActivatedTabIndex;
      lodash.remove(this.tabs, (item, index) => {
        return index > activatedTabIndex;
      });
    }
  },
  persist: true
});
function useEditFinish() {
  const route = useRoute();
  const routeStore = useRouterStore();
  const tabs = useTabsViewStore();
  const onFinish = () => {
    const name = route.name;
    routeStore.removeRoutePushParam(name);
    tabs.deleteTab(route);
    RouterUtilities.getInstance().goBack();
  };
  return {
    onFinish
  };
}
function useSystemTheme() {
  let media;
  const settings = useSettingsStore();
  const systemTheme = shallowRef(ThemeModeEnum.DARK);
  const IN_BROWSER = typeof window !== "undefined";
  const getMatchMedia = () => {
    if (!IN_BROWSER) return;
    return window.matchMedia("(prefers-color-scheme: dark)");
  };
  const onThemeChange = () => {
    systemTheme.value = media.matches ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT;
  };
  watch(
    () => settings.theme.mode,
    (val) => {
      if (val === ThemeModeEnum.SYSTEM) {
        media = getMatchMedia();
        media.addEventListener("change", onThemeChange);
        onThemeChange();
      } else if (media) {
        media.removeEventListener("change", onThemeChange);
      }
    },
    { immediate: true }
  );
  const theme = computed(() => {
    return settings.isSystem ? systemTheme.value : settings.theme.mode;
  });
  return {
    theme
  };
}
const initializer = (options) => {
  OptionsUtilities.initialize(options);
  RouterUtilities.initialize(options.router);
};
export {
  LayoutModeEnum,
  OptionsUtilities,
  RouterUtilities,
  ThemeModeEnum,
  initializer,
  useEditFinish,
  useRouterStore,
  useSettingsStore,
  useSystemTheme,
  useTabsViewStore
};
