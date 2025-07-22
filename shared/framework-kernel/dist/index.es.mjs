import { lodash } from "@herodotus-cloud/core";
import { defineStore } from "pinia";
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
const initializer = (options) => {
  OptionsUtilities.initialize(options);
  RouterUtilities.initialize(options.router);
};
export {
  OptionsUtilities,
  RouterUtilities,
  initializer,
  useRouterStore
};
