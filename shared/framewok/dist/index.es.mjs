import { notify as W, AuthorizationTokenEnum as Y, ContentTypeEnum as I, AuthorizationGrantTypeEnum as O, BuildInScopeEnum as L, ClientAuthenticationMethodEnum as ot, Service as ct, SM2Utils as x, SM4Utils as U, moment as B, ThemeModeEnum as C, toast as ht, changeSwalTheme as lt } from "@herodotus/core";
import { useRoute as ut } from "vue-router";
import { defineStore as P } from "pinia";
import { jwtDecode as dt } from "jwt-decode";
import { extend as gt, colord as H } from "colord";
import ft from "colord/plugins/mix";
import { isEmpty as A, split as pt, dropRight as Tt, join as At, merge as F, endsWith as It, has as Ct, remove as K, findIndex as et } from "lodash-es";
import { nextTick as mt, shallowRef as k, ref as Et, getCurrentInstance as Ot, inject as yt, watchEffect as bt, watch as Rt, computed as D } from "vue";
import { Base64 as _t } from "js-base64";
import { default as oe } from "pinia-plugin-persistedstate";
var nt = /* @__PURE__ */ ((t) => (t.DEFAULT = "defaults", t.CLASSIC = "classic", t.TRANSVERSE = "transverse", t.COLUMNS = "transverse", t))(nt || {}), G = /* @__PURE__ */ ((t) => (t.JIGSAW = "JIGSAW", t.WORD_CLICK = "WORD_CLICK", t.ARITHMETIC = "ARITHMETIC", t.CHINESE = "CHINESE", t.CHINESE_GIF = "CHINESE_GIF", t.SPEC_GIF = "SPEC_GIF", t.SPEC = "SPEC", t.HUTOOL_LINE = "HUTOOL_LINE", t.HUTOOL_CIRCLE = "HUTOOL_CIRCLE", t.HUTOOL_SHEAR = "HUTOOL_SHEAR", t.HUTOOL_GIF = "HUTOOL_GIF", t))(G || {}), it = /* @__PURE__ */ ((t) => (t.INSTITUTION = "INSTITUTION", t.SMS = "SMS", t.WXAPP = "WXAPP", t.QQ = "QQ", t.WEIBO = "WEIBO", t.BAIDU = "BAIDU", t.WECHAT_OPEN = "WECHAT_OPEN", t.WECHAT_MP = "WECHAT_MP", t.WECHAT_ENTERPRISE = "WECHAT_ENTERPRISE", t.WECHAT_ENTERPRISE_WEB = "WECHAT_ENTERPRISE_WEB", t.DINGTALK = "DINGTALK", t.DINGTALK_ACCOUNT = "DINGTALK_ACCOUNT", t.ALIYUN = "ALIYUN", t.TAOBAO = "TAOBAO", t.ALIPAY = "ALIPAY", t.TEAMBITION = "TEAMBITION", t.HUAWEI_V2 = "HUAWEI_V2", t.FEISHU = "FEISHU", t.JD = "JD", t.DOUYIN = "DOUYIN", t.TOUTIAO = "TOUTIAO", t.MI = "MI", t.RENREN = "RENREN", t.MEITUAN = "MEITUAN", t.ELEME = "ELEME", t.KUJIALE = "KUJIALE", t.XMLY = "XMLY", t.GITEE = "GITEE", t.OSCHINA = "OSCHINA", t.CSDN = "CSDN", t.GITHUB = "GITHUB", t.GITLAB = "GITLAB", t.STACK_OVERFLOW = "STACK_OVERFLOW", t.CODING = "CODING", t.GOOGLE = "GOOGLE", t.MICROSOFT = "MICROSOFT", t.FACEBOOK = "FACEBOOK", t.LINKEDIN = "LINKEDIN", t.TWITTER = "TWITTER", t.AMAZON = "AMAZON", t.SLACK = "SLACK", t.LINE = "LINE", t.OKTA = "OKTA", t.PINTEREST = "PINTEREST", t))(it || {}), rt = /* @__PURE__ */ ((t) => (t.APP = "APP", t.PERSONAL = "PERSONAL", t))(rt || {});
const qt = P("Application", {
  state: () => ({
    // 左侧菜单面板显示控制
    leftDrawer: !0,
    // 右侧设置面板显示控制
    rightDrawer: !1,
    // 登录页面面板
    signInPanel: "account",
    // 加载指示器
    loading: !1
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
    },
    loadingStart() {
      this.loading = !0;
    },
    loadingEnd() {
      this.loading = !1;
    }
  }
});
gt([ft]);
const z = 2, st = 16, vt = 5, Dt = 5, kt = 15, V = 5, Pt = 4;
function J(t, e) {
  if (e === 6) return t;
  const s = e < 6, n = H(t).toHsv(), i = s ? V + 1 - e : e - V - 1, r = {
    h: wt(n, i, s),
    s: Nt(n, i, s),
    v: Ht(n, i, s)
  };
  return H(r).toHex();
}
function $t(t) {
  return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((s) => J(t, s));
}
function wt(t, e, s) {
  let n;
  return t.h >= 60 && t.h <= 240 ? n = s ? t.h - z * e : t.h + z * e : n = s ? t.h + z * e : t.h - z * e, n < 0 ? n += 360 : n >= 360 && (n -= 360), n;
}
function Nt(t, e, s) {
  let n;
  return s ? n = t.s - st * e : e === Pt ? n = t.s + st : n = t.s + vt * e, n > 100 && (n = 100), s && e === V && n > 10 && (n = 10), n < 6 && (n = 6), n;
}
function Ht(t, e, s) {
  let n;
  return s ? n = t.v + Dt * e : n = t.v - kt * e, n > 100 && (n = 100), n;
}
function jt(t, e) {
  return H(t).alpha(e).toHex();
}
function Lt(t, e, s) {
  return H(t).mix(e, s).toHex();
}
function Xt(t) {
  return H(t).isEqual("#ffffff");
}
class c {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = !1;
  options;
  // 私有构造函数防止外部实例化
  constructor(e) {
    this.options = e;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param {KernelOptions} options 配置选项
   * @returns {OptionsUtilities} 单例实例
   */
  static initialize(e) {
    if (c._initialized)
      throw new Error("RouterUtilities has already been initialized");
    return c._instance = new c(e), c._initialized = !0, c._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!c._instance)
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    return c._instance;
  }
  setOptions(e) {
    this.options = e;
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
class m {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = !1;
  options;
  router = {};
  // 私有构造函数防止外部实例化
  constructor(e) {
    this.options = e, this.router = e.instance;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param {RouterOptions} options 配置选项
   * @returns {RouterUtilities} 单例实例
   */
  static initialize(e) {
    if (m._initialized)
      throw new Error("RouterUtilities has already been initialized");
    return m._instance = new m(e), m._initialized = !0, m._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!m._instance)
      throw new Error("RouterUtilities not initialized. Call initialize() first.");
    return m._instance;
  }
  setRouter(e) {
    this.router = e;
  }
  getRouter() {
    return this.router;
  }
  isRouterExist() {
    return !A(this.router);
  }
  hasParameter(e) {
    return !A(e.params) || !A(e.query);
  }
  /**
   * 判断是否为三级路由页面
   * @param route 当前路由 {@link RouteLocationNormalizedLoaded}
   * @returns true 是三级路由，false 不是三级路由
   */
  isDetailRoute(e) {
    return !!(e.meta && e.meta.isDetailContent);
  }
  isValidDetailRoute(e) {
    return this.isDetailRoute(e) && this.hasParameter(e);
  }
  push(e) {
    return this.router.push(e);
  }
  replace(e) {
    return this.router.replace(e);
  }
  /**
   * 路由跳转
   * @param to - 需要跳转的路由
   * @param isNewTab - 是否在新的浏览器Tab标签打开
   */
  to(e, s = !1) {
    s ? this.push(e) : this.replace(e);
  }
  /**
   * 打开新页面
   * @param to 需要跳转的路由
   */
  open(e) {
    const s = this.router.resolve(e);
    window.open(s.href, "_blank");
  }
  /**
   * 返回上一级路由
   *
   */
  goBack() {
    this.router.go(-1);
  }
  refresh() {
    this.isRouterExist() ? this.router.go(0) : window.location.reload();
  }
  toRoot() {
    this.isRouterExist() && this.to(this.options.path.root);
  }
  /**
   * 跳转首页
   */
  toHome() {
    this.isRouterExist() && this.to(this.options.path.home);
  }
  toSignIn() {
    this.isRouterExist() ? this.to(this.options.path.signIn) : this.refresh();
  }
  getParent(e) {
    const s = pt(e, "/"), n = Tt(s);
    return At(n, "/");
  }
  toPrev(e) {
    if (e.path) {
      const s = this.getParent(e.path);
      this.to({ path: s });
    } else
      this.goBack();
  }
}
class y {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = !1;
  extension;
  constructor(e) {
    this.extension = e;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param extension 扩展方法
   * @returns {OptionsUtilities} 单例实例
   */
  static initialize(e) {
    if (y._initialized)
      throw new Error("SignOutUtilities has already been initialized");
    return y._instance = new y(e), y._initialized = !0, y._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!y._instance)
      throw new Error("SignOutUtilities not initialized. Call initialize() first.");
    return y._instance;
  }
  signOut(e = !1) {
    e || S().signOut(), this.extension(), console.log("Clear Framework Kernel Data"), S().$reset(), N().$reset(), m.getInstance().toSignIn();
  }
  signOutWithDialog() {
    W.signOutNotify(() => this.signOut());
  }
  tokenExpires(e, s, n, i = !1) {
    W.tokenExpiresNotify(e, s, n, () => this.signOut(i));
  }
}
class q {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(e) {
    this.config = e;
  }
  static getInstance(e) {
    return this.instance == null && (this.instance = new q(e)), this.instance;
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
  createBasicHeader(e = "", s = "") {
    let n = this.config.getClientId() + ":" + this.config.getClientSecret();
    return e && s && (n = e + ":" + s), Y.BASIC + _t.encode(n);
  }
  createClientData(e = "", s = "", n = "") {
    const i = {
      client_id: "",
      client_secret: ""
    };
    return e && s ? (i.client_id = e, i.client_secret = s) : (i.client_id = this.config.getClientId(), i.client_secret = this.config.getClientSecret()), n && F(i, { scope: n }), i;
  }
  createOAuth2Data(e, s, n = !1) {
    const i = {
      grant_type: e
    };
    return A(s) || F(i, s), n && F(i, { scope: "openid" }), i;
  }
  signOut(e, s = "", n = "") {
    return this.config.getHttp().put(
      this.getOAuth2SignOutAddress(),
      {
        accessToken: e
      },
      {
        contentType: I.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(s, n)
        }
      }
    );
  }
  revoke(e, s = "", n = "") {
    return this.config.getHttp().post(
      this.getOAuth2RevokeAddress(),
      {
        token: e
      },
      {
        contentType: I.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(s, n)
        }
      }
    );
  }
  refreshTokenFlow(e, s = !1, n = "", i = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        O.REFRESH_TOKEN,
        { refresh_token: e },
        s
      ),
      {
        contentType: I.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(n, i)
        }
      }
    );
  }
  passwordFlow(e, s, n = !1, i = "", r = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        O.PASSWORD,
        { username: e, password: s },
        n
      ),
      {
        contentType: I.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(i, r)
        }
      }
    );
  }
  authorizationCodeRequestFlow(e, s, n = "openid") {
    console.log("-------api---------", e), console.log("--------config--------", this.config);
    const i = `?response_type=code&client_id=${this.config.getClientId()}&client_secret=${this.config.getClientSecret()}&redirect_uri=${s}&scope=${n}`, r = this.config.getProject();
    let o = e;
    return It(o, "/") && (o = o.substring(0, o.length - 1)), r && (r === "dante" || r === "herodotus") && (o += this.config.getUaa(!1)), o + "/oauth2/authorize" + i;
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
  authorizationCodeFlow(e, s, n = "", i = !1, r = "", o = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        O.AUTHORIZATION_CODE,
        { code: e, state: n, redirect_uri: s },
        i
      ),
      {
        contentType: I.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(r, o)
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
  clientCredentialsFlow(e = "", s = "", n = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(O.CLIENT_CREDENTIALS, {
        ...this.createClientData(e, s, n)
      }),
      {
        contentType: I.URL_ENCODED
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
  deviceCodeFlow(e, s = "", n = "", i = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(O.DEVICE_CODE, {
        device_code: e,
        ...this.createClientData(s, n, i)
      }),
      {
        contentType: I.URL_ENCODED
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
  deviceAuthorizationFlow(e = "", s = "", n = L.EMAIL) {
    return this.config.getHttp().post(
      this.getOAuth2DeviceAuthorizationAddress(),
      this.createClientData(e, s, n),
      {
        contentType: I.URL_ENCODED
      }
    );
  }
  socialCredentialsFlowBySms(e, s, n = !1, i = "", r = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        O.SOCIAL_CREDENTIALS,
        { mobile: e, code: s, source: it.SMS },
        n
      ),
      {
        contentType: I.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(i, r)
        }
      }
    );
  }
  socialCredentialsFlowByJustAuth(e, s, n = !1, i = "", r = "") {
    return this.config.getHttp().post(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(
        O.SOCIAL_CREDENTIALS,
        { ...s, source: e },
        n
      ),
      {
        contentType: I.URL_ENCODED
      },
      {
        headers: {
          Authorization: this.createBasicHeader(i, r)
        }
      }
    );
  }
  webAuthnCredentialsFlow(e, s = !1, n = "", i = "") {
    return this.config.getHttp().postWithParams(
      this.getOAuth2TokenAddress(),
      this.createOAuth2Data(O.WEBAUTHN_CREDENTIALS, {}, s),
      { ...e },
      {
        contentType: I.JSON
      },
      {
        headers: {
          Authorization: this.createBasicHeader(n, i)
        }
      }
    );
  }
  oidcClientRegistrationFlow(e, s) {
    return this.config.getHttp().post(this.getOIDCConnectRegisterAddress(), {
      product_key: e,
      grant_types: [
        O.CLIENT_CREDENTIALS,
        O.DEVICE_CODE
      ],
      redirect_uris: ["http://192.168.101.10:3000"],
      client_name: s,
      // client_secret: '123456',
      scope: [L.OPENID, L.EMAIL, L.PROFILE].join(" "),
      // 如果 response_types 包含 code 则会添加 authorization_code 授权模式
      // token 是 OAuth2.0 规范中隐式模式的值，但是在 OAuth2.1 中隐式模式被取消。目前临时使用一下
      // 可以考虑使用 id_token
      // "response_types": [
      //   "code",                // 允许：标准授权码流程
      //   "code id_token",       // 允许：OIDC 混合流程（仅返回 code + id_token）
      //   "id_token"             // 允许但不推荐：纯 OIDC 流程（无访问令牌）
      // ],
      response_types: ["token"],
      token_endpoint_auth_method: ot.CLIENT_SECRET_POST
    });
  }
}
class $ {
  // 静态私有实例引用
  static instance = null;
  config = {};
  constructor(e) {
    this.config = e;
  }
  static getInstance(e) {
    return this.instance == null && (this.instance = new $(e)), this.instance;
  }
  createSession(e = "") {
    const s = this.config.getUaa() + "/open/identity/session";
    return this.config.getHttp().post(s, {
      clientId: this.config.getClientId(),
      clientSecret: this.config.getClientSecret(),
      sessionId: e
    });
  }
  exchange(e = "", s) {
    const n = this.config.getUaa() + "/open/identity/exchange";
    return this.config.getHttp().post(n, {
      publicKey: s,
      sessionId: e
    });
  }
  getPrompt(e) {
    const s = this.config.getUaa() + "/open/identity/prompt";
    return this.config.getHttp().post(s, {
      username: e
    });
  }
  createCaptcha(e, s) {
    const n = this.config.getUaa() + "/open/captcha";
    return this.config.getHttp().get(n, {
      identity: e,
      category: s
    });
  }
  verifyCaptcha(e, s, n) {
    const i = this.config.getUaa() + "/open/captcha", r = {
      identity: e,
      category: s,
      coordinate: { x: 0, y: 0 },
      coordinates: [],
      characters: ""
    };
    return s === G.WORD_CLICK ? r.coordinates = n : s === G.JIGSAW ? r.coordinate = n : r.characters = n, this.config.getHttp().post(i, r);
  }
  createVerificationCode(e) {
    const s = this.config.getUpms() + "/open/identity/verification-code";
    return this.config.getHttp().post(
      s,
      {
        mobile: e
      },
      {
        contentType: I.URL_ENCODED
      }
    );
  }
  getSocialList() {
    const e = this.config.getUpms() + "/open/identity/sources";
    return this.config.getHttp().get(e);
  }
}
class j extends ct {
  // 静态私有实例引用
  static instance = null;
  constructor(e) {
    super(e);
  }
  static getInstance(e) {
    return this.instance == null && (this.instance = new j(e)), this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/webauthn/register";
  }
  getPublicKeyCredentialCreationOptionsAddress() {
    return this.getBaseAddress() + "/options";
  }
  getWebAuthnAuthenticateAddress() {
    return this.getConfig().getUaa() + "/login/webauthn";
  }
  getPublicKeyCredentialRequestOptionsAddress() {
    return this.getConfig().getUaa() + "/webauthn/authenticate/options";
  }
  getIdPath(e) {
    return this.getParamPath(this.getBaseAddress(), e);
  }
  getPublicKeyCredentialCreationOptions() {
    return this.getConfig().getHttp().post(this.getPublicKeyCredentialCreationOptionsAddress(), "");
  }
  webAuthnRegister(e) {
    return this.getConfig().getHttp().post(this.getBaseAddress(), e);
  }
  getPublicKeyCredentialRequestOptions() {
    return this.getConfig().getHttp().post(this.getPublicKeyCredentialRequestOptionsAddress(), "");
  }
  webAuthnAuthenticate(e) {
    return this.getConfig().getHttp().post(this.getWebAuthnAuthenticateAddress(), e);
  }
  delete(e) {
    return this.getConfig().getHttp().delete(this.getIdPath(e));
  }
}
class h {
  // 静态私有实例引用
  static _instance = null;
  // 初始化标志
  static _initialized = !1;
  config = {};
  // 私有构造函数防止外部实例化
  constructor(e) {
    this.config = e;
  }
  /**
   * 初始化单例（仅允许一次）
   * @param {KernelOptions} config 配置选项
   * @returns {SecurityApiResources} 单例实例
   */
  static initialize(e) {
    if (h._initialized)
      throw new Error("SecurityApiResources has already been initialized");
    return h._instance = new h(e), h._initialized = !0, h._instance;
  }
  /**
   * 获取单例实例
   * @returns {RouterUtilities} 单例实例
   */
  static getInstance() {
    if (!h._instance)
      throw new Error("SecurityApiResources not initialized. Call initialize() first.");
    return h._instance;
  }
  getConfig() {
    return this.config;
  }
  open() {
    return $.getInstance(this.config);
  }
  oauth2() {
    return q.getInstance(this.config);
  }
  passkey() {
    return j.getInstance(this.config);
  }
}
const N = P("Crypto", {
  state: () => ({
    sessionId: "",
    key: "",
    state: ""
  }),
  actions: {
    setSessionId(t) {
      this.sessionId = t;
    },
    setKey(t) {
      this.key = U.encrypt(t, c.getSecurityKey());
    },
    getKey() {
      return U.decrypt(this.key, c.getSecurityKey());
    },
    encrypt(t) {
      const e = this.getKey();
      return U.encrypt(t, e);
    },
    decrypt(t) {
      const e = this.getKey();
      return U.decrypt(t, e);
    },
    exchange(t = "") {
      return new Promise((e, s) => {
        h.getInstance().open().createSession(t).then((n) => {
          const i = n.data;
          if (i) {
            const r = i.sessionId, o = i.publicKey;
            this.state = i.state;
            const g = x.createKeyPair(), d = x.encrypt(g.publicKey, o);
            h.getInstance().open().exchange(r, d).then((l) => {
              const u = l.data, E = x.decrypt(u, g.privateKey);
              this.setSessionId(r), this.setKey(E), e(E);
            });
          }
        }).catch((n) => {
          s(n);
        });
      });
    }
  },
  persist: {
    storage: sessionStorage
  }
}), S = P("Authentication", {
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
    locked: !1,
    userId: "",
    username: "",
    employeeId: "",
    avatar: "",
    roles: []
  }),
  getters: {
    isNotExpired: (t) => {
      const e = B().add(t.expires_in, "seconds").valueOf();
      return B(e).add(1, "seconds").diff(B(), "seconds") !== 0;
    },
    token() {
      return c.isAutoRefreshToken() ? this.access_token : this.isNotExpired ? this.access_token : "";
    }
  },
  actions: {
    getBearerToken() {
      return Y.BEARER + this.token;
    },
    getAuthorizationHeader() {
      return { Authorization: this.getBearerToken(), "X-Herodotus-Open-Id": this.userId };
    },
    saveAccessToken(t) {
      if (this.access_token = t.access_token, this.expires_in = t.expires_in, this.refresh_token = t.refresh_token ? t.refresh_token : "", this.license = t.refresh_token ? t.refresh_token : "", this.scope = t.scope, this.token_type = t.token_type, t.id_token) {
        this.idToken = t.id_token;
        const e = dt(this.idToken);
        this.userId = e.openid, this.username = e.sub, this.avatar = e.avatar, this.employeeId = e.employeeId, this.roles = e.roles;
      } else if (t.openid) {
        const e = N();
        this.openid = t.openid;
        const s = e.decrypt(this.openid), n = JSON.parse(s);
        this.userId = n.userId, this.username = n.username, this.roles = n.roles, this.avatar = n.avatar, this.employeeId = n.employeeId;
      } else
        console.warn("There is no id token or openid in the data.");
    },
    setUserErrorStatus(t) {
      this.remainTimes = t.remainTimes, this.errorTimes = t.errorTimes, this.locked = t.locked;
    },
    /**
     * 判断是否是以非弹窗的形式显示的信息。
     *
     * 主要在登录页面中，将 Dialog 弹出形式的错误信息，转换为显示在输入框上部的错误信息，
     * @param error
     * @returns
     */
    isAlertMessage(t) {
      return t.code && [40106, 40111].includes(t.code);
    },
    setErrorPrompt(t, e) {
      this.isAlertMessage(t) && h.getInstance().open().getPrompt(e).then((s) => {
        this.setUserErrorStatus(s.data);
      });
    },
    signIn(t, e) {
      const s = N();
      return c.isUseCrypto() && (t = s.encrypt(t), e = s.encrypt(e)), new Promise((n, i) => {
        h.getInstance().oauth2().passwordFlow(t, e, c.isUseCrypto()).then((r) => {
          if (r) {
            const o = r;
            this.saveAccessToken(o);
          }
          this.access_token ? n(!0) : n(!1);
        }).catch((r) => {
          this.setErrorPrompt(r, t), i(r);
        });
      });
    },
    refreshToken() {
      return new Promise((t, e) => {
        h.getInstance().oauth2().refreshTokenFlow(this.refresh_token, c.isUseCrypto()).then((s) => {
          if (s) {
            const n = s;
            this.saveAccessToken(n);
          }
          this.access_token ? t(!0) : t(!1);
        }).catch((s) => {
          e(s);
        });
      });
    },
    signOut() {
      this.access_token && h.getInstance().oauth2().signOut(this.access_token).then(() => {
        console.log("Server side sign out successfully.");
      }).catch((t) => {
        console.log("Server side sign out has error.", t);
      });
    },
    authorizationCode(t, e = "") {
      return new Promise((s, n) => {
        h.getInstance().oauth2().authorizationCodeFlow(
          t,
          c.getRedirectUri(),
          e,
          c.isUseCrypto()
        ).then((i) => {
          if (i) {
            const r = i;
            this.saveAccessToken(r);
          }
          this.access_token ? s(!0) : s(!1);
        }).catch((i) => {
          n(i);
        });
      });
    },
    smsSignIn(t, e) {
      const s = N();
      return c.isUseCrypto() && (t = s.encrypt(t), e = s.encrypt(e)), new Promise((n, i) => {
        h.getInstance().oauth2().socialCredentialsFlowBySms(t, e, c.isUseCrypto()).then((r) => {
          if (r) {
            const o = r;
            this.saveAccessToken(o);
          }
          this.access_token ? n(!0) : n(!1);
        }).catch((r) => {
          this.setErrorPrompt(r, t), i(r);
        });
      });
    },
    socialSignIn(t, e) {
      return new Promise((s, n) => {
        h.getInstance().oauth2().socialCredentialsFlowByJustAuth(t, e, c.isUseCrypto()).then((i) => {
          if (i) {
            const r = i;
            this.saveAccessToken(r);
          }
          this.access_token ? s(!0) : s(!1);
        }).catch((i) => {
          i.code && [40106, 40111].includes(i.code) && n(i);
        });
      });
    },
    passkey(t) {
      return new Promise((e, s) => {
        h.getInstance().oauth2().webAuthnCredentialsFlow(t, c.isUseCrypto()).then((n) => {
          if (n) {
            const i = n;
            this.saveAccessToken(i);
          }
          this.access_token ? e(!0) : e(!1);
        }).catch((n) => {
          n.code && [40106, 40111].includes(n.code) && s(n);
        });
      });
    }
  },
  persist: !0
}), Qt = () => {
  const t = S(), e = N(), s = t.access_token, n = e.sessionId, i = {};
  s && (i.Authorization = Y.BEARER + s), n && (i["X-Herodotus-Session-Id"] = n);
  const r = c.getTenantId();
  return r && (i["X-Herodotus-Tenant-Id"] = r), i;
}, at = P("SystemSettings", {
  state: () => ({
    /**
     * 全局主题
     */
    theme: {
      mode: C.SYSTEM,
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
    layout: nt.DEFAULT,
    /**
     * 界面效果
     */
    effect: {
      // 是否开启菜单手风琴效果
      isUniqueOpened: !1
    },
    display: {
      // 是否开启 TabsView
      isTabsView: !0,
      // 关闭标签页，激活左侧标签页
      isActivateLeftTab: !0,
      // 显示面包屑
      showBreadcrumbs: !0,
      // 显示面包屑图标
      showBreadcrumbsIcon: !0,
      table: {
        dense: !1
      }
    }
  }),
  getters: {
    isDark: (t) => t.theme.mode === C.DARK,
    isLight: (t) => t.theme.mode === C.LIGHT,
    isSystem: (t) => t.theme.mode === C.SYSTEM,
    isDarkenMode: (t) => t.theme.mode !== C.LIGHT,
    isLightenMode: (t) => t.theme.mode === C.LIGHT,
    density: (t) => t.display.table.dense ? "compact" : "default",
    densitySwitch: (t) => (e, s) => t.display.table.dense ? e : s
  },
  actions: {
    toDark() {
      this.theme.mode = C.DARK;
    },
    toLight() {
      this.theme.mode = C.LIGHT;
    },
    toSystem() {
      this.theme.mode = C.SYSTEM;
    }
  },
  persist: !0
}), M = P("SystemElement", {
  state: () => ({
    appMenus: [],
    personalMenus: [],
    cachedRoutes: [],
    details: /* @__PURE__ */ new Map(),
    isRemote: !0,
    pushParams: {}
  }),
  getters: {
    isDynamicRouteAdded: (t) => !A(t.appMenus) || !A(t.personalMenus)
  },
  actions: {
    /**
     * 查询三级路由组件
     * @param key 三级路由组件名称
     * @returns 组件名称
     */
    getDetailComponent(t) {
      return this.details.get(t);
    },
    /**
     * 获取 Vue Router Push 类型参数
     * @param key 组件名称
     * @returns Push 类型参数
     */
    getRoutePushParam(t) {
      return this.pushParams[t];
    },
    /**
     * 将路由添加至缓存
     * @param route 路由
     */
    addCachedRoute(t) {
      if (!t.meta?.isNotKeepAlive) {
        const e = t.name;
        this.cachedRoutes.includes(e) || this.cachedRoutes.push(e);
      }
    },
    /**
     * 添加三级路由
     * @param item 路由条目
     */
    addDetailRoute(t) {
      const e = t.name;
      e && this.details.set(e, t.component);
    },
    addMenus(t, e) {
      A(t) || (this.appMenus = t), A(e) || (this.personalMenus = e);
    },
    /**
     * 判断路由中是否包含 Push 路由
     * @param route 路由
     * @returns true 包含参数，false 不包含参数
     */
    hasParameter(t) {
      const e = t.name;
      return !!(e && Ct(this.pushParams, e));
    },
    /**
     * 判断是否为三级路由
     * @param route 路由
     * @returns true 是三级路由，false 不是三级路由
     */
    isDetailRoute(t) {
      return !!(t.meta && t.meta.isDetailContent);
    },
    /**
     * 判断当前是否为有效的三级路由
     * @param route 路由
     * @returns true 是三级路由，false 不是三级路由
     */
    isValidDetailRoute(t) {
      return this.isDetailRoute(t) && this.hasParameter(t);
    },
    /**
     * 向当前缓存添加 Push 参数
     * @param name 参数名称
     * @param params 参数值
     */
    addRoutePushParam(t, e = {}) {
      t && (this.pushParams[t] = e);
    },
    /**
     * 从当前缓存中删除 Push 参数
     * @param name 参数名称
     */
    removeRoutePushParam(t) {
      t && delete this.pushParams[t];
    }
  }
}), Ut = P("TabsView", {
  state: () => ({
    tabs: [],
    activatedTab: {},
    activatedTabName: ""
  }),
  getters: {
    isNotLastTab: (t) => (e) => t.tabs.length - 1 !== e,
    getLastTabIndex: (t) => t.tabs.length - 1,
    getTabIndex: (t) => (e) => et(t.tabs, (s) => s.name === e.name),
    getActivatedTabIndex() {
      return this.getTabIndex(this.activatedTab);
    },
    /**
     * 最后一个Tab是否为激活状态
     */
    isLastTabActivated() {
      return this.getActivatedTabIndex === this.getLastTabIndex;
    },
    isFirstTabActivated() {
      return this.getActivatedTabIndex === 0;
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
      return !!(this.activatedTab.meta && this.activatedTab.meta.isDetailContent);
    }
  },
  actions: {
    convertRouteToTab(t) {
      return {
        name: t.name,
        path: t.path,
        meta: t.meta
      };
    },
    setActivatedTab(t) {
      mt(() => {
        this.activatedTab = t, this.activatedTabName = t.name;
      });
    },
    isNotExistInStaticRoute(t) {
      return et(c.getRoutes(), (e) => e.path === t.path) === -1;
    },
    isTabNotOpened(t) {
      return this.getTabIndex(t) === -1;
    },
    openTab(t, e = !1) {
      this.isNotExistInStaticRoute(t) && (this.isTabNotOpened(t) && (e ? this.isLastTabActivated ? this.tabs.splice(this.getActivatedTabIndex, 0, t) : this.tabs.splice(this.getActivatedTabIndex + 1, 0, t) : this.tabs.push(t)), this.setActivatedTab(t));
    },
    closeTab(t) {
      K(this.tabs, (e) => e.name === t.name);
    },
    smartTab(t) {
      const e = M(), s = e.isDetailRoute(t), n = this.convertRouteToTab(t);
      s ? e.hasParameter(t) ? this.openTab(n, s) : (this.closeTab(n), m.getInstance().goBack()) : this.openTab(n, s);
    },
    deleteTab(t) {
      const e = this.convertRouteToTab(t);
      this.closeTab(e);
    },
    closeCurrentTab() {
      this.closeTab(this.activatedTab);
    },
    closeOtherTabs() {
      K(this.tabs, (t) => t.name !== this.activatedTab.name);
    },
    closeLeftTabs() {
      const t = this.getActivatedTabIndex;
      K(this.tabs, (e, s) => s < t);
    },
    closeRightTabs() {
      const t = this.getActivatedTabIndex;
      K(this.tabs, (e, s) => s > t);
    }
  },
  persist: !0
});
function Zt() {
  const t = ut(), e = M(), s = Ut();
  return {
    onFinish: () => {
      const i = t.name;
      e.removeRoutePushParam(i), s.deleteTab(t), m.getInstance().goBack();
    }
  };
}
function te(t, e, s, n = "") {
  const i = k(0), r = k(5), o = k(!1), g = k(!1), d = k({}), l = Et([]), u = (p, w = !1) => {
    const v = l.value.length + 1;
    w ? l.value.push({ id: v, icon: "mdi-information", color: "green", text: p }) : l.value.push({ id: v, icon: "mdi-alert-circle", color: "error", text: p });
  }, E = (p) => {
    p === "authorization_pending" ? u("Authorization pending, continuing to poll...") : p === "slow_down" ? (u("Slowing down..."), T()) : p === "token_expired" ? (u("Token expired, stopping..."), f(), g.value = !0) : p === "access_denied" && (u("Access denied, stopping..."), f(), g.value = !0);
  }, X = () => {
    h.getInstance().oauth2().deviceCodeFlow(t.value, e.value, s.value, n).then((p) => {
      u("Authorization successful", !0), f(), o.value = !0, d.value = p;
    }).catch((p) => {
      E(p.error);
    });
  }, a = () => {
    i.value = window.setInterval(X, r.value * 1e3);
  }, f = () => {
    window.clearInterval(i.value);
  }, T = () => {
    r.value += 5, f(), a();
  };
  return {
    pullingResponse: l,
    successResponse: d,
    isFailed: g,
    isSuccess: o,
    schedule: a,
    clear: f,
    slowDown: T
  };
}
function ee() {
  const t = S();
  let e = null;
  const s = () => {
    e && (e = null);
  };
  return {
    isSupported: async () => !!(window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable && PublicKeyCredential.isConditionalMediationAvailable && (await Promise.all([
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(),
      PublicKeyCredential.isConditionalMediationAvailable()
    ])).every((g) => g === !0)),
    registration: (o) => (e = new AbortController(), new Promise((g, d) => {
      h.getInstance().passkey().getPublicKeyCredentialCreationOptions().then((l) => {
        const u = PublicKeyCredential.parseCreationOptionsFromJSON(
          l
        );
        return navigator.credentials.create({ publicKey: u });
      }).then((l) => {
        const u = {
          publicKey: { label: o, credential: l }
        };
        return h.getInstance().passkey().webAuthnRegister(u);
      }).then((l) => {
        g(l);
      }).catch((l) => {
        d(l);
      }).finally(() => {
        s();
      });
    })),
    authenticator: () => (e = new AbortController(), new Promise((o, g) => {
      h.getInstance().passkey().getPublicKeyCredentialRequestOptions().then((d) => {
        const l = PublicKeyCredential.parseRequestOptionsFromJSON(
          d
        );
        return navigator.credentials.get({ publicKey: l, signal: e?.signal });
      }).then((d) => {
        if (e?.signal.aborted)
          return !1;
        if (d) {
          const l = d;
          return t.passkey(l.toJSON());
        }
        return !1;
      }).then((d) => {
        o(d);
      }).catch((d) => {
        g(d);
      }).finally(() => {
        s();
      });
    }))
  };
}
function se(t, e, s) {
  const n = (a) => a.meta?.title, i = (a) => a.meta?.icon, r = (a) => a.meta?.isDetailContent, o = (a, f) => {
    const T = {};
    return T.path = a.name, T.component = f[e(a.componentPath)], a.componentName && (T.name = a.componentName), a.redirect && (T.redirect = a.redirect), T.meta = {
      icon: a.meta.icon,
      title: a.meta.title,
      ...a.meta.sort && { sort: a.meta.sort },
      ...a.meta.isHaveChild && { isHaveChild: a.meta.isHaveChild },
      ...a.meta.isNotKeepAlive && { isNotKeepAlive: a.meta.isNotKeepAlive },
      ...a.meta.isHideAllChild && { isHideAllChild: a.meta.isHideAllChild },
      ...a.meta.isDetailContent && { isDetailContent: a.meta.isDetailContent },
      ...a.meta.isIgnoreAuth && { isIgnoreAuth: a.meta.isIgnoreAuth }
    }, T;
  }, g = (a) => ({
    title: n(a),
    prependIcon: i(a),
    to: { name: a.name, path: a.path }
  }), d = (a) => ({
    title: n(a),
    prependIcon: i(a),
    children: []
  }), l = (a) => A(a.appMenus) ? A(a.personalMenus) ? [] : a.personalMenus : a.appMenus, u = (a, f, T = !1) => {
    const p = M(), w = [], v = [], Q = [];
    return a.forEach((b) => {
      console.log("---node---", b);
      const R = o(b, f);
      r(R) && p.addDetailRoute(R);
      let _ = {};
      if (b.children && b.children.length > 0) {
        console.log("---hasChildren---", b.children);
        const Z = u(b.children, f, b.meta.isHideAllChild);
        if (R.children = Z.routeRecords, console.log("---isHideAllChild---", T), T)
          console.log("---toLeaf---"), _ = g(R);
        else {
          console.log("---isNotHideAllChild---", T);
          const tt = l(Z);
          A(tt) ? (console.log("---toLeaf---"), _ = g(R)) : (console.log("---toNode---"), _ = d(R), _.children = tt);
        }
      } else
        console.log("---haveNoChildren---"), T || (_ = g(R));
      w.push(R), A(_) || (b.scenario == rt.APP ? v.push(_) : Q.push(_));
    }), { routeRecords: w, appMenus: v, personalMenus: Q };
  }, E = (a, f) => {
    console.log("[Herodotus] |- Begin add dynamic routes"), M().addMenus(f.appMenus, f.personalMenus), A(f.routeRecords) ? console.warn("[Herodotus] |- Dynamic routes is empty, skip!") : (f.routeRecords.forEach((p) => {
      a.addRoute(p);
    }), console.log("[Herodotus] |- Dynamic routes add success!"));
  };
  return {
    initBackendSecurity: async (a, f) => {
      const p = (await s(f)).data.menus, v = u(p, t);
      E(a, v);
    }
  };
}
function Kt(t, e) {
  const s = Ot();
  if (!s)
    throw new Error(`[Vuetify] ${t} must be called from inside a setup function`);
  return s;
}
const zt = Symbol.for("vuetify:theme");
function St() {
  Kt("useTheme");
  const t = yt(zt, null);
  if (!t) throw new Error("Could not find Vuetify theme injection");
  return t;
}
function ne() {
  const t = at(), e = St(), s = k(C.DARK);
  bt(() => {
    e.change(t.isSystem ? s.value : t.theme.mode);
  }), Rt(e.global.name, (u) => {
    const E = u;
    ht.setTheme(E), W.setTheme(E);
  });
  const n = D(() => t.isDarkenMode ? t.theme.dark.primary : t.theme.light.primary), i = D(() => J(n.value, 3)), r = D(() => J(n.value, 6)), o = D(() => {
    const u = "#ffffff", E = t.isDarkenMode ? 0.5 : 0.2;
    return Lt(u, n.value, E);
  }), g = () => {
    if (t.isDark) {
      t.toSystem();
      return;
    }
    if (t.isSystem) {
      t.toLight();
      return;
    }
    if (t.isLight) {
      t.toDark();
      return;
    }
  }, d = D({
    get() {
      return t.theme.mode;
    },
    set(u) {
      t.theme.mode = u;
    }
  }), l = D(() => {
    switch (t.theme.mode) {
      case C.SYSTEM:
        return "mdi-brightness-5";
      case C.DARK:
        return "mdi-brightness-auto";
      default:
        return "mdi-brightness-4";
    }
  });
  return {
    lightColor: i,
    darkColor: r,
    backgroundColor: o,
    onCycleChangeTheme: g,
    currentTheme: d,
    cycleChangeThemeIcon: l,
    systemTheme: s
  };
}
const ie = (t) => {
  const e = at();
  lt(e.theme.mode), c.initialize(t), m.initialize(t.router), h.initialize(t.config), y.initialize(t.signOutExtension);
};
export {
  G as CaptchaCategoryEnum,
  nt as LayoutModeEnum,
  rt as MenuScenario,
  c as OptionsUtilities,
  m as RouterUtilities,
  h as SecurityApiResources,
  y as SignOutUtilities,
  it as SocialSourceEnum,
  jt as addColorAlpha,
  $t as getAllColorPalette,
  J as getColorPalette,
  Qt as getSystemHeaders,
  ie as initializer,
  Xt as isWhiteColor,
  Lt as mixColor,
  oe as piniaPluginPersistedstate,
  qt as useApplicationStore,
  S as useAuthenticationStore,
  N as useCryptoStore,
  te as useDeviceAuthorize,
  Zt as useEditFinish,
  M as useElementStore,
  ee as usePasskey,
  at as useSettingsStore,
  se as useSystemElement,
  ne as useSystemTheme,
  Ut as useTabsViewStore
};
