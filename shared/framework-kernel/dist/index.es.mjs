import { useRoute } from "vue-router";
import { defineStore } from "pinia";
import { lodash, Base64, ContentTypeEnum, AuthorizationGrantTypeEnum as AuthorizationGrantTypeEnum$1, Service, SM2Utils, SM4Utils, moment, AuthorizationTokenEnum } from "@herodotus-cloud/core";
import { jwtDecode } from "jwt-decode";
import { nextTick, shallowRef, watch, computed } from "vue";
import "pinia-plugin-persistedstate";
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
        SecurityApiResources.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$6();
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
      const crypto = useCryptoStore$6();
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
const clearKernelPersistData = () => {
  console.log("Clear Framework Kernel Data");
  useAuthenticationStore().$reset();
  useCryptoStore$6().$reset();
};
const getSystemHeaders = () => {
  const authentication = useAuthenticationStore();
  const crypto = useCryptoStore$6();
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
const useSettingsStore = defineStore("GlobalSettings", {
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
      const store = useRouterStore$6();
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
  const routeStore = useRouterStore$6();
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
let OptionsUtilities$3 = class OptionsUtilities2 {
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
let RouterUtilities$3 = class RouterUtilities2 {
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
let OAuth2ApiService$3 = class OAuth2ApiService2 {
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
};
let OpenApiService$3 = class OpenApiService2 {
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
let PasskeyApiService$3 = class PasskeyApiService2 extends Service {
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
let SecurityApiResources$3 = class SecurityApiResources2 {
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities22.securityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities22.securityKey());
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
        SecurityApiResources22.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$4();
      if (OptionsUtilities22.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities22.isUseCrypto()).then((response) => {
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
        SecurityApiResources22.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities22.isUseCrypto()).then((response) => {
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
      if (OptionsUtilities22.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources22.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities22.isUseCrypto()).then((response) => {
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
        SecurityApiResources22.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities22.isUseCrypto()).then((response) => {
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
        SecurityApiResources22.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities22.isUseCrypto()).then((response) => {
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
        OptionsUtilities22.getInstance().getOptions().staticRoutes,
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
let OptionsUtilities$2 = class OptionsUtilities222 {
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
let RouterUtilities$2 = class RouterUtilities222 {
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
let OAuth2ApiService$2 = class OAuth2ApiService222 {
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
};
let OpenApiService$2 = class OpenApiService222 {
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
let PasskeyApiService$2 = class PasskeyApiService222 extends Service {
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
let SecurityApiResources$2 = class SecurityApiResources222 {
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
        OptionsUtilities2222.getInstance().getOptions().staticRoutes,
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities2222.securityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities2222.securityKey());
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
        SecurityApiResources2222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore$2();
      if (OptionsUtilities2222.isUseCrypto()) {
        username = crypto.encrypt(username);
        password = crypto.encrypt(password);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources2222.getInstance().oauth2().passwordFlow(username, password, OptionsUtilities2222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222.getInstance().oauth2().refreshTokenFlow(this.refresh_token, OptionsUtilities2222.isUseCrypto()).then((response) => {
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
      if (OptionsUtilities2222.isUseCrypto()) {
        mobile = crypto.encrypt(mobile);
        code = crypto.encrypt(code);
      }
      return new Promise((resolve, reject) => {
        SecurityApiResources2222.getInstance().oauth2().socialCredentialsFlowBySms(mobile, code, OptionsUtilities2222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222.getInstance().oauth2().socialCredentialsFlowByJustAuth(source, accessPrincipal, OptionsUtilities2222.isUseCrypto()).then((response) => {
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
        SecurityApiResources2222.getInstance().oauth2().webAuthnCredentialsFlow(publicKey, OptionsUtilities2222.isUseCrypto()).then((response) => {
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
let OptionsUtilities$1 = class OptionsUtilities22222 {
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
let RouterUtilities$1 = class RouterUtilities22222 {
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
let OAuth2ApiService$1 = class OAuth2ApiService22222 {
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
};
let OpenApiService$1 = class OpenApiService22222 {
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
let PasskeyApiService$1 = class PasskeyApiService22222 extends Service {
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
let SecurityApiResources$1 = class SecurityApiResources22222 {
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
        OptionsUtilities222222.getInstance().getOptions().staticRoutes,
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
      this.key = SM4Utils.encrypt(key, OptionsUtilities222222.securityKey());
    },
    getKey() {
      return SM4Utils.decrypt(this.key, OptionsUtilities222222.securityKey());
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
        SecurityApiResources222222.getInstance().open().getPrompt(principal).then((result) => {
          this.setUserErrorStatus(result.data);
        });
      }
    },
    signIn(username, password) {
      const crypto = useCryptoStore();
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
      const crypto = useCryptoStore();
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
function useSystemMenu() {
  const store = useRouterStore$5();
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
function useSystemTheme() {
  let media;
  const settings = useSettingsStore();
  const systemTheme = shallowRef(ThemeModeEnum$6.DARK);
  const IN_BROWSER = typeof window !== "undefined";
  const getMatchMedia = () => {
    if (!IN_BROWSER) return;
    return window.matchMedia("(prefers-color-scheme: dark)");
  };
  const onThemeChange = () => {
    systemTheme.value = media.matches ? ThemeModeEnum$6.DARK : ThemeModeEnum$6.LIGHT;
  };
  watch(
    () => settings.theme.mode,
    (val) => {
      if (val === ThemeModeEnum$6.SYSTEM) {
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
  CaptchaCategoryEnum$6 as CaptchaCategoryEnum,
  LayoutModeEnum$6 as LayoutModeEnum,
  OptionsUtilities,
  RouterUtilities,
  SecurityApiResources,
  SocialSourceEnum,
  ThemeModeEnum$6 as ThemeModeEnum,
  clearKernelPersistData,
  getSystemHeaders,
  initializer,
  useAuthenticationStore,
  useCryptoStore$6 as useCryptoStore,
  useEditFinish,
  usePasskey,
  useRouterStore$6 as useRouterStore,
  useSettingsStore,
  useSystemMenu,
  useSystemTheme,
  useTabsViewStore
};
