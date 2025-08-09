import { useRoute } from "vue-router";
import { defineStore } from "pinia";
import { lodash, Swal, AuthorizationTokenEnum, Base64, ContentTypeEnum, AuthorizationGrantTypeEnum, Service, SM2Utils, SM4Utils, moment } from "@herodotus-cloud/core";
import { jwtDecode } from "jwt-decode";
import { nextTick, shallowRef, watch, computed } from "vue";
import "pinia-plugin-persistedstate";
var LayoutModeEnum$q = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$q || {});
var ThemeModeEnum$q = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$q || {});
var CaptchaCategoryEnum$q = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$q || {});
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
    useCryptoStore$q().$reset();
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
      lodash.merge(data, { scope });
    }
    return data;
  }
  createOAuth2Data(grantType, params, oidc = false) {
    const data = {
      grant_type: grantType
    };
    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }
    if (oidc) {
      lodash.merge(data, { scope: "openid" });
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
  deviceAuthorizationFlow(clientId = "", clientSecret = "", scope = "mail") {
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
        { mobile, code, source: "SMS" },
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
      scope: "openid email profile",
      token_endpoint_auth_method: "client_secret_post"
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
    if (category === CaptchaCategoryEnum$q.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$q.JIGSAW) {
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
const useCryptoStore$q = defineStore("Crypto", {
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
        const crypto = useCryptoStore$q();
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
      const crypto = useCryptoStore$q();
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
      const crypto = useCryptoStore$q();
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
  const crypto = useCryptoStore$q();
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
const useRouterStore$q = defineStore("Router", {
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
const useSettingsStore = defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$q.SYSTEM,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$q.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$q.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$q.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$q.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$q.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$q.CLASSIC
  }
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
      return lodash.findIndex(OptionsUtilities.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$q();
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
  const routeStore = useRouterStore$q();
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
function useDeviceAuthorize(clientId, clientSecret, deviceCode) {
  const handler = shallowRef(0);
  const interval = shallowRef(5);
  const isSuccess = shallowRef(false);
  const isFailed = shallowRef(false);
  const successResponse = shallowRef({});
  const pullingResponse = shallowRef([]);
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
    SecurityApiResources.getInstance().oauth2().deviceCodeFlow(clientId.value, clientSecret.value, deviceCode.value).then((response) => {
      message("Authorization successful", true);
      clear();
      isSuccess.value = true;
      successResponse.value = response.data;
    }).catch((error) => {
      const data = error.response.data;
      pulling(data.error);
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
    schedule
  };
}
var LayoutModeEnum$p = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$p || {});
var ThemeModeEnum$p = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$p || {});
var CaptchaCategoryEnum$p = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$p || {});
defineStore("Application", {
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
let OptionsUtilities$d = class OptionsUtilities2 {
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
    if (OptionsUtilities2._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities2._instance = new OptionsUtilities2(options);
    OptionsUtilities2._initialized = true;
    return OptionsUtilities2._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities2._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities2._instance;
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
};
let RouterUtilities$d = class RouterUtilities2 {
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
    if (RouterUtilities2._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities2._instance = new RouterUtilities2(options);
    RouterUtilities2._initialized = true;
    return RouterUtilities2._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities2._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities2._instance;
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
};
let OAuth2ApiService$d = class OAuth2ApiService2 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService2(config);
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
      lodash.merge(data, { scope });
    }
    return data;
  }
  createOAuth2Data(grantType, params, oidc = false) {
    const data = {
      grant_type: grantType
    };
    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }
    if (oidc) {
      lodash.merge(data, { scope: "openid" });
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
  deviceAuthorizationFlow(clientId = "", clientSecret = "", scope = "mail") {
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
        { mobile, code, source: "SMS" },
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
      scope: "openid email profile",
      token_endpoint_auth_method: "client_secret_post"
    });
  }
};
let OpenApiService$d = class OpenApiService2 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService2(config);
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
    if (category === CaptchaCategoryEnum$p.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$p.JIGSAW) {
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
};
let PasskeyApiService$d = class PasskeyApiService2 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService2(config);
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
};
let SecurityApiResources$d = class SecurityApiResources2 {
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
    if (SecurityApiResources2._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources2._instance = new SecurityApiResources2(config);
    SecurityApiResources2._initialized = true;
    return SecurityApiResources2._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources2._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources2._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$d.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$d.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$d.getInstance(this.config);
  }
};
const useCryptoStore$p = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$d.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$d.getSecurityKey());
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
        SecurityApiResources$d.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$d.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
const useAuthenticationStore$1 = defineStore("Authentication", {
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
      if (OptionsUtilities$d.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$p();
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
        SecurityApiResources$d.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$p();
      if (OptionsUtilities$d.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$d.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$d.isUseCrypto()).then((response) => {
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
        SecurityApiResources$d.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$d.isUseCrypto()).then((response) => {
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
        SecurityApiResources$d.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$d.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$d.getRedirectUri(),
          state,
          OptionsUtilities$d.isUseCrypto()
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
      const crypto = useCryptoStore$p();
      if (OptionsUtilities$d.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$d.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$d.isUseCrypto()).then((response) => {
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
        SecurityApiResources$d.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$d.isUseCrypto()).then((response) => {
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
        SecurityApiResources$d.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$d.isUseCrypto()).then((response) => {
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
const useRouterStore$p = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$p.SYSTEM,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$p.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$p.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$p.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$p.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$p.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$p.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities$d.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$p();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$d.getInstance().goBack();
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
var LayoutModeEnum$o = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$o || {});
var ThemeModeEnum$o = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$o || {});
var CaptchaCategoryEnum$o = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$o || {});
defineStore("Application", {
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
class OptionsUtilities22 {
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
    if (OptionsUtilities22._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities22._instance = new OptionsUtilities22(options);
    OptionsUtilities22._initialized = true;
    return OptionsUtilities22._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities22._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities22._instance;
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
class RouterUtilities22 {
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
    if (RouterUtilities22._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities22._instance = new RouterUtilities22(options);
    RouterUtilities22._initialized = true;
    return RouterUtilities22._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities22._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities22._instance;
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
class OAuth2ApiService22 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService22(config);
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
      client_id: clientId || this.config.getClientId(),
      client_secret: clientSecret || this.config.getClientSecret()
    };
    if (scope) {
      lodash.merge(data, { scope });
    }
    return data;
  }
  createOAuth2Data(grantType, params, oidc = false) {
    const data = {
      grant_type: grantType
    };
    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }
    if (oidc) {
      lodash.merge(data, { scope: "openid" });
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
   * @param scope 范围
   * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
   * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
   * @returns Promise<AxiosHttpResult<DeviceAuthorizationResponse>> - 返回设备授权响应
   * @description 设备授权流程允许用户在一个设备上获取设备码，然后在另一个设备上使用该设备码进行授权。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628#section-3.1
   */
  deviceAuthorizationFlow(clientId = "", clientSecret = "", scope = "mail") {
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
        { mobile, code, source: "SMS" },
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
    return this.config.getHttp().post(this.getOAuth2TokenAddress(), {
      product_key: productKey,
      grant_types: [
        AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS,
        AuthorizationGrantTypeEnum.DEVICE_CODE
      ],
      redirect_uris: ["http://192.168.101.10:3000"],
      client_name: clientName,
      // client_secret: '123456',
      scope: "openid email profile",
      token_endpoint_auth_method: "client_secret_post"
    });
  }
}
class OpenApiService22 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService22(config);
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
    if (category === CaptchaCategoryEnum$o.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$o.JIGSAW) {
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
class PasskeyApiService22 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService22(config);
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
class SecurityApiResources22 {
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
    if (SecurityApiResources22._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources22._instance = new SecurityApiResources22(config);
    SecurityApiResources22._initialized = true;
    return SecurityApiResources22._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources22._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources22._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService22.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService22.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService22.getInstance(this.config);
  }
}
const useCryptoStore$o = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities22.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities22.getSecurityKey());
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
        SecurityApiResources22.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources22.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities22.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$o();
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
        SecurityApiResources22.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$o();
      if (OptionsUtilities22.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities22.isUseCrypto()).then((response) => {
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
        SecurityApiResources22.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities22.isUseCrypto()).then((response) => {
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
        SecurityApiResources22.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources22.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities22.getRedirectUri(),
          state,
          OptionsUtilities22.isUseCrypto()
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
      const crypto = useCryptoStore$o();
      if (OptionsUtilities22.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities22.isUseCrypto()).then((response) => {
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
        SecurityApiResources22.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities22.isUseCrypto()).then((response) => {
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
        SecurityApiResources22.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities22.isUseCrypto()).then((response) => {
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
const useRouterStore$o = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$o.SYSTEM,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$o.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$o.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$o.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$o.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$o.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$o.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities22.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$o();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities22.getInstance().goBack();
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
var LayoutModeEnum$n = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$n || {});
var ThemeModeEnum$n = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$n || {});
var CaptchaCategoryEnum$n = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$n || {});
defineStore("Application", {
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
let OptionsUtilities$c = class OptionsUtilities222 {
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
    if (OptionsUtilities222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities222._instance = new OptionsUtilities222(options);
    OptionsUtilities222._initialized = true;
    return OptionsUtilities222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities222._instance;
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
};
let RouterUtilities$c = class RouterUtilities222 {
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
    if (RouterUtilities222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities222._instance = new RouterUtilities222(options);
    RouterUtilities222._initialized = true;
    return RouterUtilities222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities222._instance;
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
};
let OAuth2ApiService$c = class OAuth2ApiService222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService222(config);
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
      client_id: clientId || this.config.getClientId(),
      client_secret: clientSecret || this.config.getClientSecret()
    };
    if (scope) {
      lodash.merge(data, { scope });
    }
    return data;
  }
  createOAuth2Data(grantType, params, oidc = false) {
    const data = {
      grant_type: grantType
    };
    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }
    if (oidc) {
      lodash.merge(data, { scope: "openid" });
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
   * @param scope 范围
   * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
   * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
   * @returns Promise<AxiosHttpResult<DeviceAuthorizationResponse>> - 返回设备授权响应
   * @description 设备授权流程允许用户在一个设备上获取设备码，然后在另一个设备上使用该设备码进行授权。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628#section-3.1
   */
  deviceAuthorizationFlow(clientId = "", clientSecret = "", scope = "mail") {
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
        { mobile, code, source: "SMS" },
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
    return this.config.getHttp().post(this.getOAuth2TokenAddress(), {
      product_key: productKey,
      grant_types: [
        AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS,
        AuthorizationGrantTypeEnum.DEVICE_CODE
      ],
      redirect_uris: ["http://192.168.101.10:3000"],
      client_name: clientName,
      // client_secret: '123456',
      scope: "openid email profile",
      token_endpoint_auth_method: "client_secret_post"
    });
  }
};
let OpenApiService$c = class OpenApiService222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService222(config);
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
    if (category === CaptchaCategoryEnum$n.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$n.JIGSAW) {
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
};
let PasskeyApiService$c = class PasskeyApiService222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService222(config);
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
};
let SecurityApiResources$c = class SecurityApiResources222 {
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
    if (SecurityApiResources222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources222._instance = new SecurityApiResources222(config);
    SecurityApiResources222._initialized = true;
    return SecurityApiResources222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$c.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$c.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$c.getInstance(this.config);
  }
};
const useCryptoStore$n = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$c.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$c.getSecurityKey());
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
        SecurityApiResources$c.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$c.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$c.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$n();
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
        SecurityApiResources$c.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$n();
      if (OptionsUtilities$c.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$c.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$c.isUseCrypto()).then((response) => {
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
        SecurityApiResources$c.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$c.isUseCrypto()).then((response) => {
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
        SecurityApiResources$c.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$c.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$c.getRedirectUri(),
          state,
          OptionsUtilities$c.isUseCrypto()
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
      const crypto = useCryptoStore$n();
      if (OptionsUtilities$c.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$c.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$c.isUseCrypto()).then((response) => {
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
        SecurityApiResources$c.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$c.isUseCrypto()).then((response) => {
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
        SecurityApiResources$c.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$c.isUseCrypto()).then((response) => {
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
const useRouterStore$n = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$n.SYSTEM,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$n.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$n.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$n.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$n.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$n.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$n.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities$c.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$n();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$c.getInstance().goBack();
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
var LayoutModeEnum$m = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$m || {});
var ThemeModeEnum$m = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$m || {});
var CaptchaCategoryEnum$m = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$m || {});
defineStore("Application", {
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
class OptionsUtilities2222 {
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
    if (OptionsUtilities2222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities2222._instance = new OptionsUtilities2222(options);
    OptionsUtilities2222._initialized = true;
    return OptionsUtilities2222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities2222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities2222._instance;
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
class RouterUtilities2222 {
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
    if (RouterUtilities2222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities2222._instance = new RouterUtilities2222(options);
    RouterUtilities2222._initialized = true;
    return RouterUtilities2222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities2222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities2222._instance;
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
class OAuth2ApiService2222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService2222(config);
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
      client_id: clientId || this.config.getClientId(),
      client_secret: clientSecret || this.config.getClientSecret()
    };
    if (scope) {
      lodash.merge(data, { scope });
    }
    return data;
  }
  createOAuth2Data(grantType, params, oidc = false) {
    const data = {
      grant_type: grantType
    };
    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }
    if (oidc) {
      lodash.merge(data, { scope: "openid" });
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
   * @param scope 范围
   * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
   * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
   * @returns Promise<AxiosHttpResult<DeviceAuthorizationResponse>> - 返回设备授权响应
   * @description 设备授权流程允许用户在一个设备上获取设备码，然后在另一个设备上使用该设备码进行授权。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628#section-3.1
   */
  deviceAuthorizationFlow(clientId = "", clientSecret = "", scope = "mail") {
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
        { mobile, code, source: "SMS" },
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
    return this.config.getHttp().post(this.getOAuth2TokenAddress(), {
      product_key: productKey,
      grant_types: [
        AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS,
        AuthorizationGrantTypeEnum.DEVICE_CODE
      ],
      redirect_uris: ["http://192.168.101.10:3000"],
      client_name: clientName,
      // client_secret: '123456',
      scope: "openid email profile",
      token_endpoint_auth_method: "client_secret_post"
    });
  }
}
class OpenApiService2222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService2222(config);
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
    if (category === CaptchaCategoryEnum$m.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$m.JIGSAW) {
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
class PasskeyApiService2222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService2222(config);
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
class SecurityApiResources2222 {
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
    if (SecurityApiResources2222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources2222._instance = new SecurityApiResources2222(config);
    SecurityApiResources2222._initialized = true;
    return SecurityApiResources2222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources2222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources2222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService2222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService2222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService2222.getInstance(this.config);
  }
}
const useCryptoStore$m = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities2222.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities2222.getSecurityKey());
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
        SecurityApiResources2222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources2222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities2222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$m();
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
        SecurityApiResources2222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$m();
      if (OptionsUtilities2222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources2222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities2222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities2222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources2222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities2222.getRedirectUri(),
          state,
          OptionsUtilities2222.isUseCrypto()
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
      const crypto = useCryptoStore$m();
      if (OptionsUtilities2222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources2222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities2222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities2222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities2222.isUseCrypto()).then((response) => {
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
const useRouterStore$m = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$m.SYSTEM,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$m.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$m.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$m.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$m.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$m.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$m.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities2222.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$m();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities2222.getInstance().goBack();
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
var LayoutModeEnum$l = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$l || {});
var ThemeModeEnum$l = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$l || {});
var CaptchaCategoryEnum$l = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$l || {});
defineStore("Application", {
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
let OptionsUtilities$b = class OptionsUtilities22222 {
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
    if (OptionsUtilities22222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities22222._instance = new OptionsUtilities22222(options);
    OptionsUtilities22222._initialized = true;
    return OptionsUtilities22222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities22222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities22222._instance;
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
};
let RouterUtilities$b = class RouterUtilities22222 {
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
    if (RouterUtilities22222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities22222._instance = new RouterUtilities22222(options);
    RouterUtilities22222._initialized = true;
    return RouterUtilities22222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities22222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities22222._instance;
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
};
let OAuth2ApiService$b = class OAuth2ApiService22222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService22222(config);
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
      client_id: clientId || this.config.getClientId(),
      client_secret: clientSecret || this.config.getClientSecret()
    };
    if (scope) {
      lodash.merge(data, { scope });
    }
    return data;
  }
  createOAuth2Data(grantType, params, oidc = false) {
    const data = {
      grant_type: grantType
    };
    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }
    if (oidc) {
      lodash.merge(data, { scope: "openid" });
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
   * @param scope 范围
   * @param clientId 客户端 ID(optional)。如果不传递该参数则使用系统配置的客户端 ID。
   * @param clientSecret  客户端密钥(optional)。如果不传递该参数则使用系统配置的客户端密钥。
   * @returns Promise<AxiosHttpResult<DeviceAuthorizationResponse>> - 返回设备授权响应
   * @description 设备授权流程允许用户在一个设备上获取设备码，然后在另一个设备上使用该设备码进行授权。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628#section-3.1
   */
  deviceAuthorizationFlow(clientId = "", clientSecret = "", scope = "mail") {
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
        { mobile, code, source: "SMS" },
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
    return this.config.getHttp().post(this.getOAuth2TokenAddress(), {
      product_key: productKey,
      grant_types: [
        AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS,
        AuthorizationGrantTypeEnum.DEVICE_CODE
      ],
      redirect_uris: ["http://192.168.101.10:3000"],
      client_name: clientName,
      // client_secret: '123456',
      scope: "openid email profile",
      token_endpoint_auth_method: "client_secret_post"
    });
  }
};
let OpenApiService$b = class OpenApiService22222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService22222(config);
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
    if (category === CaptchaCategoryEnum$l.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$l.JIGSAW) {
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
};
let PasskeyApiService$b = class PasskeyApiService22222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService22222(config);
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
};
let SecurityApiResources$b = class SecurityApiResources22222 {
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
    if (SecurityApiResources22222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources22222._instance = new SecurityApiResources22222(config);
    SecurityApiResources22222._initialized = true;
    return SecurityApiResources22222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources22222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources22222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$b.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$b.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$b.getInstance(this.config);
  }
};
const useCryptoStore$l = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$b.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$b.getSecurityKey());
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
        SecurityApiResources$b.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$b.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$b.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$l();
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
        SecurityApiResources$b.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$l();
      if (OptionsUtilities$b.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$b.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$b.isUseCrypto()).then((response) => {
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
        SecurityApiResources$b.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$b.isUseCrypto()).then((response) => {
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
        SecurityApiResources$b.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$b.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$b.getRedirectUri(),
          state,
          OptionsUtilities$b.isUseCrypto()
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
      const crypto = useCryptoStore$l();
      if (OptionsUtilities$b.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$b.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$b.isUseCrypto()).then((response) => {
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
        SecurityApiResources$b.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$b.isUseCrypto()).then((response) => {
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
        SecurityApiResources$b.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$b.isUseCrypto()).then((response) => {
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
const useRouterStore$l = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$l.SYSTEM,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$l.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$l.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$l.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$l.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$l.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$l.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities$b.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$l();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$b.getInstance().goBack();
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
var LayoutModeEnum$k = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$k || {});
var ThemeModeEnum$k = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$k || {});
var CaptchaCategoryEnum$k = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$k || {});
defineStore("Application", {
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
class OptionsUtilities222222 {
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
    if (OptionsUtilities222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities222222._instance = new OptionsUtilities222222(options);
    OptionsUtilities222222._initialized = true;
    return OptionsUtilities222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities222222._instance;
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
class RouterUtilities222222 {
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
    if (RouterUtilities222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities222222._instance = new RouterUtilities222222(options);
    RouterUtilities222222._initialized = true;
    return RouterUtilities222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities222222._instance;
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
class OAuth2ApiService222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService222222(config);
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
  createClientData(scope = "", clientId = "", clientSecret = "") {
    const data = {
      client_id: clientId || this.config.getClientId(),
      client_secret: clientSecret || this.config.getClientSecret()
    };
    if (scope) {
      lodash.merge(data, { scope });
    }
    return data;
  }
  createOAuth2Data(grantType, params, oidc = false) {
    const data = {
      grant_type: grantType
    };
    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }
    if (oidc) {
      lodash.merge(data, { scope: "openid" });
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
   * @param scope 范围(optional)
   * @param clientId 客户端 ID(optional)
   * @param clientSecret  客户端密钥(optional)
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
  clientCredentialsFlow(scope = "", clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS, {
        ...this.createClientData(scope, clientId, clientSecret)
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  /**
   * 设备授权模式。获取访问令牌。
   * @param deviceCode 设备码
   * @param scope 范围 (optional)
   * @param clientId 客户端 ID (optional)
   * @param clientSecret 客户端密钥 (optional)
   * @description 设备授权模式允许用户在一个设备上获取授权码，然后在另一个设备上使用该授权码获取访问令牌。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628
   * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
   */
  deviceCodeFlow(deviceCode, scope = "", clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.DEVICE_CODE, {
        device_code: deviceCode,
        ...this.createClientData(scope, clientId, clientSecret)
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  /**
   * 设备授权流程。获取设备码和用户码。
   * @param scope 范围
   * @param clientId 客户端 ID
   * @param clientSecret 客户端密钥
   * @returns Promise<AxiosHttpResult<DeviceAuthorizationResponse>> - 返回设备授权响应
   * @description 设备授权流程允许用户在一个设备上获取设备码，然后在另一个设备上使用该设备码进行授权。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628#section-3.1
   */
  deviceAuthorizationFlow(scope = "mail", clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2DeviceAuthorizationAddress(),
      this.createClientData(scope, clientId, clientSecret),
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
        { mobile, code, source: "SMS" },
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
    return this.config.getHttp().post(this.getOAuth2TokenAddress(), {
      product_key: productKey,
      grant_types: [
        AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS,
        AuthorizationGrantTypeEnum.DEVICE_CODE
      ],
      redirect_uris: ["http://192.168.101.10:3000"],
      client_name: clientName,
      // client_secret: '123456',
      scope: "openid email profile",
      token_endpoint_auth_method: "client_secret_post"
    });
  }
}
class OpenApiService222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService222222(config);
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
    if (category === CaptchaCategoryEnum$k.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$k.JIGSAW) {
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
class PasskeyApiService222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService222222(config);
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
class SecurityApiResources222222 {
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
    if (SecurityApiResources222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources222222._instance = new SecurityApiResources222222(config);
    SecurityApiResources222222._initialized = true;
    return SecurityApiResources222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService222222.getInstance(this.config);
  }
}
const useCryptoStore$k = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities222222.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities222222.getSecurityKey());
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
        SecurityApiResources222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities222222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$k();
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
        SecurityApiResources222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$k();
      if (OptionsUtilities222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities222222.getRedirectUri(),
          state,
          OptionsUtilities222222.isUseCrypto()
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
      const crypto = useCryptoStore$k();
      if (OptionsUtilities222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities222222.isUseCrypto()).then((response) => {
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
const useRouterStore$k = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$k.SYSTEM,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$k.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$k.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$k.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$k.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$k.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$k.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities222222.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$k();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities222222.getInstance().goBack();
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
var LayoutModeEnum$j = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$j || {});
var ThemeModeEnum$j = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$j || {});
var CaptchaCategoryEnum$j = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$j || {});
defineStore("Application", {
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
let OptionsUtilities$a = class OptionsUtilities2222222 {
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
    if (OptionsUtilities2222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities2222222._instance = new OptionsUtilities2222222(options);
    OptionsUtilities2222222._initialized = true;
    return OptionsUtilities2222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities2222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities2222222._instance;
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
};
let RouterUtilities$a = class RouterUtilities2222222 {
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
    if (RouterUtilities2222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities2222222._instance = new RouterUtilities2222222(options);
    RouterUtilities2222222._initialized = true;
    return RouterUtilities2222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities2222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities2222222._instance;
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
};
let OAuth2ApiService$a = class OAuth2ApiService2222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService2222222(config);
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
  createBasicHeader(clientId = "", clientSecret = "") {
    let data = this.config.getClientId() + ":" + this.config.getClientSecret();
    if (clientId && clientSecret) {
      data = clientId + ":" + clientSecret;
    }
    return "Basic " + Base64.encode(data);
  }
  createClientData(scope = "", clientId = "", clientSecret = "") {
    const data = {
      client_id: clientId || this.config.getClientId(),
      client_secret: clientSecret || this.config.getClientSecret()
    };
    if (scope) {
      lodash.merge(data, { scope });
    }
    return data;
  }
  createOAuth2Data(grantType, params, oidc = false) {
    const data = {
      grant_type: grantType
    };
    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }
    if (oidc) {
      lodash.merge(data, { scope: "openid" });
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
   * @param scope 范围(optional)
   * @param clientId 客户端 ID(optional)
   * @param clientSecret  客户端密钥(optional)
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
  clientCredentialsFlow(scope = "", clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS, {
        ...this.createClientData(scope, clientId, clientSecret)
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  /**
   * 设备授权模式。获取访问令牌。
   * @param deviceCode 设备码
   * @param scope 范围 (optional)
   * @param clientId 客户端 ID (optional)
   * @param clientSecret 客户端密钥 (optional)
   * @description 设备授权模式允许用户在一个设备上获取授权码，然后在另一个设备上使用该授权码获取访问令牌。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628
   * @returns Promise<AxiosHttpResult<AccessTokenResponse>> - 返回访问令牌响应
   */
  deviceCodeFlow(deviceCode, scope = "", clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.DEVICE_CODE, {
        device_code: deviceCode,
        ...this.createClientData(scope, clientId, clientSecret)
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  /**
   * 设备授权流程。获取设备码和用户码。
   * @param scope 范围
   * @param clientId 客户端 ID
   * @param clientSecret 客户端密钥
   * @returns Promise<AxiosHttpResult<DeviceAuthorizationResponse>> - 返回设备授权响应
   * @description 设备授权流程允许用户在一个设备上获取设备码，然后在另一个设备上使用该设备码进行授权。
   * 这种模式适用于没有浏览器或输入设备的场景，例如智能电视、游戏机等。
   * 用户需要在一个设备上输入设备码，然后在另一个设备上输入该设备码以完成授权。
   * @see https://datatracker.ietf.org/doc/html/rfc8628#section-3.1
   */
  deviceAuthorizationFlow(scope = "mail", clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2DeviceAuthorizationAddress(),
      this.createClientData(scope, clientId, clientSecret),
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
        { mobile, code, source: "SMS" },
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
};
let OpenApiService$a = class OpenApiService2222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService2222222(config);
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
    if (category === CaptchaCategoryEnum$j.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$j.JIGSAW) {
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
};
let PasskeyApiService$a = class PasskeyApiService2222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService2222222(config);
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
};
let SecurityApiResources$a = class SecurityApiResources2222222 {
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
    if (SecurityApiResources2222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources2222222._instance = new SecurityApiResources2222222(config);
    SecurityApiResources2222222._initialized = true;
    return SecurityApiResources2222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources2222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources2222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$a.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$a.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$a.getInstance(this.config);
  }
};
const useCryptoStore$j = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$a.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$a.getSecurityKey());
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
        SecurityApiResources$a.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$a.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$a.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$j();
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
        SecurityApiResources$a.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$j();
      if (OptionsUtilities$a.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$a.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$a.isUseCrypto()).then((response) => {
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
        SecurityApiResources$a.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$a.isUseCrypto()).then((response) => {
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
        SecurityApiResources$a.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$a.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$a.getRedirectUri(),
          state,
          OptionsUtilities$a.isUseCrypto()
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
      const crypto = useCryptoStore$j();
      if (OptionsUtilities$a.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$a.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$a.isUseCrypto()).then((response) => {
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
        SecurityApiResources$a.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$a.isUseCrypto()).then((response) => {
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
        SecurityApiResources$a.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$a.isUseCrypto()).then((response) => {
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
const useRouterStore$j = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$j.SYSTEM,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$j.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$j.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$j.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$j.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$j.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$j.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities$a.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$j();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$a.getInstance().goBack();
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
var LayoutModeEnum$i = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$i || {});
var ThemeModeEnum$i = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$i || {});
var CaptchaCategoryEnum$i = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$i || {});
defineStore("Application", {
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
class OptionsUtilities22222222 {
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
    if (OptionsUtilities22222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities22222222._instance = new OptionsUtilities22222222(options);
    OptionsUtilities22222222._initialized = true;
    return OptionsUtilities22222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities22222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities22222222._instance;
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
class RouterUtilities22222222 {
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
    if (RouterUtilities22222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities22222222._instance = new RouterUtilities22222222(options);
    RouterUtilities22222222._initialized = true;
    return RouterUtilities22222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities22222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities22222222._instance;
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
class OAuth2ApiService22222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService22222222(config);
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
  createBasicHeader(clientId = "", clientSecret = "") {
    let data = this.config.getClientId() + ":" + this.config.getClientSecret();
    if (clientId && clientSecret) {
      data = clientId + ":" + clientSecret;
    }
    return "Basic " + Base64.encode(data);
  }
  createClientData(scope = "", clientId = "", clientSecret = "") {
    const data = {
      client_id: clientId || this.config.getClientId(),
      client_secret: clientSecret || this.config.getClientSecret()
    };
    if (scope) {
      lodash.merge(data, { scope });
    }
    return data;
  }
  createOAuth2Data(grantType, params, oidc = false) {
    const data = {
      grant_type: grantType
    };
    if (!lodash.isEmpty(params)) {
      lodash.merge(data, params);
    }
    if (oidc) {
      lodash.merge(data, { scope: "openid" });
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
  clientCredentialsFlow(scope = "", clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.CLIENT_CREDENTIALS, {
        ...this.createClientData(scope, clientId, clientSecret)
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  deviceCodeFlow(deviceCode, scope = "", clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(AuthorizationGrantTypeEnum.DEVICE_CODE, {
        device_code: deviceCode,
        ...this.createClientData(scope, clientId, clientSecret)
      }),
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
  deviceAuthorizationFlow(scope = "mail", clientId = "", clientSecret = "") {
    return this.config.getHttp().post(
      this.getOAuth2DeviceAuthorizationAddress(),
      this.createClientData(scope, clientId, clientSecret),
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
        { mobile, code, source: "SMS" },
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
}
class OpenApiService22222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService22222222(config);
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
    if (category === CaptchaCategoryEnum$i.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$i.JIGSAW) {
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
class PasskeyApiService22222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService22222222(config);
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
class SecurityApiResources22222222 {
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
    if (SecurityApiResources22222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources22222222._instance = new SecurityApiResources22222222(config);
    SecurityApiResources22222222._initialized = true;
    return SecurityApiResources22222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources22222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources22222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService22222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService22222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService22222222.getInstance(this.config);
  }
}
const useCryptoStore$i = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities22222222.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities22222222.getSecurityKey());
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
        SecurityApiResources22222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources22222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities22222222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$i();
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
        SecurityApiResources22222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$i();
      if (OptionsUtilities22222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities22222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities22222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities22222222.getRedirectUri(),
          state,
          OptionsUtilities22222222.isUseCrypto()
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
      const crypto = useCryptoStore$i();
      if (OptionsUtilities22222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities22222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities22222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities22222222.isUseCrypto()).then((response) => {
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
const useRouterStore$i = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$i.SYSTEM,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$i.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$i.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$i.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$i.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$i.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$i.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities22222222.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$i();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities22222222.getInstance().goBack();
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
var LayoutModeEnum$h = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$h || {});
var ThemeModeEnum$h = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$h || {});
var CaptchaCategoryEnum$h = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$h || {});
defineStore("Application", {
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
let OptionsUtilities$9 = class OptionsUtilities222222222 {
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
    if (OptionsUtilities222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities222222222._instance = new OptionsUtilities222222222(options);
    OptionsUtilities222222222._initialized = true;
    return OptionsUtilities222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities222222222._instance;
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
};
let RouterUtilities$9 = class RouterUtilities222222222 {
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
    if (RouterUtilities222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities222222222._instance = new RouterUtilities222222222(options);
    RouterUtilities222222222._initialized = true;
    return RouterUtilities222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities222222222._instance;
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
};
let OAuth2ApiService$9 = class OAuth2ApiService222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
};
let OpenApiService$9 = class OpenApiService222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService222222222(config);
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
    if (category === CaptchaCategoryEnum$h.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$h.JIGSAW) {
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
};
let PasskeyApiService$9 = class PasskeyApiService222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService222222222(config);
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
};
let SecurityApiResources$9 = class SecurityApiResources222222222 {
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
    if (SecurityApiResources222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources222222222._instance = new SecurityApiResources222222222(config);
    SecurityApiResources222222222._initialized = true;
    return SecurityApiResources222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$9.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$9.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$9.getInstance(this.config);
  }
};
const useCryptoStore$h = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$9.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$9.getSecurityKey());
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
        SecurityApiResources$9.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$9.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$9.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$h();
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
        SecurityApiResources$9.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$h();
      if (OptionsUtilities$9.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$9.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$9.isUseCrypto()).then((response) => {
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
        SecurityApiResources$9.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$9.isUseCrypto()).then((response) => {
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
        SecurityApiResources$9.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$9.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$9.getRedirectUri(),
          state,
          OptionsUtilities$9.isUseCrypto()
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
      const crypto = useCryptoStore$h();
      if (OptionsUtilities$9.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$9.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$9.isUseCrypto()).then((response) => {
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
        SecurityApiResources$9.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$9.isUseCrypto()).then((response) => {
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
        SecurityApiResources$9.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$9.isUseCrypto()).then((response) => {
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
const useRouterStore$h = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$h.SYSTEM,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$h.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$h.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$h.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$h.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$h.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$h.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities$9.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$h();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$9.getInstance().goBack();
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
var LayoutModeEnum$g = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$g || {});
var ThemeModeEnum$g = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$g || {});
var CaptchaCategoryEnum$g = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$g || {});
defineStore("Application", {
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
class OptionsUtilities2222222222 {
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
    if (OptionsUtilities2222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities2222222222._instance = new OptionsUtilities2222222222(options);
    OptionsUtilities2222222222._initialized = true;
    return OptionsUtilities2222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities2222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities2222222222._instance;
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
class RouterUtilities2222222222 {
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
    if (RouterUtilities2222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities2222222222._instance = new RouterUtilities2222222222(options);
    RouterUtilities2222222222._initialized = true;
    return RouterUtilities2222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities2222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities2222222222._instance;
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
class OAuth2ApiService2222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService2222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
class OpenApiService2222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService2222222222(config);
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
    if (category === CaptchaCategoryEnum$g.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$g.JIGSAW) {
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
class PasskeyApiService2222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService2222222222(config);
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
class SecurityApiResources2222222222 {
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
    if (SecurityApiResources2222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources2222222222._instance = new SecurityApiResources2222222222(config);
    SecurityApiResources2222222222._initialized = true;
    return SecurityApiResources2222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources2222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources2222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService2222222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService2222222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService2222222222.getInstance(this.config);
  }
}
const useCryptoStore$g = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities2222222222.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities2222222222.getSecurityKey());
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
        SecurityApiResources2222222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources2222222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities2222222222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$g();
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
        SecurityApiResources2222222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$g();
      if (OptionsUtilities2222222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources2222222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities2222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities2222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources2222222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities2222222222.getRedirectUri(),
          state,
          OptionsUtilities2222222222.isUseCrypto()
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
      const crypto = useCryptoStore$g();
      if (OptionsUtilities2222222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources2222222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities2222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities2222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities2222222222.isUseCrypto()).then((response) => {
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
const useRouterStore$g = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$g.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$g.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$g.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$g.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$g.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$g.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$g.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities2222222222.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$g();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities2222222222.getInstance().goBack();
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
var LayoutModeEnum$f = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$f || {});
var ThemeModeEnum$f = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$f || {});
var CaptchaCategoryEnum$f = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$f || {});
let OptionsUtilities$8 = class OptionsUtilities22222222222 {
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
    if (OptionsUtilities22222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities22222222222._instance = new OptionsUtilities22222222222(options);
    OptionsUtilities22222222222._initialized = true;
    return OptionsUtilities22222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities22222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities22222222222._instance;
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
};
let RouterUtilities$8 = class RouterUtilities22222222222 {
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
    if (RouterUtilities22222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities22222222222._instance = new RouterUtilities22222222222(options);
    RouterUtilities22222222222._initialized = true;
    return RouterUtilities22222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities22222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities22222222222._instance;
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
};
let OAuth2ApiService$8 = class OAuth2ApiService22222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService22222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
};
let OpenApiService$8 = class OpenApiService22222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService22222222222(config);
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
    if (category === CaptchaCategoryEnum$f.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$f.JIGSAW) {
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
};
let PasskeyApiService$8 = class PasskeyApiService22222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService22222222222(config);
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
};
let SecurityApiResources$8 = class SecurityApiResources22222222222 {
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
    if (SecurityApiResources22222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources22222222222._instance = new SecurityApiResources22222222222(config);
    SecurityApiResources22222222222._initialized = true;
    return SecurityApiResources22222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources22222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources22222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$8.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$8.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$8.getInstance(this.config);
  }
};
const useCryptoStore$f = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$8.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$8.getSecurityKey());
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
        SecurityApiResources$8.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$8.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$8.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$f();
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
        SecurityApiResources$8.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$f();
      if (OptionsUtilities$8.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$8.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$8.isUseCrypto()).then((response) => {
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
        SecurityApiResources$8.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$8.isUseCrypto()).then((response) => {
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
        SecurityApiResources$8.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$8.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$8.getRedirectUri(),
          state,
          OptionsUtilities$8.isUseCrypto()
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
      const crypto = useCryptoStore$f();
      if (OptionsUtilities$8.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$8.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$8.isUseCrypto()).then((response) => {
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
        SecurityApiResources$8.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$8.isUseCrypto()).then((response) => {
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
        SecurityApiResources$8.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$8.isUseCrypto()).then((response) => {
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
const useRouterStore$f = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$f.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$f.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$f.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$f.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$f.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$f.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$f.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities$8.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$f();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$8.getInstance().goBack();
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
var LayoutModeEnum$e = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$e || {});
var ThemeModeEnum$e = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$e || {});
var CaptchaCategoryEnum$e = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$e || {});
class OptionsUtilities222222222222 {
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
    if (OptionsUtilities222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities222222222222._instance = new OptionsUtilities222222222222(options);
    OptionsUtilities222222222222._initialized = true;
    return OptionsUtilities222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities222222222222._instance;
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
class RouterUtilities222222222222 {
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
    if (RouterUtilities222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities222222222222._instance = new RouterUtilities222222222222(options);
    RouterUtilities222222222222._initialized = true;
    return RouterUtilities222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities222222222222._instance;
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
class OAuth2ApiService222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
class OpenApiService222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService222222222222(config);
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
    if (category === CaptchaCategoryEnum$e.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$e.JIGSAW) {
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
class PasskeyApiService222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService222222222222(config);
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
class SecurityApiResources222222222222 {
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
    if (SecurityApiResources222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources222222222222._instance = new SecurityApiResources222222222222(config);
    SecurityApiResources222222222222._initialized = true;
    return SecurityApiResources222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService222222222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService222222222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService222222222222.getInstance(this.config);
  }
}
const useCryptoStore$e = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities222222222222.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities222222222222.getSecurityKey());
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
        SecurityApiResources222222222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources222222222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities222222222222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$e();
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
        SecurityApiResources222222222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$e();
      if (OptionsUtilities222222222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources222222222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources222222222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities222222222222.getRedirectUri(),
          state,
          OptionsUtilities222222222222.isUseCrypto()
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
      const crypto = useCryptoStore$e();
      if (OptionsUtilities222222222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources222222222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities222222222222.isUseCrypto()).then((response) => {
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
const useRouterStore$e = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$e.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$e.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$e.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$e.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$e.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$e.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$e.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities222222222222.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$e();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities222222222222.getInstance().goBack();
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
var LayoutModeEnum$d = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$d || {});
var ThemeModeEnum$d = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$d || {});
var CaptchaCategoryEnum$d = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$d || {});
let OptionsUtilities$7 = class OptionsUtilities2222222222222 {
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
    if (OptionsUtilities2222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities2222222222222._instance = new OptionsUtilities2222222222222(options);
    OptionsUtilities2222222222222._initialized = true;
    return OptionsUtilities2222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities2222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities2222222222222._instance;
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
};
let RouterUtilities$7 = class RouterUtilities2222222222222 {
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
    if (RouterUtilities2222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities2222222222222._instance = new RouterUtilities2222222222222(options);
    RouterUtilities2222222222222._initialized = true;
    return RouterUtilities2222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities2222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities2222222222222._instance;
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
};
let OAuth2ApiService$7 = class OAuth2ApiService2222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService2222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
};
let OpenApiService$7 = class OpenApiService2222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService2222222222222(config);
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
    if (category === CaptchaCategoryEnum$d.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$d.JIGSAW) {
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
};
let PasskeyApiService$7 = class PasskeyApiService2222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService2222222222222(config);
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
};
let SecurityApiResources$7 = class SecurityApiResources2222222222222 {
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
    if (SecurityApiResources2222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources2222222222222._instance = new SecurityApiResources2222222222222(config);
    SecurityApiResources2222222222222._initialized = true;
    return SecurityApiResources2222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources2222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources2222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$7.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$7.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$7.getInstance(this.config);
  }
};
const useCryptoStore$d = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$7.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$7.getSecurityKey());
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
        SecurityApiResources$7.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$7.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$7.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$d();
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
        SecurityApiResources$7.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$d();
      if (OptionsUtilities$7.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$7.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$7.isUseCrypto()).then((response) => {
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
        SecurityApiResources$7.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$7.isUseCrypto()).then((response) => {
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
        SecurityApiResources$7.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$7.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$7.getRedirectUri(),
          state,
          OptionsUtilities$7.isUseCrypto()
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
      const crypto = useCryptoStore$d();
      if (OptionsUtilities$7.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$7.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$7.isUseCrypto()).then((response) => {
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
        SecurityApiResources$7.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$7.isUseCrypto()).then((response) => {
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
        SecurityApiResources$7.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$7.isUseCrypto()).then((response) => {
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
const useRouterStore$d = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$d.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$d.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$d.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$d.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$d.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$d.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$d.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities$7.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$d();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$7.getInstance().goBack();
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
var LayoutModeEnum$c = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$c || {});
var ThemeModeEnum$c = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$c || {});
var CaptchaCategoryEnum$c = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$c || {});
class OptionsUtilities22222222222222 {
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
    if (OptionsUtilities22222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities22222222222222._instance = new OptionsUtilities22222222222222(options);
    OptionsUtilities22222222222222._initialized = true;
    return OptionsUtilities22222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities22222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities22222222222222._instance;
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
class RouterUtilities22222222222222 {
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
    if (RouterUtilities22222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities22222222222222._instance = new RouterUtilities22222222222222(options);
    RouterUtilities22222222222222._initialized = true;
    return RouterUtilities22222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities22222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities22222222222222._instance;
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
class OAuth2ApiService22222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService22222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
class OpenApiService22222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService22222222222222(config);
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
    if (category === CaptchaCategoryEnum$c.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$c.JIGSAW) {
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
class PasskeyApiService22222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService22222222222222(config);
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
class SecurityApiResources22222222222222 {
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
    if (SecurityApiResources22222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources22222222222222._instance = new SecurityApiResources22222222222222(config);
    SecurityApiResources22222222222222._initialized = true;
    return SecurityApiResources22222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources22222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources22222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService22222222222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService22222222222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService22222222222222.getInstance(this.config);
  }
}
const useCryptoStore$c = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities22222222222222.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities22222222222222.getSecurityKey());
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
        SecurityApiResources22222222222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources22222222222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities22222222222222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$c();
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
        SecurityApiResources22222222222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$c();
      if (OptionsUtilities22222222222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities22222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities22222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities22222222222222.getRedirectUri(),
          state,
          OptionsUtilities22222222222222.isUseCrypto()
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
      const crypto = useCryptoStore$c();
      if (OptionsUtilities22222222222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities22222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities22222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities22222222222222.isUseCrypto()).then((response) => {
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
const useRouterStore$c = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$c.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$c.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$c.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$c.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$c.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$c.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$c.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities22222222222222.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$c();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities22222222222222.getInstance().goBack();
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
var LayoutModeEnum$b = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$b || {});
var ThemeModeEnum$b = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$b || {});
var CaptchaCategoryEnum$b = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$b || {});
let OptionsUtilities$6 = class OptionsUtilities222222222222222 {
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
    if (OptionsUtilities222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities222222222222222._instance = new OptionsUtilities222222222222222(options);
    OptionsUtilities222222222222222._initialized = true;
    return OptionsUtilities222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities222222222222222._instance;
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
};
let RouterUtilities$6 = class RouterUtilities222222222222222 {
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
    if (RouterUtilities222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities222222222222222._instance = new RouterUtilities222222222222222(options);
    RouterUtilities222222222222222._initialized = true;
    return RouterUtilities222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities222222222222222._instance;
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
};
let OAuth2ApiService$6 = class OAuth2ApiService222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
};
let OpenApiService$6 = class OpenApiService222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService222222222222222(config);
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
    if (category === CaptchaCategoryEnum$b.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$b.JIGSAW) {
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
};
let PasskeyApiService$6 = class PasskeyApiService222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService222222222222222(config);
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
};
let SecurityApiResources$6 = class SecurityApiResources222222222222222 {
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
    if (SecurityApiResources222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources222222222222222._instance = new SecurityApiResources222222222222222(config);
    SecurityApiResources222222222222222._initialized = true;
    return SecurityApiResources222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$6.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$6.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$6.getInstance(this.config);
  }
};
const useCryptoStore$b = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$6.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$6.getSecurityKey());
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
        SecurityApiResources$6.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$6.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$6.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$b();
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
        SecurityApiResources$6.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$b();
      if (OptionsUtilities$6.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$6.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$6.isUseCrypto()).then((response) => {
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
        SecurityApiResources$6.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$6.isUseCrypto()).then((response) => {
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
        SecurityApiResources$6.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$6.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$6.getRedirectUri(),
          state,
          OptionsUtilities$6.isUseCrypto()
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
      const crypto = useCryptoStore$b();
      if (OptionsUtilities$6.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$6.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$6.isUseCrypto()).then((response) => {
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
        SecurityApiResources$6.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$6.isUseCrypto()).then((response) => {
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
        SecurityApiResources$6.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$6.isUseCrypto()).then((response) => {
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
const useRouterStore$b = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$b.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$b.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$b.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$b.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$b.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$b.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$b.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities$6.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$b();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$6.getInstance().goBack();
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
var LayoutModeEnum$a = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$a || {});
var ThemeModeEnum$a = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$a || {});
var CaptchaCategoryEnum$a = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$a || {});
class OptionsUtilities2222222222222222 {
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
    if (OptionsUtilities2222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities2222222222222222._instance = new OptionsUtilities2222222222222222(options);
    OptionsUtilities2222222222222222._initialized = true;
    return OptionsUtilities2222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities2222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities2222222222222222._instance;
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
class RouterUtilities2222222222222222 {
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
    if (RouterUtilities2222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities2222222222222222._instance = new RouterUtilities2222222222222222(options);
    RouterUtilities2222222222222222._initialized = true;
    return RouterUtilities2222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities2222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities2222222222222222._instance;
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
class OAuth2ApiService2222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService2222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
class OpenApiService2222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService2222222222222222(config);
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
    if (category === CaptchaCategoryEnum$a.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$a.JIGSAW) {
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
class PasskeyApiService2222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService2222222222222222(config);
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
class SecurityApiResources2222222222222222 {
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
    if (SecurityApiResources2222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources2222222222222222._instance = new SecurityApiResources2222222222222222(config);
    SecurityApiResources2222222222222222._initialized = true;
    return SecurityApiResources2222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources2222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources2222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService2222222222222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService2222222222222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService2222222222222222.getInstance(this.config);
  }
}
const useCryptoStore$a = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities2222222222222222.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities2222222222222222.getSecurityKey());
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
        SecurityApiResources2222222222222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources2222222222222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities2222222222222222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$a();
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
        SecurityApiResources2222222222222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$a();
      if (OptionsUtilities2222222222222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources2222222222222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities2222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities2222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources2222222222222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities2222222222222222.getRedirectUri(),
          state,
          OptionsUtilities2222222222222222.isUseCrypto()
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
      const crypto = useCryptoStore$a();
      if (OptionsUtilities2222222222222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources2222222222222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities2222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities2222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities2222222222222222.isUseCrypto()).then((response) => {
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
const useRouterStore$a = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$a.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$a.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$a.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$a.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$a.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$a.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$a.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities2222222222222222.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$a();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities2222222222222222.getInstance().goBack();
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
var LayoutModeEnum$9 = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$9 || {});
var ThemeModeEnum$9 = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$9 || {});
var CaptchaCategoryEnum$9 = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$9 || {});
let OptionsUtilities$5 = class OptionsUtilities22222222222222222 {
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
    if (OptionsUtilities22222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities22222222222222222._instance = new OptionsUtilities22222222222222222(options);
    OptionsUtilities22222222222222222._initialized = true;
    return OptionsUtilities22222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities22222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities22222222222222222._instance;
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
};
let RouterUtilities$5 = class RouterUtilities22222222222222222 {
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
    if (RouterUtilities22222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities22222222222222222._instance = new RouterUtilities22222222222222222(options);
    RouterUtilities22222222222222222._initialized = true;
    return RouterUtilities22222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities22222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities22222222222222222._instance;
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
};
let OAuth2ApiService$5 = class OAuth2ApiService22222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService22222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
};
let OpenApiService$5 = class OpenApiService22222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService22222222222222222(config);
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
    if (category === CaptchaCategoryEnum$9.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$9.JIGSAW) {
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
};
let PasskeyApiService$5 = class PasskeyApiService22222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService22222222222222222(config);
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
};
let SecurityApiResources$5 = class SecurityApiResources22222222222222222 {
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
    if (SecurityApiResources22222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources22222222222222222._instance = new SecurityApiResources22222222222222222(config);
    SecurityApiResources22222222222222222._initialized = true;
    return SecurityApiResources22222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources22222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources22222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$5.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$5.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$5.getInstance(this.config);
  }
};
const useCryptoStore$9 = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$5.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$5.getSecurityKey());
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
        SecurityApiResources$5.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$5.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$5.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$9();
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
        SecurityApiResources$5.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$9();
      if (OptionsUtilities$5.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$5.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$5.isUseCrypto()).then((response) => {
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
        SecurityApiResources$5.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$5.isUseCrypto()).then((response) => {
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
        SecurityApiResources$5.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$5.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$5.getRedirectUri(),
          state,
          OptionsUtilities$5.isUseCrypto()
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
      const crypto = useCryptoStore$9();
      if (OptionsUtilities$5.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$5.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$5.isUseCrypto()).then((response) => {
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
        SecurityApiResources$5.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$5.isUseCrypto()).then((response) => {
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
        SecurityApiResources$5.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$5.isUseCrypto()).then((response) => {
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
const useRouterStore$9 = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$9.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$9.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$9.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$9.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$9.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$9.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$9.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities$5.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$9();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$5.getInstance().goBack();
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
var LayoutModeEnum$8 = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$8 || {});
var ThemeModeEnum$8 = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$8 || {});
var CaptchaCategoryEnum$8 = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$8 || {});
class OptionsUtilities222222222222222222 {
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
    if (OptionsUtilities222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities222222222222222222._instance = new OptionsUtilities222222222222222222(options);
    OptionsUtilities222222222222222222._initialized = true;
    return OptionsUtilities222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities222222222222222222._instance;
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
class RouterUtilities222222222222222222 {
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
    if (RouterUtilities222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities222222222222222222._instance = new RouterUtilities222222222222222222(options);
    RouterUtilities222222222222222222._initialized = true;
    return RouterUtilities222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities222222222222222222._instance;
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
class OAuth2ApiService222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService222222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
class OpenApiService222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService222222222222222222(config);
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
    if (category === CaptchaCategoryEnum$8.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$8.JIGSAW) {
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
class PasskeyApiService222222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService222222222222222222(config);
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
class SecurityApiResources222222222222222222 {
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
    if (SecurityApiResources222222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources222222222222222222._instance = new SecurityApiResources222222222222222222(config);
    SecurityApiResources222222222222222222._initialized = true;
    return SecurityApiResources222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources222222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources222222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService222222222222222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService222222222222222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService222222222222222222.getInstance(this.config);
  }
}
const useCryptoStore$8 = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities222222222222222222.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities222222222222222222.getSecurityKey());
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
        SecurityApiResources222222222222222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources222222222222222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities222222222222222222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$8();
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
        SecurityApiResources222222222222222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$8();
      if (OptionsUtilities222222222222222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources222222222222222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources222222222222222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities222222222222222222.getRedirectUri(),
          state,
          OptionsUtilities222222222222222222.isUseCrypto()
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
      const crypto = useCryptoStore$8();
      if (OptionsUtilities222222222222222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources222222222222222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities222222222222222222.isUseCrypto()).then((response) => {
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
const useRouterStore$8 = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$8.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$8.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$8.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$8.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$8.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$8.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$8.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities222222222222222222.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$8();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities222222222222222222.getInstance().goBack();
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
var LayoutModeEnum$7 = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$7 || {});
var ThemeModeEnum$7 = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$7 || {});
var CaptchaCategoryEnum$7 = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$7 || {});
let OptionsUtilities$4 = class OptionsUtilities2222222222222222222 {
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
    if (OptionsUtilities2222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities2222222222222222222._instance = new OptionsUtilities2222222222222222222(options);
    OptionsUtilities2222222222222222222._initialized = true;
    return OptionsUtilities2222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities2222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities2222222222222222222._instance;
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
  static getPathRoot() {
    return this.getRouterOptions().path.root;
  }
  static getPathHome() {
    return this.getRouterOptions().path.home;
  }
  static getPathSignIn() {
    return this.getRouterOptions().path.signIn;
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
};
let RouterUtilities$4 = class RouterUtilities2222222222222222222 {
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
    if (RouterUtilities2222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities2222222222222222222._instance = new RouterUtilities2222222222222222222(options);
    RouterUtilities2222222222222222222._initialized = true;
    return RouterUtilities2222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities2222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities2222222222222222222._instance;
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
};
let OAuth2ApiService$4 = class OAuth2ApiService2222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService2222222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
};
let OpenApiService$4 = class OpenApiService2222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService2222222222222222222(config);
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
    if (category === CaptchaCategoryEnum$7.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$7.JIGSAW) {
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
};
let PasskeyApiService$4 = class PasskeyApiService2222222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService2222222222222222222(config);
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
};
let SecurityApiResources$4 = class SecurityApiResources2222222222222222222 {
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
    if (SecurityApiResources2222222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources2222222222222222222._instance = new SecurityApiResources2222222222222222222(config);
    SecurityApiResources2222222222222222222._initialized = true;
    return SecurityApiResources2222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources2222222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources2222222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$4.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$4.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$4.getInstance(this.config);
  }
};
const useCryptoStore$7 = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$4.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$4.getSecurityKey());
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
        SecurityApiResources$4.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$4.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$4.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$7();
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
        SecurityApiResources$4.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$7();
      if (OptionsUtilities$4.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$4.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$4.isUseCrypto()).then((response) => {
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
        SecurityApiResources$4.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$4.isUseCrypto()).then((response) => {
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
        SecurityApiResources$4.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$4.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$4.getRedirectUri(),
          state,
          OptionsUtilities$4.isUseCrypto()
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
      const crypto = useCryptoStore$7();
      if (OptionsUtilities$4.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$4.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$4.isUseCrypto()).then((response) => {
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
        SecurityApiResources$4.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$4.isUseCrypto()).then((response) => {
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
        SecurityApiResources$4.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$4.isUseCrypto()).then((response) => {
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
const useRouterStore$7 = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$7.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$7.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$7.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$7.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$7.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$7.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$7.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities$4.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$7();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$4.getInstance().goBack();
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
var LayoutModeEnum$6 = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$6 || {});
var ThemeModeEnum$6 = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$6 || {});
var CaptchaCategoryEnum$6 = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$6 || {});
class OptionsUtilities22222222222222222222 {
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
    if (OptionsUtilities22222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities22222222222222222222._instance = new OptionsUtilities22222222222222222222(options);
    OptionsUtilities22222222222222222222._initialized = true;
    return OptionsUtilities22222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities22222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities22222222222222222222._instance;
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
    return this.getRouter().getRoutes();
  }
  static getPathRoot() {
    return this.getRouterOptions().path.root;
  }
  static getPathHome() {
    return this.getRouterOptions().path.home;
  }
  static getPathSignIn() {
    return this.getRouterOptions().path.signIn;
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
class RouterUtilities22222222222222222222 {
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
    if (RouterUtilities22222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities22222222222222222222._instance = new RouterUtilities22222222222222222222(options);
    RouterUtilities22222222222222222222._initialized = true;
    return RouterUtilities22222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities22222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities22222222222222222222._instance;
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
class OAuth2ApiService22222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService22222222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
class OpenApiService22222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService22222222222222222222(config);
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
    if (category === CaptchaCategoryEnum$6.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$6.JIGSAW) {
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
class PasskeyApiService22222222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService22222222222222222222(config);
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
class SecurityApiResources22222222222222222222 {
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
    if (SecurityApiResources22222222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources22222222222222222222._instance = new SecurityApiResources22222222222222222222(config);
    SecurityApiResources22222222222222222222._initialized = true;
    return SecurityApiResources22222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources22222222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources22222222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService22222222222222222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService22222222222222222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService22222222222222222222.getInstance(this.config);
  }
}
const useCryptoStore$6 = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities22222222222222222222.getSecurityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities22222222222222222222.getSecurityKey());
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
        SecurityApiResources22222222222222222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources22222222222222222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities22222222222222222222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$6();
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
        SecurityApiResources22222222222222222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$6();
      if (OptionsUtilities22222222222222222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222222222222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities22222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities22222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222222222222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities22222222222222222222.getRedirectUri(),
          state,
          OptionsUtilities22222222222222222222.isUseCrypto()
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
      const crypto = useCryptoStore$6();
      if (OptionsUtilities22222222222222222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222222222222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities22222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities22222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities22222222222222222222.isUseCrypto()).then((response) => {
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
const useRouterStore$6 = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$6.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$6.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$6.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$6.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$6.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$6.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$6.CLASSIC
  }
});
defineStore("TabsView", {
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
      return lodash.findIndex(OptionsUtilities22222222222222222222.getRoutes(), (item) => item.path === tab.path) === -1;
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
      const store = useRouterStore$6();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities22222222222222222222.getInstance().goBack();
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
var LayoutModeEnum$5 = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$5 || {});
var ThemeModeEnum$5 = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$5 || {});
var CaptchaCategoryEnum$5 = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$5 || {});
let OptionsUtilities$3 = class OptionsUtilities222222222222222222222 {
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
    if (OptionsUtilities222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities222222222222222222222._instance = new OptionsUtilities222222222222222222222(options);
    OptionsUtilities222222222222222222222._initialized = true;
    return OptionsUtilities222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities222222222222222222222._instance;
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
  static securityKey() {
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
};
let RouterUtilities$3 = class RouterUtilities222222222222222222222 {
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
    if (RouterUtilities222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities222222222222222222222._instance = new RouterUtilities222222222222222222222(options);
    RouterUtilities222222222222222222222._initialized = true;
    return RouterUtilities222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities222222222222222222222._instance;
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
};
let OAuth2ApiService$3 = class OAuth2ApiService222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService222222222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
};
let OpenApiService$3 = class OpenApiService222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService222222222222222222222(config);
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
    if (category === CaptchaCategoryEnum$5.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$5.JIGSAW) {
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
};
let PasskeyApiService$3 = class PasskeyApiService222222222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService222222222222222222222(config);
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
};
let SecurityApiResources$3 = class SecurityApiResources222222222222222222222 {
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
    if (SecurityApiResources222222222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources222222222222222222222._instance = new SecurityApiResources222222222222222222222(config);
    SecurityApiResources222222222222222222222._initialized = true;
    return SecurityApiResources222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources222222222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources222222222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$3.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$3.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$3.getInstance(this.config);
  }
};
const useCryptoStore$5 = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$3.securityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$3.securityKey());
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
        SecurityApiResources$3.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$3.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$3.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$5();
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
        SecurityApiResources$3.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$5();
      if (OptionsUtilities$3.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$3.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$3.isUseCrypto()).then((response) => {
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
        SecurityApiResources$3.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$3.isUseCrypto()).then((response) => {
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
        SecurityApiResources$3.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$3.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$3.getRedirectUri(),
          state,
          OptionsUtilities$3.isUseCrypto()
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
      const crypto = useCryptoStore$5();
      if (OptionsUtilities$3.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$3.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$3.isUseCrypto()).then((response) => {
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
        SecurityApiResources$3.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$3.isUseCrypto()).then((response) => {
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
        SecurityApiResources$3.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$3.isUseCrypto()).then((response) => {
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
const useRouterStore$5 = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$5.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$5.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$5.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$5.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$5.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$5.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$5.CLASSIC
  }
});
defineStore("TabsView", {
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
        OptionsUtilities$3.getInstance().getOptions().staticRoutes,
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
      const store = useRouterStore$5();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$3.getInstance().goBack();
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
var LayoutModeEnum$4 = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$4 || {});
var ThemeModeEnum$4 = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$4 || {});
var CaptchaCategoryEnum$4 = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$4 || {});
class OptionsUtilities2222222222222222222222 {
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
    if (OptionsUtilities2222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities2222222222222222222222._instance = new OptionsUtilities2222222222222222222222(options);
    OptionsUtilities2222222222222222222222._initialized = true;
    return OptionsUtilities2222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities2222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities2222222222222222222222._instance;
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
  static getTenantId() {
    return this.getInstance().getOptions().tenantId;
  }
}
class RouterUtilities2222222222222222222222 {
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
    if (RouterUtilities2222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities2222222222222222222222._instance = new RouterUtilities2222222222222222222222(options);
    RouterUtilities2222222222222222222222._initialized = true;
    return RouterUtilities2222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities2222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities2222222222222222222222._instance;
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
class OAuth2ApiService2222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService2222222222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
class OpenApiService2222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService2222222222222222222222(config);
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
    if (category === CaptchaCategoryEnum$4.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$4.JIGSAW) {
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
class PasskeyApiService2222222222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService2222222222222222222222(config);
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
class SecurityApiResources2222222222222222222222 {
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
    if (SecurityApiResources2222222222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources2222222222222222222222._instance = new SecurityApiResources2222222222222222222222(config);
    SecurityApiResources2222222222222222222222._initialized = true;
    return SecurityApiResources2222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources2222222222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources2222222222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService2222222222222222222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService2222222222222222222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService2222222222222222222222.getInstance(this.config);
  }
}
const useCryptoStore$4 = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities2222222222222222222222.securityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities2222222222222222222222.securityKey());
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
        SecurityApiResources2222222222222222222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources2222222222222222222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities2222222222222222222222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$4();
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
        SecurityApiResources2222222222222222222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$4();
      if (OptionsUtilities2222222222222222222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources2222222222222222222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities2222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222222222222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities2222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222222222222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources2222222222222222222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities2222222222222222222222.getRedirectUri(),
          state,
          OptionsUtilities2222222222222222222222.isUseCrypto()
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
      const crypto = useCryptoStore$4();
      if (OptionsUtilities2222222222222222222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources2222222222222222222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities2222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222222222222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities2222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222222222222222222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities2222222222222222222222.isUseCrypto()).then((response) => {
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
const useRouterStore$4 = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$4.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$4.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$4.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$4.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$4.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$4.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$4.CLASSIC
  }
});
defineStore("TabsView", {
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
        OptionsUtilities2222222222222222222222.getInstance().getOptions().staticRoutes,
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
      const store = useRouterStore$4();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities2222222222222222222222.getInstance().goBack();
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
var LayoutModeEnum$3 = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$3 || {});
var ThemeModeEnum$3 = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$3 || {});
var CaptchaCategoryEnum$3 = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$3 || {});
let OptionsUtilities$2 = class OptionsUtilities22222222222222222222222 {
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
    if (OptionsUtilities22222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities22222222222222222222222._instance = new OptionsUtilities22222222222222222222222(options);
    OptionsUtilities22222222222222222222222._initialized = true;
    return OptionsUtilities22222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities22222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities22222222222222222222222._instance;
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
  static getTenantId() {
    return this.getInstance().getOptions().tenantId;
  }
};
let RouterUtilities$2 = class RouterUtilities22222222222222222222222 {
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
    if (RouterUtilities22222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities22222222222222222222222._instance = new RouterUtilities22222222222222222222222(options);
    RouterUtilities22222222222222222222222._initialized = true;
    return RouterUtilities22222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities22222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities22222222222222222222222._instance;
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
};
let OAuth2ApiService$2 = class OAuth2ApiService22222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService22222222222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
};
let OpenApiService$2 = class OpenApiService22222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService22222222222222222222222(config);
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
    if (category === CaptchaCategoryEnum$3.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$3.JIGSAW) {
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
};
let PasskeyApiService$2 = class PasskeyApiService22222222222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService22222222222222222222222(config);
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
};
let SecurityApiResources$2 = class SecurityApiResources22222222222222222222222 {
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
    if (SecurityApiResources22222222222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources22222222222222222222222._instance = new SecurityApiResources22222222222222222222222(config);
    SecurityApiResources22222222222222222222222._initialized = true;
    return SecurityApiResources22222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources22222222222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources22222222222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$2.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$2.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$2.getInstance(this.config);
  }
};
const useCryptoStore$3 = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$2.securityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$2.securityKey());
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
        SecurityApiResources$2.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$2.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$2.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$3();
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
        SecurityApiResources$2.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$3();
      if (OptionsUtilities$2.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$2.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$2.isUseCrypto()).then((response) => {
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
        SecurityApiResources$2.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$2.isUseCrypto()).then((response) => {
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
        SecurityApiResources$2.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$2.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$2.getRedirectUri(),
          state,
          OptionsUtilities$2.isUseCrypto()
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
      const crypto = useCryptoStore$3();
      if (OptionsUtilities$2.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$2.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$2.isUseCrypto()).then((response) => {
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
        SecurityApiResources$2.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$2.isUseCrypto()).then((response) => {
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
        SecurityApiResources$2.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$2.isUseCrypto()).then((response) => {
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
const useRouterStore$3 = defineStore("Router", {
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
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$3.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$3.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$3.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$3.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$3.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$3.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$3.CLASSIC
  }
});
defineStore("TabsView", {
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
        OptionsUtilities$2.getInstance().getOptions().staticRoutes,
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
      const store = useRouterStore$3();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$2.getInstance().goBack();
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
var LayoutModeEnum$2 = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$2 || {});
var ThemeModeEnum$2 = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$2 || {});
var CaptchaCategoryEnum$2 = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$2 || {});
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$2.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$2.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$2.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$2.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$2.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$2.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$2.CLASSIC
  }
});
const useRouterStore$2 = defineStore("Router", {
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
class OptionsUtilities222222222222222222222222 {
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
    if (OptionsUtilities222222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities222222222222222222222222._instance = new OptionsUtilities222222222222222222222222(options);
    OptionsUtilities222222222222222222222222._initialized = true;
    return OptionsUtilities222222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities222222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities222222222222222222222222._instance;
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
class RouterUtilities222222222222222222222222 {
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
    if (RouterUtilities222222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities222222222222222222222222._instance = new RouterUtilities222222222222222222222222(options);
    RouterUtilities222222222222222222222222._initialized = true;
    return RouterUtilities222222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities222222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities222222222222222222222222._instance;
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
defineStore("TabsView", {
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
        OptionsUtilities222222222222222222222222.getInstance().getOptions().staticRoutes,
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
      const store = useRouterStore$2();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities222222222222222222222222.getInstance().goBack();
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
class OAuth2ApiService222222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService222222222222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
class OpenApiService222222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService222222222222222222222222(config);
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
    if (category === CaptchaCategoryEnum$2.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$2.JIGSAW) {
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
class PasskeyApiService222222222222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService222222222222222222222222(config);
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
class SecurityApiResources222222222222222222222222 {
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
    if (SecurityApiResources222222222222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources222222222222222222222222._instance = new SecurityApiResources222222222222222222222222(config);
    SecurityApiResources222222222222222222222222._initialized = true;
    return SecurityApiResources222222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources222222222222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources222222222222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService222222222222222222222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService222222222222222222222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService222222222222222222222222.getInstance(this.config);
  }
}
const useCryptoStore$2 = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities222222222222222222222222.securityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities222222222222222222222222.securityKey());
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
        SecurityApiResources222222222222222222222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources222222222222222222222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities222222222222222222222222.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$2();
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
        SecurityApiResources222222222222222222222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$2();
      if (OptionsUtilities222222222222222222222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources222222222222222222222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities222222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222222222222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities222222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222222222222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources222222222222222222222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities222222222222222222222222.getRedirectUri(),
          state,
          OptionsUtilities222222222222222222222222.isUseCrypto()
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
      const crypto = useCryptoStore$2();
      if (OptionsUtilities222222222222222222222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources222222222222222222222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities222222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222222222222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities222222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources222222222222222222222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities222222222222222222222222.isUseCrypto()).then((response) => {
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
var LayoutModeEnum$1 = /* @__PURE__ */ ((LayoutModeEnum2) => {
  LayoutModeEnum2["DEFAULT"] = "defaults";
  LayoutModeEnum2["CLASSIC"] = "classic";
  LayoutModeEnum2["TRANSVERSE"] = "transverse";
  LayoutModeEnum2["COLUMNS"] = "transverse";
  return LayoutModeEnum2;
})(LayoutModeEnum$1 || {});
var ThemeModeEnum$1 = /* @__PURE__ */ ((ThemeModeEnum2) => {
  ThemeModeEnum2["DARK"] = "dark";
  ThemeModeEnum2["LIGHT"] = "light";
  ThemeModeEnum2["SYSTEM"] = "system";
  return ThemeModeEnum2;
})(ThemeModeEnum$1 || {});
var CaptchaCategoryEnum$1 = /* @__PURE__ */ ((CaptchaCategoryEnum2) => {
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
})(CaptchaCategoryEnum$1 || {});
defineStore("GlobalSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: ThemeModeEnum$1.LIGHT,
      // 默认 primary 主题颜色
      primary: "#1867c0"
    },
    /**
     * 布局切换
     */
    layout: LayoutModeEnum$1.DEFAULT,
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
    isDark: (state) => state.theme.mode === ThemeModeEnum$1.DARK,
    isLight: (state) => state.theme.mode === ThemeModeEnum$1.LIGHT,
    isSystem: (state) => state.theme.mode === ThemeModeEnum$1.SYSTEM,
    isDefaultLayout: (state) => state.layout === LayoutModeEnum$1.DEFAULT,
    isClassicLayout: (state) => state.layout === LayoutModeEnum$1.CLASSIC
  }
});
const useRouterStore$1 = defineStore("Router", {
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
let OptionsUtilities$1 = class OptionsUtilities2222222222222222222222222 {
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
    if (OptionsUtilities2222222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities2222222222222222222222222._instance = new OptionsUtilities2222222222222222222222222(options);
    OptionsUtilities2222222222222222222222222._initialized = true;
    return OptionsUtilities2222222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities2222222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities2222222222222222222222222._instance;
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
};
let RouterUtilities$1 = class RouterUtilities2222222222222222222222222 {
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
    if (RouterUtilities2222222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities2222222222222222222222222._instance = new RouterUtilities2222222222222222222222222(options);
    RouterUtilities2222222222222222222222222._initialized = true;
    return RouterUtilities2222222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities2222222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities2222222222222222222222222._instance;
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
};
defineStore("TabsView", {
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
        OptionsUtilities$1.getInstance().getOptions().staticRoutes,
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
      const store = useRouterStore$1();
      const isDetailRoute = store.isDetailRoute(route);
      const tab = this.convertRouteToTab(route);
      if (isDetailRoute) {
        if (store.hasParameter(route)) {
          this.openTab(tab, isDetailRoute);
        } else {
          this.closeTab(tab);
          RouterUtilities$1.getInstance().goBack();
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
let OAuth2ApiService$1 = class OAuth2ApiService2222222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService2222222222222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
};
let OpenApiService$1 = class OpenApiService2222222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService2222222222222222222222222(config);
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
    if (category === CaptchaCategoryEnum$1.WORD_CLICK) {
      verify.coordinates = data;
    } else if (category === CaptchaCategoryEnum$1.JIGSAW) {
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
};
let PasskeyApiService$1 = class PasskeyApiService2222222222222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService2222222222222222222222222(config);
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
};
let SecurityApiResources$1 = class SecurityApiResources2222222222222222222222222 {
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
    if (SecurityApiResources2222222222222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources2222222222222222222222222._instance = new SecurityApiResources2222222222222222222222222(config);
    SecurityApiResources2222222222222222222222222._initialized = true;
    return SecurityApiResources2222222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources2222222222222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources2222222222222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService$1.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService$1.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService$1.getInstance(this.config);
  }
};
const useCryptoStore$1 = defineStore("Crypto", {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities$1.securityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities$1.securityKey());
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
        SecurityApiResources$1.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources$1.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities$1.isAutoRefreshToken()) {
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
        const crypto = useCryptoStore$1();
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
        SecurityApiResources$1.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$1();
      if (OptionsUtilities$1.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$1.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities$1.isUseCrypto()).then((response) => {
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
        SecurityApiResources$1.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities$1.isUseCrypto()).then((response) => {
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
        SecurityApiResources$1.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources$1.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities$1.getRedirectUri(),
          state,
          OptionsUtilities$1.isUseCrypto()
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
      const crypto = useCryptoStore$1();
      if (OptionsUtilities$1.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources$1.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities$1.isUseCrypto()).then((response) => {
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
        SecurityApiResources$1.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities$1.isUseCrypto()).then((response) => {
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
        SecurityApiResources$1.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities$1.isUseCrypto()).then((response) => {
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
defineStore("GlobalSettings", {
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
class OptionsUtilities22222222222222222222222222 {
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
    if (OptionsUtilities22222222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    OptionsUtilities22222222222222222222222222._instance = new OptionsUtilities22222222222222222222222222(options);
    OptionsUtilities22222222222222222222222222._initialized = true;
    return OptionsUtilities22222222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!OptionsUtilities22222222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return OptionsUtilities22222222222222222222222222._instance;
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
class RouterUtilities22222222222222222222222222 {
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
    if (RouterUtilities22222222222222222222222222._initialized) {
      throw new Error("RouterUtilities has already been initialized");
    }
    RouterUtilities22222222222222222222222222._instance = new RouterUtilities22222222222222222222222222(options);
    RouterUtilities22222222222222222222222222._initialized = true;
    return RouterUtilities22222222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!RouterUtilities22222222222222222222222222._instance) {
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    }
    return RouterUtilities22222222222222222222222222._instance;
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
defineStore("TabsView", {
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
        OptionsUtilities22222222222222222222222222.getInstance().getOptions().staticRoutes,
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
          RouterUtilities22222222222222222222222222.getInstance().goBack();
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
class OAuth2ApiService22222222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApiService22222222222222222222222222(config);
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
        grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN,
        scope: "openid"
      } : { refresh_token: refreshToken, grant_type: AuthorizationGrantTypeEnum.REFRESH_TOKEN },
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
        grant_type: AuthorizationGrantTypeEnum.PASSWORD,
        scope: "openid"
      } : {
        username,
        password,
        grant_type: AuthorizationGrantTypeEnum.PASSWORD
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
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE,
        scope: "openid"
      } : {
        code,
        state,
        redirect_uri,
        grant_type: AuthorizationGrantTypeEnum.AUTHORIZATION_CODE
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source: "SMS",
        scope: "openid"
      } : {
        mobile,
        code,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
        source,
        scope: "openid"
      } : {
        ...accessPrincipal,
        grant_type: AuthorizationGrantTypeEnum.SOCIAL_CREDENTIALS,
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
      oidc ? { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS, scope: "openid" } : { grant_type: AuthorizationGrantTypeEnum.WEBAUTHN_CREDENTIALS },
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
class OpenApiService22222222222222222222222222 {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OpenApiService22222222222222222222222222(config);
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
class PasskeyApiService22222222222222222222222222 extends Service {
  // 静态私有实例引用
  static instance = null;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new PasskeyApiService22222222222222222222222222(config);
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
class SecurityApiResources22222222222222222222222222 {
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
    if (SecurityApiResources22222222222222222222222222._initialized) {
      throw new Error("SecurityApiResources has already been initialized");
    }
    SecurityApiResources22222222222222222222222222._instance = new SecurityApiResources22222222222222222222222222(config);
    SecurityApiResources22222222222222222222222222._initialized = true;
    return SecurityApiResources22222222222222222222222222._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!SecurityApiResources22222222222222222222222222._instance) {
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    }
    return SecurityApiResources22222222222222222222222222._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return OpenApiService22222222222222222222222222.getInstance(this.config);
  }
  oauth2() {
    return OAuth2ApiService22222222222222222222222222.getInstance(this.config);
  }
  passkey() {
    return PasskeyApiService22222222222222222222222222.getInstance(this.config);
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities22222222222222222222222222.securityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities22222222222222222222222222.securityKey());
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
        SecurityApiResources22222222222222222222222222.getInstance().open().createSession(identity).then((response) => {
          const data = response.data;
          if (data) {
            const sessionId = data.sessionId;
            const backendPublicKey = data.publicKey;
            this.state = data.state;
            const pair = SM2Utils.createKeyPair();
            const encryptData = SM2Utils.encrypt(pair.publicKey, backendPublicKey);
            SecurityApiResources22222222222222222222222222.getInstance().open().exchange(sessionId, encryptData).then((response2) => {
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
defineStore("Authentication", {
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
      if (OptionsUtilities22222222222222222222222222.isAutoRefreshToken()) {
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
        SecurityApiResources22222222222222222222222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore();
      if (OptionsUtilities22222222222222222222222222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222222222222222222222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities22222222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222222222222222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities22222222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222222222222222.getInstance().oauth2().signOut(this.access_token).then(() => {
          console.log("Server side sign out successfully.");
        }).catch((error) => {
          console.log("Server side sign out has error.", error);
        });
      }
    },
    authorizationCode(code, state = "") {
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222222222222222222222.getInstance().oauth2().authorizationCodeFlow(
          code,
          OptionsUtilities22222222222222222222222222.getRedirectUri(),
          state,
          OptionsUtilities22222222222222222222222222.isUseCrypto()
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
      if (OptionsUtilities22222222222222222222222222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22222222222222222222222222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities22222222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222222222222222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities22222222222222222222222222.isUseCrypto()).then((response) => {
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
        SecurityApiResources22222222222222222222222222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities22222222222222222222222222.isUseCrypto()).then((response) => {
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
function useQuasarMenu() {
  const store = useRouterStore$p();
  const authentication = useAuthenticationStore$1();
  const getItemTitle = (item) => {
    return item.meta?.title;
  };
  const getItemIcon = (item) => {
    return item.meta?.icon;
  };
  const getItemHideAllChild = (item) => {
    return item.meta?.isHideAllChild;
  };
  const getItemChildren = (item) => {
    return item.children;
  };
  const hasChildren = (item) => {
    return !!getItemChildren(item);
  };
  const hasPermission = (item) => {
    const userRoles = authentication.roles;
    const routeRoles = item.meta?.roles;
    if (lodash.isEmpty(routeRoles)) {
      return true;
    }
    if (lodash.isEmpty(userRoles)) {
      return false;
    }
    const result = lodash.intersection(userRoles, routeRoles);
    if (lodash.isEmpty(result)) {
      return false;
    } else {
      return true;
    }
  };
  const isDisplayAsItem = (item) => {
    if (!hasChildren(item)) {
      return true;
    } else {
      if (getItemHideAllChild(item)) {
        store.addDetailRoutes(item);
        return true;
      } else {
        return false;
      }
    }
  };
  return {
    hasPermission,
    getItemTitle,
    getItemIcon,
    getItemChildren,
    isDisplayAsItem
  };
}
function useVuetifyMenu() {
  const findAvailableRoutes = (routes) => {
    return routes.filter((item) => {
      return lodash.isEmpty(item.name);
    });
  };
  const findRouteElement = (item) => {
    if (!lodash.isEmpty(item.children)) {
      const data = item.children;
      return data[0];
    } else {
      return item;
    }
  };
  const toLeaf = (item) => {
    return {
      title: item.meta?.title,
      prependIcon: item.meta?.icon,
      to: item.name
    };
  };
  const convert2 = (routes) => {
    return routes.map((item) => {
      const element = findRouteElement(item);
      if (lodash.isEmpty(element.children)) {
        return toLeaf(element);
      } else {
        const [root, leaf] = lodash.partition(
          element.children,
          (router) => lodash.isEmpty(router.path)
        );
        const route = root[0];
        return {
          title: route.meta?.title,
          prependIcon: route.meta?.icon,
          children: leaf.map((l) => toLeaf(l))
        };
      }
    });
  };
  const getMenuItems = () => {
    const routers = RouterUtilities.getInstance().getRouter().getRoutes();
    const available = findAvailableRoutes(routers);
    return convert2(available);
  };
  return {
    getMenuItems
  };
}
function base64urlToBuffer(baseurl64String) {
  const padding = "==".slice(0, (4 - baseurl64String.length % 4) % 4);
  const base64String = baseurl64String.replace(/-/g, "+").replace(/_/g, "/") + padding;
  const str = atob(base64String);
  const buffer = new ArrayBuffer(str.length);
  const byteView = new Uint8Array(buffer);
  for (let i = 0; i < str.length; i++) {
    byteView[i] = str.charCodeAt(i);
  }
  return buffer;
}
function bufferToBase64url(buffer) {
  const byteView = new Uint8Array(buffer);
  let str = "";
  for (const charCode of byteView) {
    str += String.fromCharCode(charCode);
  }
  const base64String = btoa(str);
  const base64urlString = base64String.replace(/\+/g, "-").replace(
    /\//g,
    "_"
  ).replace(/=/g, "");
  return base64urlString;
}
var copyValue = "copy";
var convertValue = "convert";
function convert(conversionFn, schema, input) {
  if (schema === copyValue) {
    return input;
  }
  if (schema === convertValue) {
    return conversionFn(input);
  }
  if (schema instanceof Array) {
    return input.map((v) => convert(conversionFn, schema[0], v));
  }
  if (schema instanceof Object) {
    const output = {};
    for (const [key, schemaField] of Object.entries(schema)) {
      if (schemaField.derive) {
        const v = schemaField.derive(input);
        if (v !== void 0) {
          input[key] = v;
        }
      }
      if (!(key in input)) {
        if (schemaField.required) {
          throw new Error(`Missing key: ${key}`);
        }
        continue;
      }
      if (input[key] == null) {
        output[key] = null;
        continue;
      }
      output[key] = convert(
        conversionFn,
        schemaField.schema,
        input[key]
      );
    }
    return output;
  }
}
function derived(schema, derive) {
  return {
    required: true,
    schema,
    derive
  };
}
function required(schema) {
  return {
    required: true,
    schema
  };
}
function optional(schema) {
  return {
    required: false,
    schema
  };
}
var publicKeyCredentialDescriptorSchema = {
  type: required(copyValue),
  id: required(convertValue),
  transports: optional(copyValue)
};
var simplifiedExtensionsSchema = {
  appid: optional(copyValue),
  appidExclude: optional(copyValue),
  credProps: optional(copyValue)
};
var simplifiedClientExtensionResultsSchema = {
  appid: optional(copyValue),
  appidExclude: optional(copyValue),
  credProps: optional(copyValue)
};
var credentialCreationOptions = {
  publicKey: required({
    rp: required(copyValue),
    user: required({
      id: required(convertValue),
      name: required(copyValue),
      displayName: required(copyValue)
    }),
    challenge: required(convertValue),
    pubKeyCredParams: required(copyValue),
    timeout: optional(copyValue),
    excludeCredentials: optional([publicKeyCredentialDescriptorSchema]),
    authenticatorSelection: optional(copyValue),
    attestation: optional(copyValue),
    extensions: optional(simplifiedExtensionsSchema)
  }),
  signal: optional(copyValue)
};
var publicKeyCredentialWithAttestation = {
  type: required(copyValue),
  id: required(copyValue),
  rawId: required(convertValue),
  authenticatorAttachment: optional(copyValue),
  response: required({
    clientDataJSON: required(convertValue),
    attestationObject: required(convertValue),
    transports: derived(
      copyValue,
      (response) => {
        var _a;
        return ((_a = response.getTransports) == null ? void 0 : _a.call(response)) || [];
      }
    )
  }),
  clientExtensionResults: derived(
    simplifiedClientExtensionResultsSchema,
    (pkc) => pkc.getClientExtensionResults()
  )
};
var credentialRequestOptions = {
  mediation: optional(copyValue),
  publicKey: required({
    challenge: required(convertValue),
    timeout: optional(copyValue),
    rpId: optional(copyValue),
    allowCredentials: optional([publicKeyCredentialDescriptorSchema]),
    userVerification: optional(copyValue),
    extensions: optional(simplifiedExtensionsSchema)
  }),
  signal: optional(copyValue)
};
var publicKeyCredentialWithAssertion = {
  type: required(copyValue),
  id: required(copyValue),
  rawId: required(convertValue),
  authenticatorAttachment: optional(copyValue),
  response: required({
    clientDataJSON: required(convertValue),
    authenticatorData: required(convertValue),
    signature: required(convertValue),
    userHandle: required(convertValue)
  }),
  clientExtensionResults: derived(
    simplifiedClientExtensionResultsSchema,
    (pkc) => pkc.getClientExtensionResults()
  )
};
function createRequestFromJSON(requestJSON) {
  return convert(base64urlToBuffer, credentialCreationOptions, requestJSON);
}
function createResponseToJSON(credential) {
  return convert(
    bufferToBase64url,
    publicKeyCredentialWithAttestation,
    credential
  );
}
function getRequestFromJSON(requestJSON) {
  return convert(base64urlToBuffer, credentialRequestOptions, requestJSON);
}
function getResponseToJSON(credential) {
  return convert(
    bufferToBase64url,
    publicKeyCredentialWithAssertion,
    credential
  );
}
async function create(options) {
  const response = await navigator.credentials.create(
    options
  );
  response.toJSON = () => createResponseToJSON(response);
  return response;
}
async function get(options) {
  const response = await navigator.credentials.get(
    options
  );
  response.toJSON = () => getResponseToJSON(response);
  return response;
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
        const registrationOptions = createRequestFromJSON({
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
        const authenticationOptions = getRequestFromJSON({
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
function useSystemRoute(routeModules, vueModules, locate, getRoutesFromServer) {
  const convert2 = (data) => {
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
      if (!lodash.isEmpty(item.children)) {
        raw.children = convert2(item.children);
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
    const store = useRouterStore$q();
    console.log("[Herodotus] |- Begin add dynamic routes");
    if (!lodash.isEmpty(routes)) {
      store.addDynamicRoutes(routes);
      dynamicAddRoutes(router, routes);
    } else {
      console.warn("[Herodotus] |- Dynamic routes is empty, skip!");
    }
  };
  const initBackEndRoutes = async (router) => {
    const response = await getRoutesFromServer();
    const routeData = response.data;
    const routes = convert2(routeData);
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
function useSystemTheme() {
  let media;
  const settings = useSettingsStore();
  const systemTheme = shallowRef(ThemeModeEnum$q.DARK);
  const IN_BROWSER = typeof window !== "undefined";
  const getMatchMedia = () => {
    if (!IN_BROWSER) return;
    return window.matchMedia("(prefers-color-scheme: dark)");
  };
  const onThemeChange = () => {
    systemTheme.value = media.matches ? ThemeModeEnum$q.DARK : ThemeModeEnum$q.LIGHT;
  };
  watch(
    () => settings.theme.mode,
    (val) => {
      if (val === ThemeModeEnum$q.SYSTEM) {
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
  SignOutUtilities.initialize(options.signOutExtension);
};
export {
  CaptchaCategoryEnum$q as CaptchaCategoryEnum,
  LayoutModeEnum$q as LayoutModeEnum,
  OptionsUtilities,
  RouterUtilities,
  SecurityApiResources,
  SignOutUtilities,
  SocialSourceEnum,
  ThemeModeEnum$q as ThemeModeEnum,
  getSystemHeaders,
  initializer,
  useApplicationStore,
  useAuthenticationStore,
  useCryptoStore$q as useCryptoStore,
  useDeviceAuthorize,
  useEditFinish,
  useQuasarMenu as useMenuForQuasar,
  useVuetifyMenu as useMenuForVuetify,
  usePasskey,
  useRouterStore$q as useRouterStore,
  useSettingsStore,
  useSystemRoute,
  useSystemTheme,
  useTabsViewStore
};
