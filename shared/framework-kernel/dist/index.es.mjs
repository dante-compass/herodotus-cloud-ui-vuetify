import { useRoute } from "vue-router";
import { defineStore } from "pinia";
import { lodash, Base64, ContentTypeEnum, AuthorizationGrantTypeEnum as AuthorizationGrantTypeEnum$1, Service, SM2Utils, SM4Utils, moment } from "@herodotus-cloud/core";
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
var CaptchaCategoryEnum = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
  CaptchaCategoryEnum2["JIGSAW"] = "JIGSAW";
  CaptchaCategoryEnum2["WORD_CLICK"] = "WORD_CLICK";
  CaptchaCategoryEnum2["ARITHMETIC"] = "ARITHMETIC";
  CaptchaCategoryEnum2["CHINESE"] = "CHINESE";
  CaptchaCategoryEnum2["CHINESE_GIF"] = "CHINESE_GIF";
  CaptchaCategoryEnum2["SPEC_GIF"] = "SPEC_GIF";
  CaptchaCategoryEnum2["SPEC"] = "SPEC";
  CaptchaCategoryEnum2["HUTOOL_LINE"] = "HUTOOL_LINE";
  CaptchaCategoryEnum2["HUTOOL_CIRCLE"] = "HUTOOL_CIRCLE";
  CaptchaCategoryEnum2["HUTOOL_SHEAR"] = "HUTOOL_SHEAR";
  CaptchaCategoryEnum2["HUTOOL_GIF"] = "HUTOOL_GIF";
  return CaptchaCategoryEnum2;
})(CaptchaCategoryEnum || {});
var SocialSourceEnum = /* @__PURE__ */ ((SocialSourceEnum2) => {
  SocialSourceEnum2[SocialSourceEnum2["INSTITUTION"] = 0] = "INSTITUTION";
  SocialSourceEnum2[SocialSourceEnum2["SMS"] = 1] = "SMS";
  SocialSourceEnum2[SocialSourceEnum2["WXAPP"] = 2] = "WXAPP";
  SocialSourceEnum2[SocialSourceEnum2["QQ"] = 3] = "QQ";
  SocialSourceEnum2[SocialSourceEnum2["WEIBO"] = 4] = "WEIBO";
  SocialSourceEnum2[SocialSourceEnum2["BAIDU"] = 5] = "BAIDU";
  SocialSourceEnum2[SocialSourceEnum2["WECHAT_OPEN"] = 6] = "WECHAT_OPEN";
  SocialSourceEnum2[SocialSourceEnum2["WECHAT_MP"] = 7] = "WECHAT_MP";
  SocialSourceEnum2[SocialSourceEnum2["WECHAT_ENTERPRISE"] = 8] = "WECHAT_ENTERPRISE";
  SocialSourceEnum2[SocialSourceEnum2["WECHAT_ENTERPRISE_WEB"] = 9] = "WECHAT_ENTERPRISE_WEB";
  SocialSourceEnum2[SocialSourceEnum2["DINGTALK"] = 10] = "DINGTALK";
  SocialSourceEnum2[SocialSourceEnum2["DINGTALK_ACCOUNT"] = 11] = "DINGTALK_ACCOUNT";
  SocialSourceEnum2[SocialSourceEnum2["ALIYUN"] = 12] = "ALIYUN";
  SocialSourceEnum2[SocialSourceEnum2["TAOBAO"] = 13] = "TAOBAO";
  SocialSourceEnum2[SocialSourceEnum2["ALIPAY"] = 14] = "ALIPAY";
  SocialSourceEnum2[SocialSourceEnum2["TEAMBITION"] = 15] = "TEAMBITION";
  SocialSourceEnum2[SocialSourceEnum2["HUAWEI_V2"] = 16] = "HUAWEI_V2";
  SocialSourceEnum2[SocialSourceEnum2["FEISHU"] = 17] = "FEISHU";
  SocialSourceEnum2[SocialSourceEnum2["JD"] = 18] = "JD";
  SocialSourceEnum2[SocialSourceEnum2["DOUYIN"] = 19] = "DOUYIN";
  SocialSourceEnum2[SocialSourceEnum2["TOUTIAO"] = 20] = "TOUTIAO";
  SocialSourceEnum2[SocialSourceEnum2["MI"] = 21] = "MI";
  SocialSourceEnum2[SocialSourceEnum2["RENREN"] = 22] = "RENREN";
  SocialSourceEnum2[SocialSourceEnum2["MEITUAN"] = 23] = "MEITUAN";
  SocialSourceEnum2[SocialSourceEnum2["ELEME"] = 24] = "ELEME";
  SocialSourceEnum2[SocialSourceEnum2["KUJIALE"] = 25] = "KUJIALE";
  SocialSourceEnum2[SocialSourceEnum2["XMLY"] = 26] = "XMLY";
  SocialSourceEnum2[SocialSourceEnum2["GITEE"] = 27] = "GITEE";
  SocialSourceEnum2[SocialSourceEnum2["OSCHINA"] = 28] = "OSCHINA";
  SocialSourceEnum2[SocialSourceEnum2["CSDN"] = 29] = "CSDN";
  SocialSourceEnum2[SocialSourceEnum2["GITHUB"] = 30] = "GITHUB";
  SocialSourceEnum2[SocialSourceEnum2["GITLAB"] = 31] = "GITLAB";
  SocialSourceEnum2[SocialSourceEnum2["STACK_OVERFLOW"] = 32] = "STACK_OVERFLOW";
  SocialSourceEnum2[SocialSourceEnum2["CODING"] = 33] = "CODING";
  SocialSourceEnum2[SocialSourceEnum2["GOOGLE"] = 34] = "GOOGLE";
  SocialSourceEnum2[SocialSourceEnum2["MICROSOFT"] = 35] = "MICROSOFT";
  SocialSourceEnum2[SocialSourceEnum2["FACEBOOK"] = 36] = "FACEBOOK";
  SocialSourceEnum2[SocialSourceEnum2["LINKEDIN"] = 37] = "LINKEDIN";
  SocialSourceEnum2[SocialSourceEnum2["TWITTER"] = 38] = "TWITTER";
  SocialSourceEnum2[SocialSourceEnum2["AMAZON"] = 39] = "AMAZON";
  SocialSourceEnum2[SocialSourceEnum2["SLACK"] = 40] = "SLACK";
  SocialSourceEnum2[SocialSourceEnum2["LINE"] = 41] = "LINE";
  SocialSourceEnum2[SocialSourceEnum2["OKTA"] = 42] = "OKTA";
  SocialSourceEnum2[SocialSourceEnum2["PINTEREST"] = 43] = "PINTEREST";
  return SocialSourceEnum2;
})(SocialSourceEnum || {});
var AuthorizationGrantTypeEnum = /* @__PURE__ */ ((AuthorizationGrantTypeEnum2) => {
  AuthorizationGrantTypeEnum2["AUTHORIZATION_CODE"] = "authorization_code";
  AuthorizationGrantTypeEnum2["REFRESH_TOKEN"] = "refresh_token";
  AuthorizationGrantTypeEnum2["CLIENT_CREDENTIALS"] = "client_credentials";
  AuthorizationGrantTypeEnum2["PASSWORD"] = "password";
  AuthorizationGrantTypeEnum2["SOCIAL_CREDENTIALS"] = "social_credentials";
  AuthorizationGrantTypeEnum2["WEBAUTHN_CREDENTIALS"] = "webauthn_credentials";
  AuthorizationGrantTypeEnum2["DEVICE_CODE"] = "urn:ietf:params:oauth:grant-type:device_code";
  AuthorizationGrantTypeEnum2["JWT_BEARER"] = "urn:ietf:params:oauth:grant-type:jwt-bearer";
  AuthorizationGrantTypeEnum2["TOKEN_EXCHANGE"] = "urn:ietf:params:oauth:grant-type:token-exchange";
  return AuthorizationGrantTypeEnum2;
})(AuthorizationGrantTypeEnum || {});
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
  static securityKey() {
    return this.getInstance().getOptions().securityKey;
  }
  static axiosConfig() {
    return this.getInstance().getOptions().config;
  }
  static isUseCrypto() {
    return this.getInstance().getOptions().isUseCrypto;
  }
  static isAutoRefreshToken() {
    return this.getInstance().getOptions().isAutoRefreshToken;
  }
  static getRedirectUri() {
    return this.getInstance().getOptions().redirectUri;
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
class InvalidTokenError extends Error {
}
InvalidTokenError.prototype.name = "InvalidTokenError";
function b64DecodeUnicode(str) {
  return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
    let code = p.charCodeAt(0).toString(16).toUpperCase();
    if (code.length < 2) {
      code = "0" + code;
    }
    return "%" + code;
  }));
}
function base64UrlDecode(str) {
  let output = str.replace(/-/g, "+").replace(/_/g, "/");
  switch (output.length % 4) {
    case 0:
      break;
    case 2:
      output += "==";
      break;
    case 3:
      output += "=";
      break;
    default:
      throw new Error("base64 string is not of the correct length");
  }
  try {
    return b64DecodeUnicode(output);
  } catch (err) {
    return atob(output);
  }
}
function jwtDecode(token, options) {
  if (typeof token !== "string") {
    throw new InvalidTokenError("Invalid token specified: must be a string");
  }
  options || (options = {});
  const pos = options.header === true ? 0 : 1;
  const part = token.split(".")[pos];
  if (typeof part !== "string") {
    throw new InvalidTokenError(`Invalid token specified: missing part #${pos + 1}`);
  }
  let decoded;
  try {
    decoded = base64UrlDecode(part);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid base64 for part #${pos + 1} (${e.message})`);
  }
  try {
    return JSON.parse(decoded);
  } catch (e) {
    throw new InvalidTokenError(`Invalid token specified: invalid json for part #${pos + 1} (${e.message})`);
  }
}
class OAuth2ApiService {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = false;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (OAuth2ApiService._initialized) {
      throw new Error("OAuth2ApiService has already been initialized");
    }
    OAuth2ApiService._instance = new OAuth2ApiService(config);
    OAuth2ApiService._initialized = true;
    return OAuth2ApiService._instance;
  }
  getOAuth2TokenAddress() {
    return this.config.getUaa() + "/oauth2/token";
  }
  getOAuth2RevokeAddress() {
    return this.config.getUaa() + "/oauth2/revoke";
  }
  getOAuth2SignOutAddress() {
    return this.config.getUaa() + "/oauth2/sign-out";
  }
  getBasicHeader() {
    return "Basic " + Base64.encode(this.config.getClientId() + ":" + this.config.getClientSecret());
  }
  signOut(token) {
    return this.config.getHttp().put(
      this.getOAuth2SignOutAddress(),
      {
        accessToken: token
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  revoke(token) {
    return this.config.getHttp().post(
      this.getOAuth2RevokeAddress(),
      {
        token
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  refreshTokenFlow(refreshToken, oidc = false) {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc ? {
        refresh_token: refreshToken,
        grant_type: AuthorizationGrantTypeEnum$1.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum$1.REFRESH_TOKEN },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  passwordFlow(username, password, oidc = false) {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc ? {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum$1.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum$1.PASSWORD
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  authorizationCodeFlow(code, redirect_uri, state = "", oidc = false) {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc ? {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum$1.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum$1.AUTHORIZATION_CODE
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  socialCredentialsFlowBySms(mobile, code, oidc = false) {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc ? {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum$1.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum$1.SOCIAL_CREDENTIALS,
        source: "SMS"
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  socialCredentialsFlowByJustAuth(source, accessPrincipal, oidc = false) {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      oidc ? {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum$1.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum$1.SOCIAL_CREDENTIALS,
        source
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
  webAuthnCredentialsFlow(publicKey, oidc = false) {
    return this.config.getHttp().postWithParams(
      this.getOAuth2TokenAddress(),
      oidc ? { grant_type: AuthorizationGrantTypeEnum$1.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum$1.WEBAUTHN_CREDENTIALS },
      { ...publicKey },
      {
        contentType: ContentTypeEnum.JSON
      },
      {
        headers: {
          Authorization: this.getBasicHeader()
        }
      }
    );
  }
}
class OpenApiService {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = false;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (OpenApiService._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    OpenApiService._instance = new OpenApiService(config);
    OpenApiService._initialized = true;
    return OpenApiService._instance;
  }
  createSession(sessionId = "") {
    const SECURE_SESSION = this.config.getUaa() + "/open/identity/session";
    return this.config.getHttp().post(SECURE_SESSION, {
      clientId: this.config.getClientId(),
      clientSecret: this.config.getClientSecret(),
      sessionId
    });
  }
  exchange(sessionId = "", publicKey) {
    const SECURE_EXCHANGE = this.config.getUaa() + "/open/identity/exchange";
    return this.config.getHttp().post(SECURE_EXCHANGE, {
      publicKey,
      sessionId
    });
  }
  getPrompt(username) {
    const SECURE_PROMPT = this.config.getUaa() + "/open/identity/prompt";
    return this.config.getHttp().post(SECURE_PROMPT, {
      username
    });
  }
  createCaptcha(sessionId, type) {
    const SECURE_CAPTCHA = this.config.getUaa() + "/open/captcha";
    return this.config.getHttp().get(SECURE_CAPTCHA, {
      identity: sessionId,
      category: type
    });
  }
  verifyCaptcha(identity, category, data) {
    const SECURE_CAPTCHA = this.config.getUaa() + "/open/captcha";
    const verify = {
      identity,
      category,
      coordinate: { x: 0, y: 0 },
      coordinates: [],
      characters: ""
    };
    if (category === CaptchaCategoryEnum.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum.JIGSAW) {
      verify.coordinate = data;
    } else {
      verify.characters = data;
    }
    return this.config.getHttp().post(SECURE_CAPTCHA, verify);
  }
  createVerificationCode(mobile) {
    const SECURE_VERIFICATION_CODE = this.config.getUpms() + "/open/identity/verification-code";
    return this.config.getHttp().post(
      SECURE_VERIFICATION_CODE,
      {
        mobile
      },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  getSocialList() {
    const SECURE_SOCIAL_LIST = this.config.getUpms() + "/open/identity/sources";
    return this.config.getHttp().get(SECURE_SOCIAL_LIST);
  }
}
class PasskeyApiService extends Service {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = false;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (PasskeyApiService._initialized) {
      throw new Error("PasskeyApiService has already been initialized");
    }
    PasskeyApiService._instance = new PasskeyApiService(config);
    PasskeyApiService._initialized = true;
    return PasskeyApiService._instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/webauthn/register";
  }
  getWebAuthnRegisterOptionsAddress() {
    return this.getBaseAddress() + "/options";
  }
  getWebAuthnAuthenticateAddress() {
    return this.getConfig().getUaa() + "/login/webauthn";
  }
  getWebAuthnAuthenticateOptionsAddress() {
    return this.getConfig().getUaa() + "/webauthn/authenticate/options";
  }
  getIdPath(id) {
    return this.getParamPath(this.getBaseAddress(), id);
  }
  fetchWebAuthnRegisterOptions() {
    return this.getConfig().getHttp().post(this.getWebAuthnRegisterOptionsAddress(), "");
  }
  webAuthnRegister(request) {
    return this.getConfig().getHttp().post(this.getBaseAddress(), request);
  }
  fetchWebAuthnAuthenticateOptions() {
    return this.getConfig().getHttp().post(this.getWebAuthnAuthenticateOptionsAddress(), "");
  }
  webAuthnAuthenticate(request) {
    return this.getConfig().getHttp().post(this.getWebAuthnAuthenticateAddress(), request);
  }
  delete(id) {
    return this.getConfig().getHttp().delete(this.getIdPath(id));
  }
}
class SecurityApiResources {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = false;
  config = {};
  // 私有构造函数防止外部实例化
  constructor(config) {
    this.config = config;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param {KernelOptions} config 配置选项
   * @returns {SecurityApiResources} 单例实例
   */
  static initialize(config) {
    if (SecurityApiResources._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources._instance = new SecurityApiResources(config);
    SecurityApiResources._initialized = true;
    return SecurityApiResources._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService.getInstance(this.config);
  }
}
const useCryptoStore = defineStore("Crypto", {
  state: () => ({
    sessionId: "",
    key: "",
    state: ""
  }),
  actions: {
    setSessionId(sessionId) {
      this.sessionId = sessionId;
    },
    setKey(key) {
      this.key = SM4Utils.encrypt(key, OptionsUtilities.securityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities.securityKey());
    },
    encrypt(content) {
      const key = this.getKey();
      return SM4Utils.encrypt(content, key);
    },
    decrypt(content) {
      const key = this.getKey();
      return SM4Utils.decrypt(content, key);
    },
    exchange(identity = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
              const confidential = response2.data;
              const key = SM2Utils.decrypt(confidential, pair.privateKey);
              this.setSessionId(sessionId);
              this.setKey(key);
              resolve(key);
            });
          }
        }).catch((error) => {
          reject(error);
        });
      });
    }
  },
  persist: {
    storage: sessionStorage
  }
});
const useAuthenticationStore = defineStore("Authentication", {
  state: () => ({
    access_token: "",
    expires_in: 0,
    refresh_token: "",
    license: "",
    openid: "",
    idToken: "",
    scope: "",
    token_type: "",
    errorTimes: 0,
    remainTimes: 0,
    locked: false,
    userId: "",
    username: "",
    employeeId: "",
    avatar: "",
    roles: []
  }),
  getters: {
    isNotExpired: (state) => {
      const expires = moment().add(state.expires_in, "seconds").valueOf();
      const flag = moment(expires).add(1, "seconds").diff(moment(), "seconds");
      return flag !== 0;
    },
    token() {
      if (OptionsUtilities.isAutoRefreshToken()) {
        return this.access_token;
      } else {
        if (this.isNotExpired) {
          return this.access_token;
        } else {
          return "";
        }
      }
    }
  },
  actions: {
    getBearerToken() {
      return "Bearer " + this.token;
    },
    getAuthorizationHeader() {
      return { Authorization: this.getBearerToken(), "X-Herodotus-Open-Id": this.userId };
    },
    setTokenInfo(data) {
      this.access_token = data.access_token;
      this.expires_in = data.expires_in;
      this.refresh_token = data.refresh_token;
      this.license = data.license;
      this.scope = data.scope;
      this.token_type = data.token_type;
      if (data.id_token) {
        this.idToken = data.id_token;
        const jwt = jwtDecode(this.idToken);
        this.userId = jwt.openid;
        this.username = jwt.sub;
        this.avatar = jwt.avatar;
        this.employeeId = jwt.employeeId;
        this.roles = jwt.roles;
      } else if (data.openid) {
        const crypto = useCryptoStore();
        this.openid = data.openid;
        const openid = crypto.decrypt(this.openid);
        const details = JSON.parse(openid);
        this.userId = details.userId;
        this.username = details.username;
        this.roles = details.roles;
        this.avatar = details.avatar;
        this.employeeId = details.employeeId;
      } else {
        console.error("Cannot fetch the use info from backend.");
      }
    },
    setUserErrorStatus(data) {
      this.remainTimes = data.remainTimes;
      this.errorTimes = data.errorTimes;
      this.locked = data.locked;
    },
    /**
     * 判断是否是以非弹窗的形式显示的信息。
     *
     * 主要在登录页面中，将 Dialog 弹出形式的错误信息，转换为显示在输入框上部的错误信息，
     * @param error
     * @returns
     */
    isAlertMessage(error) {
      return error.code && [40106, 40111].includes(error.code);
    },
    setErrorPrompt(error, principal) {
      if (this.isAlertMessage(error)) {
        SecurityApiResources.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore();
      if (OptionsUtilities.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities.isUseCrypto()).then((response) => {
          if (response) {
            const data = response;
            this.setTokenInfo(data);
          }
          if (this.access_token) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((error) => {
          this.setErrorPrompt(error, username);
          reject(error);
        });
      });
    },
    refreshToken() {
      return new Promise((resolve, reject) => {
        SecurityApiResources.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities.isUseCrypto()).then((response) => {
          if (response) {
            const data = response;
            this.setTokenInfo(data);
          }
          if (this.access_token) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((error) => {
          reject(error);
        });
      });
    },
    signOut() {
      if (this.access_token) {
        SecurityApiResources.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities.getRedirectUri(),
          state,
          OptionsUtilities.isUseCrypto()
        ).then((response) => {
          if (response) {
            const data = response;
            this.setTokenInfo(data);
          }
          if (this.access_token) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((error) => {
          reject(error);
        });
      });
    },
    smsSignIn(mobile, code) {
      const crypto = useCryptoStore();
      if (OptionsUtilities.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities.isUseCrypto()).then((response) => {
          if (response) {
            const data = response;
            this.setTokenInfo(data);
          }
          if (this.access_token) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((error) => {
          this.setErrorPrompt(error, mobile);
          reject(error);
        });
      });
    },
    socialSignIn(source, accessPrincipal) {
      return new Promise((resolve, reject) => {
        SecurityApiResources.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities.isUseCrypto()).then((response) => {
          if (response) {
            const data = response;
            this.setTokenInfo(data);
          }
          if (this.access_token) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((error) => {
          if (error.code && [40106, 40111].includes(error.code)) reject(error);
        });
      });
    },
    passkey(publicKey) {
      return new Promise((resolve, reject) => {
        SecurityApiResources.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities.isUseCrypto()).then((response) => {
          if (response) {
            const data = response;
            this.setTokenInfo(data);
          }
          if (this.access_token) {
            resolve(true);
          } else {
            resolve(false);
          }
        }).catch((error) => {
          if (error.code && [40106, 40111].includes(error.code)) reject(error);
        });
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
  SecurityApiResources.initialize(options.config);
};
export {
  AuthorizationGrantTypeEnum,
  CaptchaCategoryEnum,
  LayoutModeEnum,
  OptionsUtilities,
  RouterUtilities,
  SecurityApiResources,
  SocialSourceEnum,
  ThemeModeEnum,
  initializer,
  useAuthenticationStore,
  useCryptoStore,
  useEditFinish,
  useRouterStore,
  useSettingsStore,
  useSystemTheme,
  useTabsViewStore
};
