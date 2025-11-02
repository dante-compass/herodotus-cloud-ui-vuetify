import { useRoute } from "vue-router";
import { defineStore } from "pinia";
import { Swal, AuthorizationTokenEnum, ContentTypeEnum, AuthorizationGrantTypeEnum, BuildInScopeEnum, ClientAuthenticationMethodEnum, Service, SM2Utils, SM4Utils, DayJs, IN_BROWSER } from "@herodotus/core";
import { jwtDecode } from "jwt-decode";
import { extend, colord } from "colord";
import mixPlugin from "colord/plugins/mix";
import { isEmpty, split, dropRight, join, merge, endsWith, has, remove, findIndex, intersection } from "lodash-es";
import { nextTick, shallowRef, ref, getCurrentInstance as getCurrentInstance$1, inject, watch, watchEffect, computed } from "vue";
import { Base64 } from "js-base64";
import { parseCreationOptionsFromJSON, create, parseRequestOptionsFromJSON, get } from "@github/webauthn-json/browser-ponyfill";
import { default as default2 } from "pinia-plugin-persistedstate";
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
  SocialSourceEnum2["INSTITUTION"] = "INSTITUTION";
  SocialSourceEnum2["SMS"] = "SMS";
  SocialSourceEnum2["WXAPP"] = "WXAPP";
  SocialSourceEnum2["QQ"] = "QQ";
  SocialSourceEnum2["WEIBO"] = "WEIBO";
  SocialSourceEnum2["BAIDU"] = "BAIDU";
  SocialSourceEnum2["WECHAT_OPEN"] = "WECHAT_OPEN";
  SocialSourceEnum2["WECHAT_MP"] = "WECHAT_MP";
  SocialSourceEnum2["WECHAT_ENTERPRISE"] = "WECHAT_ENTERPRISE";
  SocialSourceEnum2["WECHAT_ENTERPRISE_WEB"] = "WECHAT_ENTERPRISE_WEB";
  SocialSourceEnum2["DINGTALK"] = "DINGTALK";
  SocialSourceEnum2["DINGTALK_ACCOUNT"] = "DINGTALK_ACCOUNT";
  SocialSourceEnum2["ALIYUN"] = "ALIYUN";
  SocialSourceEnum2["TAOBAO"] = "TAOBAO";
  SocialSourceEnum2["ALIPAY"] = "ALIPAY";
  SocialSourceEnum2["TEAMBITION"] = "TEAMBITION";
  SocialSourceEnum2["HUAWEI_V2"] = "HUAWEI_V2";
  SocialSourceEnum2["FEISHU"] = "FEISHU";
  SocialSourceEnum2["JD"] = "JD";
  SocialSourceEnum2["DOUYIN"] = "DOUYIN";
  SocialSourceEnum2["TOUTIAO"] = "TOUTIAO";
  SocialSourceEnum2["MI"] = "MI";
  SocialSourceEnum2["RENREN"] = "RENREN";
  SocialSourceEnum2["MEITUAN"] = "MEITUAN";
  SocialSourceEnum2["ELEME"] = "ELEME";
  SocialSourceEnum2["KUJIALE"] = "KUJIALE";
  SocialSourceEnum2["XMLY"] = "XMLY";
  SocialSourceEnum2["GITEE"] = "GITEE";
  SocialSourceEnum2["OSCHINA"] = "OSCHINA";
  SocialSourceEnum2["CSDN"] = "CSDN";
  SocialSourceEnum2["GITHUB"] = "GITHUB";
  SocialSourceEnum2["GITLAB"] = "GITLAB";
  SocialSourceEnum2["STACK_OVERFLOW"] = "STACK_OVERFLOW";
  SocialSourceEnum2["CODING"] = "CODING";
  SocialSourceEnum2["GOOGLE"] = "GOOGLE";
  SocialSourceEnum2["MICROSOFT"] = "MICROSOFT";
  SocialSourceEnum2["FACEBOOK"] = "FACEBOOK";
  SocialSourceEnum2["LINKEDIN"] = "LINKEDIN";
  SocialSourceEnum2["TWITTER"] = "TWITTER";
  SocialSourceEnum2["AMAZON"] = "AMAZON";
  SocialSourceEnum2["SLACK"] = "SLACK";
  SocialSourceEnum2["LINE"] = "LINE";
  SocialSourceEnum2["OKTA"] = "OKTA";
  SocialSourceEnum2["PINTEREST"] = "PINTEREST";
  return SocialSourceEnum2;
})(SocialSourceEnum || {});
const useApplicationStore = defineStore("Application", {
  state: () => ({
    // 左侧菜单面板显示控制
    leftDrawer: true,
    // 右侧设置面板显示控制
    rightDrawer: false,
    // 登录页面面板
    signInPanel: "account"
  }),
  actions: {
    switchToMobilePanel() {
      this.signInPanel = "mobile";
    },
    switchToScanPanel() {
      this.signInPanel = "scan";
    },
    switchToAccountPanel() {
      this.signInPanel = "account";
    }
  }
});
extend([mixPlugin]);
const hueStep = 2;
const saturationStep = 16;
const saturationStep2 = 5;
const brightnessStep1 = 5;
const brightnessStep2 = 15;
const lightColorCount = 5;
const darkColorCount = 4;
function getColorPalette(color, index) {
  if (index === 6) return color;
  const isLight = index < 6;
  const hsv = colord(color).toHsv();
  const i = isLight ? lightColorCount + 1 - index : index - lightColorCount - 1;
  const newHsv = {
    h: getHue(hsv, i, isLight),
    s: getSaturation(hsv, i, isLight),
    v: getValue(hsv, i, isLight)
  };
  return colord(newHsv).toHex();
}
function getAllColorPalette(color) {
  const indexs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return indexs.map((index) => getColorPalette(color, index));
}
function getHue(hsv, i, isLight) {
  let hue;
  if (hsv.h >= 60 && hsv.h <= 240) {
    hue = isLight ? hsv.h - hueStep * i : hsv.h + hueStep * i;
  } else {
    hue = isLight ? hsv.h + hueStep * i : hsv.h - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}
function getSaturation(hsv, i, isLight) {
  let saturation;
  if (isLight) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  if (saturation > 100) {
    saturation = 100;
  }
  if (isLight && i === lightColorCount && saturation > 10) {
    saturation = 10;
  }
  if (saturation < 6) {
    saturation = 6;
  }
  return saturation;
}
function getValue(hsv, i, isLight) {
  let value;
  if (isLight) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }
  if (value > 100) {
    value = 100;
  }
  return value;
}
function addColorAlpha(color, alpha) {
  return colord(color).alpha(alpha).toHex();
}
function mixColor(firstColor, secondColor, ratio) {
  return colord(firstColor).mix(secondColor, ratio).toHex();
}
function isWhiteColor(color) {
  return colord(color).isEqual("#ffffff");
}
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
  static axiosConfig() {
    return this.getInstance().getOptions().config;
  }
  static getRouterOptions() {
    return this.getInstance().getOptions().router;
  }
  static getRouter() {
    return this.getRouterOptions().instance;
  }
  static getRoutes() {
    return this.getInstance().getOptions().staticRoutes;
  }
  static getSecurityKey() {
    return this.getInstance().getOptions().variables.securityKey;
  }
  static getRedirectUri() {
    return this.getInstance().getOptions().variables.redirectUri;
  }
  static isUseCrypto() {
    return this.getInstance().getOptions().variables.isUseCrypto;
  }
  static isAutoRefreshToken() {
    return this.getInstance().getOptions().variables.isAutoRefreshToken;
  }
  static getTenantId() {
    return this.getInstance().getOptions().variables.tenantId;
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
    return !isEmpty(this.router);
  }
  hasParameter(route) {
    return !isEmpty(route.params) || !isEmpty(route.query);
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
    const array = split(path, "/");
    const result = dropRight(array);
    return join(result, "/");
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
class SignOutUtilities {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = false;
  extension;
  constructor(extension) {
    this.extension = extension;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param extension 扩展方法
   * @returns {OptionsUtilities} 单例实例
   */
  static initialize(extension) {
    if (SignOutUtilities._initialized) {
      throw new Error("SignOutUtilities has already been initialized");
    }
    SignOutUtilities._instance = new SignOutUtilities(extension);
    SignOutUtilities._initialized = true;
    return SignOutUtilities._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SignOutUtilities._instance) {
      throw new Error("SignOutUtilities not initialized. Call initialize() first.");
    }
    return SignOutUtilities._instance;
  }
  signOut(isLocal = false) {
    if (!isLocal) {
      const authentication = useAuthenticationStore();
      authentication.signOut();
    }
    this.extension();
    console.log("Clear Framework Kernel Data");
    useAuthenticationStore().$reset();
    useCryptoStore().$reset();
    RouterUtilities.getInstance().toSignIn();
  }
  signOutWithDialog() {
    Swal.fire({
      title: "要走了么?",
      text: "您确定要退出系统！",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "是的",
      cancelButtonText: "取消"
    }).then((result) => {
      if (result.value) {
        this.signOut();
      }
    });
  }
  tokenExpires(title, text, icon, isLocal = false) {
    Swal.fire({
      title,
      text,
      icon,
      showClass: {
        popup: "animate__animated animate__fadeInDown"
      },
      hideClass: {
        popup: "animate__animated animate__fadeOutUp"
      },
      confirmButtonText: "已阅!",
      willClose: () => {
        this.signOut(isLocal);
      }
    });
  }
}
class OAuth2ApiService {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService(config);
    }
    return this.instance;
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
  getOAuth2DeviceAuthorizationAddress() {
    return this.config.getUaa() + "/oauth2/device_authorization";
  }
  getOIDCConnectRegisterAddress() {
    return this.config.getUaa() + "/connect/register";
  }
  createBasicHeader(clientId = "", clientSecret = "") {
    let data = this.config.getClientId() + ":" + this.config.getClientSecret();
    if (clientId && clientSecret) {
      data = clientId + ":" + clientSecret;
    }
    return AuthorizationTokenEnum.BASIC + Base64.encode(data);
  }
  createClientData(clientId = "", clientSecret = "", scope = "") {
    const data = {
      client_id: "",
      client_secret: ""
    };
    if (clientId && clientSecret) {
      data.client_id = clientId;
      data.client_secret = clientSecret;
    } else {
      data.client_id = this.config.getClientId();
      data.client_secret = this.config.getClientSecret();
    }
    if (scope) {
      merge(data, { scope });
    }
    return data;
  }
  createOAuth2Data(grantType, params, oidc = false) {
    const data = {
      grant_type: grantType
    };
    if (!isEmpty(params)) {
      merge(data, params);
    }
    if (oidc) {
      merge(data, { scope: "openid" });
    }
    return data;
  }
  signOut(token, clientId = "", clientSecret = "") {
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
          Authorization: this.createBasicHeader(clientId, clientSecret)
        }
      }
    );
  }
  revoke(token, clientId = "", clientSecret = "") {
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
          Authorization: this.createBasicHeader(clientId, clientSecret)
        }
      }
    );
  }
  refreshTokenFlow(refreshToken, oidc = false, clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        { refresh_token: refreshToken },
        oidc
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret)
        }
      }
    );
  }
  passwordFlow(username, password, oidc = false, clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.PASSWORD,
        { username, password },
        oidc
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret)
        }
      }
    );
  }
  authorizationCodeRequestFlow(api, redirectUri, scope = "openid") {
    console.log("-------api---------", api);
    console.log("--------config--------", this.config);
    const param = `?response_type=code&client_id=${this.config.getClientId()}&client_secret=${this.config.getClientSecret()}&redirect_uri=${redirectUri}&scope=${scope}`;
    const project = this.config.getProject();
    let address = api;
    if (endsWith(address, "/")) {
      address = address.substring(0, address.length - 1);
    }
    if (project && (project === "dante" || project === "herodotus")) {
      address += this.config.getUaa(false);
    }
    return address + "/oauth2/authorize" + param;
  }
  /**
   * 授权码模式
   * @param code 授权码
   * @param redirect_uri 重定向地址
   * @param state 状态
   * @param oidc 是否开启 OIDC
   * @param clientId 客户端 ID
   * @param clientSecret 客户端密钥
   * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
   * @description 授权码模式是 OAuth 2.0 的核心授权流程，用户通过授权服务器获取授权码，然后使用该授权码获取访问令牌。
   * 这种模式适用于需要用户交互的场景，例如 Web 应用程序和移动应用程序。
   * 用户在授权服务器上登录并授权应用程序访问其资源，
   * 授权服务器返回授权码，应用程序使用该授权码向令牌端点请求访问令牌。
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.3
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.4
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.1.2
   * @see https
   */
  authorizationCodeFlow(code, redirect_uri, state = "", oidc = false, clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        { code, state, redirect_uri },
        oidc
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret)
        }
      }
    );
  }
  /**
   * 客户端凭据模式
   * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
   * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
   * @param scope 范围(optional)
   * @description 客户端凭据模式是 OAuth 2.0 的一种授权流程，允许客户端应用程序使用其自身的凭据（而不是用户的凭据）
   * 来获取访问令牌。这种模式适用于服务器到服务器的通信场景，例如微服务之间的通信或后台任务。
   * 客户端应用程序通过向令
   * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.2
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.3
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.1
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.4
   * @see https://datatracker.ietf.org/doc/html/rfc6749#section-4.4.5
   * @see https://datatracker.interface
   */
  clientCredentialsFlow(clientId = "", clientSecret = "", scope = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS, {
        ...this.createClientData(clientId, clientSecret, scope)
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  /**
   * 设备授权模式。获取访问令牌。
   * @param deviceCode 设备码
   * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
   * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
   * @param scope 范围 (optional)
   * @description 设备授权模式允许用户在一个设备上获取授权码，然后在另一个设备上使用该授权码获取访问令牌。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628
   * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
   */
  deviceCodeFlow(deviceCode, clientId = "", clientSecret = "", scope = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.DEVICE_CODE, {
        device_code: deviceCode,
        ...this.createClientData(clientId, clientSecret, scope)
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  /**
   * 设备授权流程。获取设备码和用户码。
   * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
   * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
   * @param scope 范围 (optional)
   * @returns Promise<AxiosHttpResult<DeviceAuthorizationResponse>> - 返回设备授权响应
   * @description 设备授权流程允许用户在一个设备上获取设备码，然后在另一个设备上使用该设备码进行授权。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628#section-3.1
   */
  deviceAuthorizationFlow(clientId = "", clientSecret = "", scope = BuildInScopeEnum.EMAIL) {
    return this.config.getHttp().post(
      this.getOAuth2DeviceAuthorizationAddress(),
      this.createClientData(clientId, clientSecret, scope),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  socialCredentialsFlowBySms(mobile, code, oidc = false, clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        { mobile, code, source: SocialSourceEnum.SMS },
        oidc
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret)
        }
      }
    );
  }
  socialCredentialsFlowByJustAuth(source, accessPrincipal, oidc = false, clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        { ...accessPrincipal, source },
        oidc
      ),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret)
        }
      }
    );
  }
  webAuthnCredentialsFlow(publicKey, oidc = false, clientId = "", clientSecret = "") {
    return this.config.getHttp().postWithParams(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, {}, oidc),
      { ...publicKey },
      {
        contentType: ContentTypeEnum.JSON
      },
      {
        headers: {
          Authorization: this.createBasicHeader(clientId, clientSecret)
        }
      }
    );
  }
  oidcClientRegistrationFlow(productKey, clientName) {
    return this.config.getHttp().post(this.getOIDCConnectRegisterAddress(), {
      product_key: productKey,
      grant_types: [
        AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS,
        AuthorizationGrantTypeEnum.DEVICE_CODE
      ],
      redirect_uris: ["http://192.168.101.10:3000"],
      client_name: clientName,
      // client_secret: '123456',
      scope: [BuildInScopeEnum.OPENID, BuildInScopeEnum.EMAIL, BuildInScopeEnum.PROFILE].join(" "),
      // 如果 response_types 包含 code 则会添加 authorization_code 授权模式
      // token 是 OAuth2.0 规范中隐式模式的值，但是在 OAuth2.1 中隐式模式被取消。目前临时使用一下
      // 可以考虑使用 id_token
      // "response_types": [
      //   "code",                // 允许：标准授权码流程
      //   "code id_token",       // 允许：OIDC 混合流程（仅返回 code + id_token）
      //   "id_token"             // 允许但不推荐：纯 OIDC 流程（无访问令牌）
      // ],
      response_types: ["token"],
      token_endpoint_auth_method: ClientAuthenticationMethodEnum.CLIENT_SECRET_POST
    });
  }
}
class OpenApiService {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService(config);
    }
    return this.instance;
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
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService(config);
    }
    return this.instance;
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities.getSecurityKey());
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
      const expires = DayJs().add(state.expires_in, "seconds").valueOf();
      const flag = DayJs(expires).add(1, "seconds").diff(DayJs(), "seconds");
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
      return AuthorizationTokenEnum.BEARER + this.token;
    },
    getAuthorizationHeader() {
      return { Authorization: this.getBearerToken(), "X-Herodotus-Open-Id": this.userId };
    },
    saveAccessToken(data) {
      this.access_token = data.access_token;
      this.expires_in = data.expires_in;
      this.refresh_token = data.refresh_token ? data.refresh_token : "";
      this.license = data.refresh_token ? data.refresh_token : "";
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
        console.warn("There is no id token or openid in the data.");
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
            this.saveAccessToken(data);
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
            this.saveAccessToken(data);
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
            this.saveAccessToken(data);
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
            this.saveAccessToken(data);
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
            this.saveAccessToken(data);
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
            this.saveAccessToken(data);
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
const getSystemHeaders = () => {
  const authentication = useAuthenticationStore();
  const crypto = useCryptoStore();
  const token = authentication.access_token;
  const sessionId = crypto.sessionId;
  const headers = {};
  if (token) {
    headers["Authorization"] = AuthorizationTokenEnum.BEARER + token;
  }
  if (sessionId) {
    headers["X-Herodotus-Session-Id"] = sessionId;
  }
  const tenantId = OptionsUtilities.getTenantId();
  if (tenantId) {
    headers["X-Herodotus-Tenant-Id"] = tenantId;
  }
  return headers;
};
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
      return !isEmpty(this.routes);
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
      if (!isEmpty(children)) {
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
      if (name && has(this.pushParams, name)) {
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
const useSettingsStore = defineStore("SystemSetting", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum.SYSTEM,
      // 默认 primary 主题颜色
      dark: {
        primary: "#2563eb"
      },
      light: {
        primary: "#6750A4"
      }
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
    isDarkenMode: (state) => state.theme.mode !== ThemeModeEnum.LIGHT,
    isLightenMode: (state) => state.theme.mode === ThemeModeEnum.LIGHT
  },
  actions: {
    toDark() {
      this.theme.mode = ThemeModeEnum.DARK;
    },
    toLight() {
      this.theme.mode = ThemeModeEnum.LIGHT;
    },
    toSystem() {
      this.theme.mode = ThemeModeEnum.SYSTEM;
    }
  },
  persist: true
});
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
      return (tab) => findIndex(state.tabs, (item) => item.name === tab.name);
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
      return findIndex(OptionsUtilities.getRoutes(), (item) => item.path === tab.path) === -1;
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
      remove(this.tabs, (item) => {
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
      remove(this.tabs, (item) => {
        return item.name !== this.activatedTab.name;
      });
    },
    closeLeftTabs() {
      const activatedTabIndex = this.getActivatedTabIndex;
      remove(this.tabs, (item, index) => {
        return index < activatedTabIndex;
      });
    },
    closeRightTabs() {
      const activatedTabIndex = this.getActivatedTabIndex;
      remove(this.tabs, (item, index) => {
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
function useDeviceAuthorize(deviceCode, clientId, clientSecret, scope = "") {
  const handler = shallowRef(0);
  const interval = shallowRef(5);
  const isSuccess = shallowRef(false);
  const isFailed = shallowRef(false);
  const successResponse = shallowRef({});
  const pullingResponse = ref([]);
  const message = (text, isSuccess2 = false) => {
    const id = pullingResponse.value.length + 1;
    if (!isSuccess2) {
      pullingResponse.value.push({ id, icon: "mdi-alert-circle", color: "error", text });
    } else {
      pullingResponse.value.push({ id, icon: "mdi-information", color: "green", text });
    }
  };
  const pulling = (status) => {
    if (status === "authorization_pending") {
      message("Authorization pending, continuing to poll...");
    } else if (status === "slow_down") {
      message("Slowing down...");
      slowDown();
    } else if (status === "token_expired") {
      message("Token expired, stopping...");
      clear();
      isFailed.value = true;
    } else if (status === "access_denied") {
      message("Access denied, stopping...");
      clear();
      isFailed.value = true;
    }
  };
  const process = () => {
    SecurityApiResources.getInstance().oauth2().deviceCodeFlow(deviceCode.value, clientId.value, clientSecret.value, scope).then((response) => {
      message("Authorization successful", true);
      clear();
      isSuccess.value = true;
      successResponse.value = response;
    }).catch((error) => {
      pulling(error.error);
    });
  };
  const schedule = () => {
    handler.value = window.setInterval(process, interval.value * 1e3);
  };
  const clear = () => {
    window.clearInterval(handler.value);
  };
  const slowDown = () => {
    interval.value += 5;
    clear();
    schedule();
  };
  return {
    pullingResponse,
    successResponse,
    isFailed,
    isSuccess,
    schedule,
    clear,
    slowDown
  };
}
function usePasskey() {
  const authenticationStore = useAuthenticationStore();
  const isSupported = async () => {
    if (window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable && PublicKeyCredential.isConditionalMediationAvailable) {
      const results = await Promise.all([
        PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
        PublicKeyCredential.isConditionalMediationAvailable()
      ]);
      if (results.every((r) => r === true)) {
        return true;
      }
    }
    return false;
  };
  const registration = (label) => {
    return new Promise((resolve, reject) => {
      SecurityApiResources.getInstance().passkey().fetchWebAuthnRegisterOptions().then((publicKey) => {
        const registrationOptions = parseCreationOptionsFromJSON({
          publicKey
        });
        create(registrationOptions).then((registration2) => {
          const credential = registration2.toJSON();
          const request = {
            publicKey: { label, credential }
          };
          SecurityApiResources.getInstance().passkey().webAuthnRegister(request).then(() => {
            resolve(true);
          });
        });
      }).catch(() => {
        reject(false);
      });
    });
  };
  const authenticator = () => {
    return new Promise((resolve, reject) => {
      SecurityApiResources.getInstance().passkey().fetchWebAuthnAuthenticateOptions().then((publicKey) => {
        const authenticationOptions = parseRequestOptionsFromJSON({
          publicKey
        });
        get(authenticationOptions).then((authentication) => {
          const request = authentication.toJSON();
          authenticationStore.passkey(request).then((result) => {
            resolve(result);
          });
        });
      }).catch(() => {
        reject(false);
      });
    });
  };
  return {
    isSupported,
    registration,
    authenticator
  };
}
function useSystemMenu() {
  const router = useRouterStore();
  const authentication = useAuthenticationStore();
  const getTitle = (item) => {
    return item.meta?.title;
  };
  const getIcon = (item) => {
    return item.meta?.icon;
  };
  const getChildren = (item) => {
    return item.children;
  };
  const hasChildren = (item) => {
    return !!getChildren(item);
  };
  const isHideAllChild = (item) => {
    return item.meta?.isHideAllChild;
  };
  const toLeaf = (item) => {
    return {
      title: getTitle(item),
      prependIcon: getIcon(item),
      to: item.path
    };
  };
  const isDisplayedItem = (item) => {
    if (!hasChildren(item)) {
      return true;
    } else {
      if (isHideAllChild(item)) {
        router.addDetailRoutes(item);
        return true;
      } else {
        return false;
      }
    }
  };
  const hasPermission = (item) => {
    const userRoles = authentication.roles;
    const routeRoles = item.meta?.roles;
    if (isEmpty(routeRoles)) {
      return true;
    }
    if (isEmpty(userRoles)) {
      return false;
    }
    const result = intersection(userRoles, routeRoles);
    if (isEmpty(result)) {
      return false;
    } else {
      return true;
    }
  };
  const convert = (routes) => {
    return routes.map((item) => {
      if (isDisplayedItem(item)) {
        return toLeaf(item);
      } else {
        return {
          title: getTitle(item),
          prependIcon: getIcon(item),
          children: convert(getChildren(item))
        };
      }
    });
  };
  const getMenuItems = () => {
    const routers = router.routes;
    return convert(routers);
  };
  return {
    getMenuItems,
    hasPermission,
    getTitle,
    getIcon,
    getChildren,
    isDisplayedItem
  };
}
function useSystemRoute(routeModules, vueModules, locate, getRoutesFromServer) {
  const convert = (data) => {
    const modules = vueModules;
    return data.map((item) => {
      const raw = {};
      raw.path = item.name;
      raw.component = modules[locate(item.componentPath)];
      if (item.componentName) {
        raw.name = item.componentName;
      }
      if (item.redirect) {
        raw.redirect = item.redirect;
      }
      raw.meta = {};
      raw.meta["icon"] = item.meta.icon;
      raw.meta["title"] = item.meta.title;
      if (item.meta.sort) {
        raw.meta["sort"] = item.meta.sort;
      }
      if (item.meta.isHaveChild) {
        raw.meta["isHaveChild"] = item.meta.isHaveChild;
      }
      if (item.meta.isNotKeepAlive) {
        raw.meta["isNotKeepAlive"] = item.meta.isNotKeepAlive;
      }
      if (item.meta.isHideAllChild) {
        raw.meta["isHideAllChild"] = item.meta.isHideAllChild;
      }
      if (item.meta.isDetailContent) {
        raw.meta["isDetailContent"] = item.meta.isDetailContent;
      }
      if (item.meta.isIgnoreAuth) {
        raw.meta["isIgnoreAuth"] = item.meta.isIgnoreAuth;
      }
      if (item.roles) {
        raw.meta["roles"] = item.roles;
      }
      if (!isEmpty(item.children)) {
        raw.children = convert(item.children);
      }
      return raw;
    });
  };
  const getRoutesFromLocal = () => {
    const routes = [];
    const modules = routeModules;
    Object.keys(modules).forEach((key) => {
      const item = modules[key];
      const module = item.default || {};
      const list = Array.isArray(module) ? [...module] : [module];
      routes.push(...list);
    });
    return routes;
  };
  const sorting = (a, b) => {
    const aValue = a.meta?.sort || 0;
    const bValue = b.meta?.sort || 0;
    return aValue - bValue;
  };
  const dynamicAddRoutes = (router, routes) => {
    routes.forEach((item) => {
      router.addRoute(item);
    });
    console.log("[Herodotus] |- Dynamic routes add success!");
  };
  const addRoutes = (router, routes) => {
    const store = useRouterStore();
    console.log("[Herodotus] |- Begin add dynamic routes");
    if (!isEmpty(routes)) {
      store.addDynamicRoutes(routes);
      dynamicAddRoutes(router, routes);
    } else {
      console.warn("[Herodotus] |- Dynamic routes is empty, skip!");
    }
  };
  const initBackEndRoutes = async (router) => {
    const response = await getRoutesFromServer();
    const routeData = response.data;
    const routes = convert(routeData);
    addRoutes(router, routes);
  };
  const initFrontEndRoutes = async (router) => {
    const routes = getRoutesFromLocal();
    const data = routes.sort(sorting);
    console.log(data);
    addRoutes(router, data);
  };
  return {
    initBackEndRoutes,
    initFrontEndRoutes
  };
}
function getCurrentInstance(name, message) {
  const vm = getCurrentInstance$1();
  if (!vm) {
    throw new Error(`[Vuetify] ${name} ${"must be called from inside a setup function"}`);
  }
  return vm;
}
const ThemeSymbol = Symbol.for("vuetify:theme");
function useTheme() {
  getCurrentInstance("useTheme");
  const theme = inject(ThemeSymbol, null);
  if (!theme) throw new Error("Could not find Vuetify theme injection");
  return theme;
}
function useSystemTheme() {
  const settings = useSettingsStore();
  const vuetifyTheme = useTheme();
  let media;
  const systemTheme = shallowRef(ThemeModeEnum.DARK);
  const getMatchMedia = () => {
    if (!IN_BROWSER) return;
    return window.matchMedia("(prefers-color-scheme: dark)");
  };
  const hasScrollbar = (el) => {
    if (!el || el.nodeType !== Node.ELEMENT_NODE) return false;
    const style = window.getComputedStyle(el);
    return style.overflowY === "scroll" || style.overflowY === "auto" && el.scrollHeight > el.clientHeight;
  };
  const themeTransition = () => {
    const x = performance.now();
    if (performance.now() - x > 10) return;
    const el = document.querySelector("[data-v-app]");
    const children = el.querySelectorAll("*");
    children.forEach((el2) => {
      if (hasScrollbar(el2)) {
        el2.dataset.scrollX = String(el2.scrollLeft);
        el2.dataset.scrollY = String(el2.scrollTop);
      }
    });
    const copy = el.cloneNode(true);
    copy.classList.add("app-copy");
    const rect = el.getBoundingClientRect();
    copy.style.top = rect.top + "px";
    copy.style.left = rect.left + "px";
    copy.style.width = rect.width + "px";
    copy.style.height = rect.height + "px";
    const targetEl = document.activeElement;
    const targetRect = targetEl.getBoundingClientRect();
    const left = targetRect.left + targetRect.width / 2 + window.scrollX;
    const top = targetRect.top + targetRect.height / 2 + window.scrollY;
    el.style.setProperty("--clip-pos", `${left}px ${top}px`);
    el.style.removeProperty("--clip-size");
    nextTick(() => {
      el.classList.add("app-transition");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.setProperty(
            "--clip-size",
            Math.hypot(window.innerWidth, window.innerHeight) + "px"
          );
        });
      });
    });
    document.body.append(copy);
    copy.querySelectorAll("[data-scroll-x], [data-scroll-y]").forEach(
      (el2) => {
        el2.scrollLeft = Number(el2.dataset.scrollX);
        el2.scrollTop = Number(el2.dataset.scrollY);
      }
    );
    function onTransitionend(e) {
      if (e.target === e.currentTarget) {
        copy.remove();
        el.removeEventListener("transitionend", onTransitionend);
        el.removeEventListener("transitioncancel", onTransitionend);
        el.classList.remove("app-transition");
        el.style.removeProperty("--clip-size");
        el.style.removeProperty("--clip-pos");
      }
    }
    el.addEventListener("transitionend", onTransitionend);
    el.addEventListener("transitioncancel", onTransitionend);
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
    }
  );
  const onThemeChange = () => {
    systemTheme.value = media.matches ? ThemeModeEnum.DARK : ThemeModeEnum.LIGHT;
  };
  watchEffect(() => {
    vuetifyTheme.change(settings.isSystem ? systemTheme.value : settings.theme.mode);
  });
  watch(vuetifyTheme.global.name, themeTransition);
  const backgroundThemeColor = computed(() => {
    return settings.isDarkenMode ? settings.theme.dark.primary : settings.theme.light.primary;
  });
  const lightColor = computed(() => {
    return getColorPalette(backgroundThemeColor.value, 3);
  });
  const darkColor = computed(() => {
    return getColorPalette(backgroundThemeColor.value, 6);
  });
  const backgroundColor = computed(() => {
    const COLOR_WHITE = "#ffffff";
    const ratio = settings.isDarkenMode ? 0.5 : 0.2;
    return mixColor(COLOR_WHITE, backgroundThemeColor.value, ratio);
  });
  const onCycleChangeTheme = () => {
    if (settings.isDark) {
      settings.toSystem();
      return;
    }
    if (settings.isSystem) {
      settings.toLight();
      return;
    }
    if (settings.isLight) {
      settings.toDark();
      return;
    }
  };
  const cycleChangeThemeIcon = computed(() => {
    switch (settings.theme.mode) {
      case ThemeModeEnum.SYSTEM:
        return "mdi-brightness-5";
      case ThemeModeEnum.DARK:
        return "mdi-brightness-auto";
      default:
        return "mdi-brightness-4";
    }
  });
  return {
    lightColor,
    darkColor,
    backgroundColor,
    onCycleChangeTheme,
    cycleChangeThemeIcon
  };
}
const initializer = (options) => {
  OptionsUtilities.initialize(options);
  RouterUtilities.initialize(options.router);
  SecurityApiResources.initialize(options.config);
  SignOutUtilities.initialize(options.signOutExtension);
};
export {
  CaptchaCategoryEnum,
  LayoutModeEnum,
  OptionsUtilities,
  RouterUtilities,
  SecurityApiResources,
  SignOutUtilities,
  SocialSourceEnum,
  ThemeModeEnum,
  addColorAlpha,
  getAllColorPalette,
  getColorPalette,
  getSystemHeaders,
  initializer,
  isWhiteColor,
  mixColor,
  default2 as piniaPluginPersistedstate,
  useApplicationStore,
  useAuthenticationStore,
  useCryptoStore,
  useDeviceAuthorize,
  useEditFinish,
  usePasskey,
  useRouterStore,
  useSettingsStore,
  useSystemMenu,
  useSystemRoute,
  useSystemTheme,
  useTabsViewStore
};
