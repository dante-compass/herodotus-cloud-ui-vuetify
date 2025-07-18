import { Toolkit } from "@herodotus-cloud/core";
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
   * @returns {SingletonService} 单例实例
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
      throw new Error("Singleton not initialized. Call initialize() first.");
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
    return !Toolkit.isEmpty(this.router);
  }
  hasParameter(route) {
    return !Toolkit.isEmpty(route.params) || !Toolkit.isEmpty(route.query);
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
    const array = Toolkit.split(path, "/");
    const result = Toolkit.dropRight(array, 1);
    return Toolkit.join(result, "/");
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
const initializer = (options) => {
  RouterUtilities.initialize(options.router);
};
export {
  RouterUtilities,
  initializer
};
