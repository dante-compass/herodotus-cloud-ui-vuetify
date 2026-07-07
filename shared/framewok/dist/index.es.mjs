import { AuthorizationGrantTypeEnum as e, AuthorizationTokenEnum as t, ClientAuthenticationMethodEnum as n, ContentTypeEnum as r, SM2Utils as i, SM4Utils as a, Service as o, ThemeModeEnum as s, changeSwalTheme as c, moment as l, notify as u, toast as d } from "@herodotus/core";
import { useRoute as f } from "vue-router";
import { defineStore as p } from "pinia";
import { jwtDecode as m } from "jwt-decode";
import { colord as h, extend as g } from "colord";
import ee from "colord/plugins/mix";
import { dropRight as te, endsWith as ne, findIndex as _, has as re, isEmpty as v, join as ie, merge as y, remove as b, split as x } from "lodash-es";
import { Base64 as ae } from "js-base64";
import { computed as S, getCurrentInstance as oe, inject as se, nextTick as ce, ref as le, shallowRef as C, watch as w, watchEffect as T } from "vue";
import E from "pinia-plugin-persistedstate";
//#region src/declarations/enums.ts
var D = /* @__PURE__ */ function(e) {
	return e.DEFAULT = "defaults", e.CLASSIC = "classic", e.TRANSVERSE = "transverse", e.COLUMNS = "transverse", e;
}({}), O = /* @__PURE__ */ function(e) {
	return e.JIGSAW = "JIGSAW", e.WORD_CLICK = "WORD_CLICK", e.ARITHMETIC = "ARITHMETIC", e.CHINESE = "CHINESE", e.CHINESE_GIF = "CHINESE_GIF", e.SPEC_GIF = "SPEC_GIF", e.SPEC = "SPEC", e.HUTOOL_LINE = "HUTOOL_LINE", e.HUTOOL_CIRCLE = "HUTOOL_CIRCLE", e.HUTOOL_SHEAR = "HUTOOL_SHEAR", e.HUTOOL_GIF = "HUTOOL_GIF", e;
}({}), k = /* @__PURE__ */ function(e) {
	return e.INSTITUTION = "INSTITUTION", e.SMS = "SMS", e.WXAPP = "WXAPP", e.QQ = "QQ", e.WEIBO = "WEIBO", e.BAIDU = "BAIDU", e.WECHAT_OPEN = "WECHAT_OPEN", e.WECHAT_MP = "WECHAT_MP", e.WECHAT_ENTERPRISE = "WECHAT_ENTERPRISE", e.WECHAT_ENTERPRISE_WEB = "WECHAT_ENTERPRISE_WEB", e.DINGTALK = "DINGTALK", e.DINGTALK_ACCOUNT = "DINGTALK_ACCOUNT", e.ALIYUN = "ALIYUN", e.TAOBAO = "TAOBAO", e.ALIPAY = "ALIPAY", e.TEAMBITION = "TEAMBITION", e.HUAWEI_V2 = "HUAWEI_V2", e.FEISHU = "FEISHU", e.JD = "JD", e.DOUYIN = "DOUYIN", e.TOUTIAO = "TOUTIAO", e.MI = "MI", e.RENREN = "RENREN", e.MEITUAN = "MEITUAN", e.ELEME = "ELEME", e.KUJIALE = "KUJIALE", e.XMLY = "XMLY", e.GITEE = "GITEE", e.OSCHINA = "OSCHINA", e.CSDN = "CSDN", e.GITHUB = "GITHUB", e.GITLAB = "GITLAB", e.STACK_OVERFLOW = "STACK_OVERFLOW", e.CODING = "CODING", e.GOOGLE = "GOOGLE", e.MICROSOFT = "MICROSOFT", e.FACEBOOK = "FACEBOOK", e.LINKEDIN = "LINKEDIN", e.TWITTER = "TWITTER", e.AMAZON = "AMAZON", e.SLACK = "SLACK", e.LINE = "LINE", e.OKTA = "OKTA", e.PINTEREST = "PINTEREST", e;
}({}), A = /* @__PURE__ */ function(e) {
	return e.APP = "APP", e.PERSONAL = "PERSONAL", e.TESTING = "TESTING", e;
}({}), j = /* @__PURE__ */ function(e) {
	return e.LIST = "List", e.CARD = "Card", e;
}({}), M = /* @__PURE__ */ function(e) {
	return e.QUASAR = "Quasar", e.VUETIFY = "Vuetify", e;
}({}), ue = p("Application", {
	state: () => ({
		leftDrawer: !0,
		rightDrawer: !1,
		signInPanel: "account",
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
//#endregion
//#region src/lib/utilities/color.ts
g([ee]);
var N = 2, P = 16, F = 5, I = 5, L = 15, R = 5, z = 4;
function B(e, t) {
	if (t === 6) return e;
	let n = t < 6, r = h(e).toHsv(), i = n ? 6 - t : t - R - 1;
	return h({
		h: H(r, i, n),
		s: U(r, i, n),
		v: de(r, i, n)
	}).toHex();
}
function V(e) {
	return [
		1,
		2,
		3,
		4,
		5,
		6,
		7,
		8,
		9,
		10
	].map((t) => B(e, t));
}
function H(e, t, n) {
	let r;
	return r = e.h >= 60 && e.h <= 240 ? n ? e.h - N * t : e.h + N * t : n ? e.h + N * t : e.h - N * t, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function U(e, t, n) {
	let r;
	return r = n ? e.s - P * t : t === z ? e.s + P : e.s + F * t, r > 100 && (r = 100), n && t === R && r > 10 && (r = 10), r < 6 && (r = 6), r;
}
function de(e, t, n) {
	let r;
	return r = n ? e.v + I * t : e.v - L * t, r > 100 && (r = 100), r;
}
function fe(e, t) {
	return h(e).alpha(t).toHex();
}
function W(e, t, n) {
	return h(e).mix(t, n).toHex();
}
function pe(e) {
	return h(e).isEqual("#ffffff");
}
//#endregion
//#region src/lib/utilities/options.ts
var G = class e {
	static _instance = null;
	static _initialized = !1;
	options;
	constructor(e) {
		this.options = e;
	}
	static initialize(t) {
		if (e._initialized) throw Error("RouterUtilities has already been initialized");
		return e._instance = new e(t), e._initialized = !0, e._instance;
	}
	static getInstance() {
		if (!e._instance) throw Error("RouterUtilities not initialized. Call initialize() first.");
		return e._instance;
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
}, K = class e {
	static _instance = null;
	static _initialized = !1;
	options;
	router = {};
	constructor(e) {
		this.options = e, this.router = e.instance;
	}
	static initialize(t) {
		if (e._initialized) throw Error("RouterUtilities has already been initialized");
		return e._instance = new e(t), e._initialized = !0, e._instance;
	}
	static getInstance() {
		if (!e._instance) throw Error("RouterUtilities not initialized. Call initialize() first.");
		return e._instance;
	}
	setRouter(e) {
		this.router = e;
	}
	getRouter() {
		return this.router;
	}
	isRouterExist() {
		return !v(this.router);
	}
	hasParameter(e) {
		return !v(e.params) || !v(e.query);
	}
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
	to(e, t = !1) {
		t ? this.push(e) : this.replace(e);
	}
	open(e) {
		let t = this.router.resolve(e);
		window.open(t.href, "_blank");
	}
	goBack() {
		this.router.go(-1);
	}
	refresh() {
		this.isRouterExist() ? this.router.go(0) : window.location.reload();
	}
	toRoot() {
		this.isRouterExist() && this.to(this.options.path.root);
	}
	toHome() {
		this.isRouterExist() && this.to(this.options.path.home);
	}
	toSignIn() {
		this.isRouterExist() ? this.to(this.options.path.signIn) : this.refresh();
	}
	getParent(e) {
		return ie(te(x(e, "/")), "/");
	}
	toPrev(e) {
		if (e.path) {
			let t = this.getParent(e.path);
			this.to({ path: t });
		} else this.goBack();
	}
}, q = class e {
	static _instance = null;
	static _initialized = !1;
	extension;
	constructor(e) {
		this.extension = e;
	}
	static initialize(t) {
		if (e._initialized) throw Error("SignOutUtilities has already been initialized");
		return e._instance = new e(t), e._initialized = !0, e._instance;
	}
	static getInstance() {
		if (!e._instance) throw Error("SignOutUtilities not initialized. Call initialize() first.");
		return e._instance;
	}
	signOut(e = !1) {
		e || X().signOut(), this.extension(), console.log("Clear Framework Kernel Data"), X().$reset(), Y().$reset(), Q().$reset(), K.getInstance().toSignIn();
	}
	signOutWithDialog() {
		u.signOutNotify(() => this.signOut());
	}
	tokenExpires(e, t, n, r = !1) {
		u.tokenExpiresNotify(e, t, n, () => this.signOut(r));
	}
}, me = class i {
	static instance = null;
	config = {};
	constructor(e) {
		this.config = e;
	}
	static getInstance(e) {
		return this.instance ??= new i(e), this.instance;
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
	getOAuth2RegisterAddress() {
		return this.config.getUaa() + "/oauth2/register";
	}
	getOIDCConnectRegisterAddress() {
		return this.config.getUaa() + "/connect/register";
	}
	createBasicHeader(e = "", n = "") {
		let r = this.config.getClientId() + ":" + this.config.getClientSecret();
		return e && n && (r = e + ":" + n), t.BASIC + ae.encode(r);
	}
	createClientData(e = "", t = "", n = "") {
		let r = {
			client_id: "",
			client_secret: ""
		};
		return e && t ? (r.client_id = e, r.client_secret = t) : (r.client_id = this.config.getClientId(), r.client_secret = this.config.getClientSecret()), n && y(r, { scope: n }), r;
	}
	createOAuth2Data(e, t, n = !1) {
		let r = { grant_type: e };
		return v(t) || y(r, t), n && y(r, { scope: "openid" }), r;
	}
	signOut(e, t = "", n = "") {
		return this.config.getHttp().put(this.getOAuth2SignOutAddress(), { accessToken: e }, { contentType: r.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(t, n) } });
	}
	revoke(e, t = "", n = "") {
		return this.config.getHttp().post(this.getOAuth2RevokeAddress(), { token: e }, { contentType: r.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(t, n) } });
	}
	refreshTokenFlow(t, n = !1, i = "", a = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.REFRESH_TOKEN, { refresh_token: t }, n), { contentType: r.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(i, a) } });
	}
	passwordFlow(t, n, i = !1, a = "", o = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.PASSWORD, {
			username: t,
			password: n
		}, i), { contentType: r.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(a, o) } });
	}
	createAuthorizationCodeAddress(e, t = "") {
		if (v(t)) {
			let t = this.config.getProject(), n = e;
			return ne(n, "/") && (n = n.substring(0, n.length - 1)), t && (t === "dante" || t === "herodotus") && (n += this.config.getUaa(!1)), n;
		} else return t;
	}
	createAuthorizationCodeParams(e, t = "openid") {
		return `?response_type=code&client_id=${this.config.getClientId()}&client_secret=${this.config.getClientSecret()}&redirect_uri=${e}&scope=${t}`;
	}
	authorizationCodeRequestFlow(e, t, n = "openid", r = "") {
		return this.createAuthorizationCodeAddress(e, r) + "/oauth2/authorize" + this.createAuthorizationCodeParams(t, n);
	}
	authorizationCodeFlow(t, n, i = "", a = !1, o = "", s = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.AUTHORIZATION_CODE, {
			code: t,
			state: i,
			redirect_uri: n
		}, a), { contentType: r.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(o, s) } });
	}
	clientCredentialsFlow(t = "", n = "", i = "", a) {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.CLIENT_CREDENTIALS, { ...this.createClientData(t, n, i) }), v(a) ? { contentType: r.URL_ENCODED } : a);
	}
	deviceCodeFlow(t, n = "", i = "", a = "", o) {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.DEVICE_CODE, {
			device_code: t,
			...this.createClientData(n, i, a)
		}), v(o) ? { contentType: r.URL_ENCODED } : o);
	}
	deviceAuthorizationFlow(e = "", t = "", n = "", i) {
		return this.config.getHttp().post(this.getOAuth2DeviceAuthorizationAddress(), { ...this.createClientData(e, t, n) }, v(i) ? { contentType: r.URL_ENCODED } : i);
	}
	socialCredentialsFlowBySms(t, n, i = !1, a = "", o = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.SOCIAL_CREDENTIALS, {
			mobile: t,
			code: n,
			source: k.SMS
		}, i), { contentType: r.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(a, o) } });
	}
	socialCredentialsFlowByJustAuth(t, n, i = !1, a = "", o = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.SOCIAL_CREDENTIALS, {
			...n,
			source: t
		}, i), { contentType: r.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(a, o) } });
	}
	webAuthnCredentialsFlow(t, n = !1, i = "", a = "") {
		return this.config.getHttp().postWithParams(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.WEBAUTHN_CREDENTIALS, {}, n), { ...t }, { contentType: r.JSON }, { headers: { Authorization: this.createBasicHeader(i, a) } });
	}
	oidcClientRegistrationFlow(t, i, a, o, s, c) {
		return this.config.getHttp().post(this.getOIDCConnectRegisterAddress(), {
			product_key: t,
			grant_types: [e.CLIENT_CREDENTIALS, e.DEVICE_CODE],
			client_name: i,
			redirect_uris: a,
			scope: o,
			token_endpoint_auth_method: n.CLIENT_SECRET_POST
		}, v(s) ? { contentType: r.JSON } : s, c);
	}
	clientRegistrationFlow(t, i, a, o, s, c) {
		return this.config.getHttp().post(this.getOAuth2RegisterAddress(), {
			product_key: t,
			grant_types: [e.CLIENT_CREDENTIALS, e.DEVICE_CODE],
			client_name: i,
			redirect_uris: a,
			scope: o,
			token_endpoint_auth_method: n.CLIENT_SECRET_POST
		}, v(s) ? { contentType: r.JSON } : s, c);
	}
}, he = class e {
	static instance = null;
	config = {};
	constructor(e) {
		this.config = e;
	}
	static getInstance(t) {
		return this.instance ??= new e(t), this.instance;
	}
	createSession(e = "") {
		let t = this.config.getUaa() + "/open/identity/session";
		return this.config.getHttp().post(t, {
			clientId: this.config.getClientId(),
			clientSecret: this.config.getClientSecret(),
			sessionId: e
		});
	}
	exchange(e = "", t) {
		let n = this.config.getUaa() + "/open/identity/exchange";
		return this.config.getHttp().post(n, {
			publicKey: t,
			sessionId: e
		});
	}
	getPrompt(e) {
		let t = this.config.getUaa() + "/open/identity/prompt";
		return this.config.getHttp().post(t, { username: e });
	}
	createCaptcha(e, t) {
		let n = this.config.getUaa() + "/open/captcha";
		return this.config.getHttp().get(n, {
			identity: e,
			category: t
		});
	}
	verifyCaptcha(e, t, n) {
		let r = this.config.getUaa() + "/open/captcha", i = {
			identity: e,
			category: t,
			coordinate: {
				x: 0,
				y: 0
			},
			coordinates: [],
			characters: ""
		};
		return t === O.WORD_CLICK ? i.coordinates = n : t === O.JIGSAW ? i.coordinate = n : i.characters = n, this.config.getHttp().post(r, i);
	}
	createVerificationCode(e) {
		let t = this.config.getUpms() + "/open/identity/verification-code";
		return this.config.getHttp().post(t, { mobile: e }, { contentType: r.URL_ENCODED });
	}
	getSocialList() {
		let e = this.config.getUpms() + "/open/identity/sources";
		return this.config.getHttp().get(e);
	}
}, ge = class e extends o {
	static instance = null;
	constructor(e) {
		super(e);
	}
	static getInstance(t) {
		return this.instance ??= new e(t), this.instance;
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
}, J = class e {
	static _instance = null;
	static _initialized = !1;
	config = {};
	constructor(e) {
		this.config = e;
	}
	static initialize(t) {
		if (e._initialized) throw Error("SecurityApiResources has already been initialized");
		return e._instance = new e(t), e._initialized = !0, e._instance;
	}
	static getInstance() {
		if (!e._instance) throw Error("SecurityApiResources not initialized. Call initialize() first.");
		return e._instance;
	}
	getConfig() {
		return this.config;
	}
	open() {
		return he.getInstance(this.config);
	}
	oauth2() {
		return me.getInstance(this.config);
	}
	passkey() {
		return ge.getInstance(this.config);
	}
}, Y = p("Crypto", {
	state: () => ({
		sessionId: "",
		key: "",
		state: ""
	}),
	actions: {
		setSessionId(e) {
			this.sessionId = e;
		},
		setKey(e) {
			this.key = a.encrypt(e, G.getSecurityKey());
		},
		getKey() {
			return a.decrypt(this.key, G.getSecurityKey());
		},
		encrypt(e) {
			let t = this.getKey();
			return a.encrypt(e, t);
		},
		decrypt(e) {
			let t = this.getKey();
			return a.decrypt(e, t);
		},
		exchange(e = "") {
			return new Promise((t, n) => {
				J.getInstance().open().createSession(e).then((e) => {
					let n = e.data;
					if (n) {
						let e = n.sessionId, r = n.publicKey;
						this.state = n.state;
						let a = i.createKeyPair(), o = i.encrypt(a.publicKey, r);
						J.getInstance().open().exchange(e, o).then((n) => {
							let r = n.data, o = i.decrypt(r, a.privateKey);
							this.setSessionId(e), this.setKey(o), t(o);
						});
					}
				}).catch((e) => {
					n(e);
				});
			});
		}
	},
	persist: { storage: sessionStorage }
}), X = p("Authentication", {
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
		isNotExpired: (e) => l(l().add(e.expires_in, "seconds").valueOf()).add(1, "seconds").diff(l(), "seconds") !== 0,
		token() {
			return G.isAutoRefreshToken() || this.isNotExpired ? this.access_token : "";
		}
	},
	actions: {
		getBearerToken() {
			return t.BEARER + this.token;
		},
		getAuthorizationHeader() {
			return {
				Authorization: this.getBearerToken(),
				"X-Herodotus-Open-Id": this.userId
			};
		},
		saveAccessToken(e) {
			if (this.access_token = e.access_token, this.expires_in = e.expires_in, this.refresh_token = e.refresh_token ? e.refresh_token : "", this.license = e.refresh_token ? e.refresh_token : "", this.scope = e.scope, this.token_type = e.token_type, e.id_token) {
				this.idToken = e.id_token;
				let t = m(this.idToken);
				this.userId = t.openid, this.username = t.sub, this.avatar = t.avatar, this.employeeId = t.employeeId, this.roles = t.roles;
			} else if (e.openid) {
				let t = Y();
				this.openid = e.openid;
				let n = t.decrypt(this.openid), r = JSON.parse(n);
				this.userId = r.userId, this.username = r.username, this.roles = r.roles, this.avatar = r.avatar, this.employeeId = r.employeeId;
			} else console.warn("There is no id token or openid in the data.");
		},
		setUserErrorStatus(e) {
			this.remainTimes = e.remainTimes, this.errorTimes = e.errorTimes, this.locked = e.locked;
		},
		isAlertMessage(e) {
			return e.code && [40106, 40111].includes(e.code);
		},
		setErrorPrompt(e, t) {
			this.isAlertMessage(e) && J.getInstance().open().getPrompt(t).then((e) => {
				this.setUserErrorStatus(e.data);
			});
		},
		signIn(e, t) {
			let n = Y();
			return G.isUseCrypto() && (e = n.encrypt(e), t = n.encrypt(t)), new Promise((n, r) => {
				J.getInstance().oauth2().passwordFlow(e, t, G.isUseCrypto()).then((e) => {
					if (e) {
						let t = e;
						this.saveAccessToken(t);
					}
					this.access_token ? n(!0) : n(!1);
				}).catch((t) => {
					this.setErrorPrompt(t, e), r(t);
				});
			});
		},
		refreshToken() {
			return new Promise((e, t) => {
				J.getInstance().oauth2().refreshTokenFlow(this.refresh_token, G.isUseCrypto()).then((t) => {
					if (t) {
						let e = t;
						this.saveAccessToken(e);
					}
					this.access_token ? e(!0) : e(!1);
				}).catch((e) => {
					t(e);
				});
			});
		},
		signOut() {
			this.access_token && J.getInstance().oauth2().signOut(this.access_token).then(() => {
				console.log("Server side sign out successfully.");
			}).catch((e) => {
				console.log("Server side sign out has error.", e);
			});
		},
		authorizationCode(e, t = "") {
			return new Promise((n, r) => {
				J.getInstance().oauth2().authorizationCodeFlow(e, G.getRedirectUri(), t, G.isUseCrypto()).then((e) => {
					if (e) {
						let t = e;
						this.saveAccessToken(t);
					}
					this.access_token ? n(!0) : n(!1);
				}).catch((e) => {
					r(e);
				});
			});
		},
		smsSignIn(e, t) {
			let n = Y();
			return G.isUseCrypto() && (e = n.encrypt(e), t = n.encrypt(t)), new Promise((n, r) => {
				J.getInstance().oauth2().socialCredentialsFlowBySms(e, t, G.isUseCrypto()).then((e) => {
					if (e) {
						let t = e;
						this.saveAccessToken(t);
					}
					this.access_token ? n(!0) : n(!1);
				}).catch((t) => {
					this.setErrorPrompt(t, e), r(t);
				});
			});
		},
		socialSignIn(e, t) {
			return new Promise((n, r) => {
				J.getInstance().oauth2().socialCredentialsFlowByJustAuth(e, t, G.isUseCrypto()).then((e) => {
					if (e) {
						let t = e;
						this.saveAccessToken(t);
					}
					this.access_token ? n(!0) : n(!1);
				}).catch((e) => {
					e.code && [40106, 40111].includes(e.code) && r(e);
				});
			});
		},
		passkey(e) {
			return new Promise((t, n) => {
				J.getInstance().oauth2().webAuthnCredentialsFlow(e, G.isUseCrypto()).then((e) => {
					if (e) {
						let t = e;
						this.saveAccessToken(t);
					}
					this.access_token ? t(!0) : t(!1);
				}).catch((e) => {
					e.code && [40106, 40111].includes(e.code) && n(e);
				});
			});
		}
	},
	persist: !0
}), _e = () => {
	let e = X(), n = Y(), r = e.access_token, i = n.sessionId, a = {};
	r && (a.Authorization = t.BEARER + r), i && (a["X-Herodotus-Session-Id"] = i);
	let o = G.getTenantId();
	return o && (a["X-Herodotus-Tenant-Id"] = o), a["X-Herodotus-Api-Version"] = "v1", a;
}, Z = p("SystemSettings", {
	state: () => ({
		library: M.VUETIFY,
		theme: {
			mode: s.SYSTEM,
			dark: { primary: "#2563eb" },
			light: { primary: "#6750A4" }
		},
		layout: D.DEFAULT,
		effect: { isUniqueOpened: !1 },
		display: {
			isTabsView: !0,
			isActivateLeftTab: !0,
			showBreadcrumbs: !0,
			showBreadcrumbsIcon: !0,
			table: {
				dense: !1,
				style: j.LIST
			}
		}
	}),
	getters: {
		isDark: (e) => e.theme.mode === s.DARK,
		isLight: (e) => e.theme.mode === s.LIGHT,
		isSystem: (e) => e.theme.mode === s.SYSTEM,
		isDarkenMode: (e) => e.theme.mode !== s.LIGHT,
		isLightenMode: (e) => e.theme.mode === s.LIGHT,
		density: (e) => e.display.table.dense ? "compact" : "default",
		densitySwitch: (e) => (t, n) => e.display.table.dense ? t : n,
		displayAsCard: (e) => e.display.table.style === j.CARD,
		displayAsList: (e) => e.display.table.style === j.LIST
	},
	actions: {
		toDark() {
			this.theme.mode = s.DARK;
		},
		toLight() {
			this.theme.mode = s.LIGHT;
		},
		toSystem() {
			this.theme.mode = s.SYSTEM;
		},
		changeTableStyle(e) {
			this.display.table.style;
		}
	},
	persist: !0
}), Q = p("SystemElement", {
	state: () => ({
		appMenus: [],
		personalMenus: [],
		testingMenus: [],
		cachedRoutes: [],
		details: /* @__PURE__ */ new Map(/* @__PURE__ */ new Map()),
		pushParams: {}
	}),
	getters: {
		isDynamicRouteAdded() {
			return !v(this.appMenus) || !v(this.personalMenus);
		},
		supportTesting() {
			return !v(this.testingMenus);
		}
	},
	actions: {
		getDetailComponent(e) {
			return this.details.get(e);
		},
		getRoutePushParam(e) {
			return this.pushParams[e];
		},
		addCachedRoute(e) {
			if (!e.meta?.isNotKeepAlive) {
				let t = e.name;
				this.cachedRoutes.includes(t) || this.cachedRoutes.push(t);
			}
		},
		addDetailRoute(e) {
			let t = e.name;
			t && this.details.set(t, e.component);
		},
		addMenus(e, t, n) {
			v(e) || (this.appMenus = e), v(t) || (this.personalMenus = t), v(n) || (this.testingMenus = n);
		},
		hasParameter(e) {
			let t = e.name;
			return !!(t && re(this.pushParams, t));
		},
		isDetailRoute(e) {
			return !!(e.meta && e.meta.isDetailContent);
		},
		isValidDetailRoute(e) {
			return this.isDetailRoute(e) && this.hasParameter(e);
		},
		addRoutePushParam(e, t = {}) {
			e && (this.pushParams[e] = t);
		},
		removeRoutePushParam(e) {
			e && delete this.pushParams[e];
		}
	}
}), $ = p("TabsView", {
	state: () => ({
		tabs: [],
		activatedTab: {},
		activatedTabName: ""
	}),
	getters: {
		isNotLastTab: (e) => (t) => e.tabs.length - 1 !== t,
		getLastTabIndex: (e) => e.tabs.length - 1,
		getTabIndex: (e) => (t) => _(e.tabs, (e) => e.name === t.name),
		getActivatedTabIndex() {
			return this.getTabIndex(this.activatedTab);
		},
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
		convertRouteToTab(e) {
			return {
				name: e.name,
				path: e.path,
				meta: e.meta
			};
		},
		setActivatedTab(e) {
			this.activatedTab = e, this.activatedTabName = e.name;
		},
		isNotExistInStaticRoute(e) {
			return _(G.getRoutes(), (t) => t.path === e.path) === -1;
		},
		isTabNotOpened(e) {
			return this.getTabIndex(e) === -1;
		},
		openTab(e, t = !1) {
			this.isNotExistInStaticRoute(e) && (this.isTabNotOpened(e) && (t ? this.isLastTabActivated ? this.tabs.splice(this.getActivatedTabIndex, 0, e) : this.tabs.splice(this.getActivatedTabIndex + 1, 0, e) : this.tabs.push(e)), this.setActivatedTab(e));
		},
		closeTab(e) {
			b(this.tabs, (t) => t.name === e.name);
		},
		smartTab(e) {
			let t = Q(), n = t.isDetailRoute(e), r = this.convertRouteToTab(e);
			n ? t.hasParameter(e) ? this.openTab(r, n) : (this.closeTab(r), K.getInstance().goBack()) : this.openTab(r, n);
		},
		deleteTab(e) {
			let t = this.convertRouteToTab(e);
			this.closeTab(t);
		},
		closeCurrentTab() {
			this.closeTab(this.activatedTab);
		},
		closeOtherTabs() {
			b(this.tabs, (e) => e.name !== this.activatedTab.name);
		},
		closeLeftTabs() {
			let e = this.getActivatedTabIndex;
			b(this.tabs, (t, n) => n < e);
		},
		closeRightTabs() {
			let e = this.getActivatedTabIndex;
			b(this.tabs, (t, n) => n > e);
		}
	},
	persist: !0
});
//#endregion
//#region src/lib/hooks/useEditFinish.ts
function ve(e) {
	let t = Q(), n = $(), r = () => {
		if (v(e)) {
			let e = f();
			return v(e) ? void 0 : e;
		} else return e;
	};
	return { onFinish: () => {
		let e = r();
		if (!v(e) && e.name) {
			let r = e.name;
			t.removeRoutePushParam(r), n.deleteTab(e);
		}
		K.getInstance().goBack();
	} };
}
//#endregion
//#region src/lib/hooks/useDeviceAuthorize.ts
function ye(e, t, n, i = "") {
	let a = C(0), o = C(5), s = C(!1), c = C(!1), l = C({}), u = le([]), d = (e, t = !1) => {
		let n = u.value.length + 1;
		t ? u.value.push({
			id: n,
			icon: "mdi-information",
			color: "green",
			text: e
		}) : u.value.push({
			id: n,
			icon: "mdi-alert-circle",
			color: "error",
			text: e
		});
	}, f = (e) => {
		e === "authorization_pending" ? d("Authorization pending, continuing to poll...") : e === "slow_down" ? (d("Slowing down..."), g()) : e === "token_expired" ? (d("Token expired, stopping..."), h(), c.value = !0) : e === "access_denied" && (d("Access denied, stopping..."), h(), c.value = !0);
	}, p = () => {
		J.getInstance().oauth2().deviceCodeFlow(e.value, t.value, n.value, i, {
			contentType: r.URL_ENCODED,
			withToken: !1
		}).then((e) => {
			d("Authorization successful", !0), h(), s.value = !0, l.value = e;
		}).catch((e) => {
			f(e.error);
		});
	}, m = () => {
		a.value = window.setInterval(p, o.value * 1e3);
	}, h = () => {
		window.clearInterval(a.value);
	}, g = () => {
		o.value += 5, h(), m();
	};
	return {
		pullingResponse: u,
		successResponse: l,
		isFailed: c,
		isSuccess: s,
		schedule: m,
		clear: h,
		slowDown: g
	};
}
//#endregion
//#region src/lib/hooks/useFileDownload.ts
function be() {
	let e = C(0), t = C(!1);
	return {
		process: (e, t) => {
			let n = new Blob([e], { type: "application/x-download" }), r = document.createElement("a");
			r.style.display = "none", r.href = URL.createObjectURL(n), r.setAttribute("download", t), document.body.appendChild(r), r.click(), document.body.removeChild(r), window.URL.revokeObjectURL(r.href);
		},
		loadProgress: e,
		showProgress: t,
		showDownLoadProgress: () => {
			t.value = !0, e.value = 0;
			let n = setInterval(() => {
				e.value === 100 && clearInterval(n);
			}, 500);
		}
	};
}
//#endregion
//#region src/lib/hooks/usePasskey.ts
function xe() {
	let e = X(), t = null, n = () => {
		t &&= null;
	};
	return {
		isSupported: async () => !!(window.PublicKeyCredential && PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable && PublicKeyCredential.isConditionalMediationAvailable && (await Promise.all([PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable(), PublicKeyCredential.isConditionalMediationAvailable()])).every((e) => e === !0)),
		registration: (e) => (t = new AbortController(), new Promise((t, r) => {
			J.getInstance().passkey().getPublicKeyCredentialCreationOptions().then((e) => {
				let t = PublicKeyCredential.parseCreationOptionsFromJSON(e);
				return navigator.credentials.create({ publicKey: t });
			}).then((t) => {
				let n = { publicKey: {
					label: e,
					credential: t
				} };
				return J.getInstance().passkey().webAuthnRegister(n);
			}).then((e) => {
				t(e);
			}).catch((e) => {
				r(e);
			}).finally(() => {
				n();
			});
		})),
		authenticator: () => (t = new AbortController(), new Promise((r, i) => {
			J.getInstance().passkey().getPublicKeyCredentialRequestOptions().then((e) => {
				let n = PublicKeyCredential.parseRequestOptionsFromJSON(e);
				return navigator.credentials.get({
					publicKey: n,
					signal: t?.signal
				});
			}).then((n) => {
				if (t?.signal.aborted) return !1;
				if (n) {
					let t = n;
					return e.passkey(t.toJSON());
				}
				return !1;
			}).then((e) => {
				r(e);
			}).catch((e) => {
				i(e);
			}).finally(() => {
				n();
			});
		}))
	};
}
//#endregion
//#region src/lib/hooks/useSystemElement.ts
function Se(e, t, n) {
	let r = (e) => e.meta?.title, i = (e) => e.meta?.icon, a = (e) => e.meta?.isDetailContent, o = (e, n) => {
		let r = {};
		return r.path = e.name, r.component = n[t(e.componentPath)], e.componentName && (r.name = e.componentName), e.redirect && (r.redirect = e.redirect), r.meta = {
			icon: e.meta.icon,
			title: e.meta.title,
			...e.meta.sort && { sort: e.meta.sort },
			...e.meta.isHaveChild && { isHaveChild: e.meta.isHaveChild },
			...e.meta.isNotKeepAlive && { isNotKeepAlive: e.meta.isNotKeepAlive },
			...e.meta.isHideAllChild && { isHideAllChild: e.meta.isHideAllChild },
			...e.meta.isDetailContent && { isDetailContent: e.meta.isDetailContent },
			...e.meta.isIgnoreAuth && { isIgnoreAuth: e.meta.isIgnoreAuth }
		}, r;
	}, s = (e) => ({
		title: r(e),
		prependIcon: i(e),
		to: {
			name: e.name,
			path: e.path
		}
	}), c = (e) => ({
		title: r(e),
		prependIcon: i(e),
		children: []
	}), l = (e, t) => {
		let n = [];
		switch (e.scenario) {
			case A.PERSONAL:
				n = t.personalMenus;
				break;
			case A.TESTING:
				n = t.testingMenus;
				break;
			default:
				n = t.appMenus;
				break;
		}
		return n;
	}, u = (e, t, n = !1) => {
		let r = Q(), i = [], d = [], f = [], p = [];
		return e.forEach((e) => {
			let m = o(e, t);
			a(m) && r.addDetailRoute(m);
			let h = {};
			if (e.children && e.children.length > 0) {
				let r = u(e.children, t, e.meta.isHideAllChild);
				if (m.children = r.routeRecords, n) h = s(m);
				else {
					let t = l(e, r);
					v(t) ? h = s(m) : (h = c(m), h.children = t);
				}
			} else n || (h = s(m));
			if (i.push(m), !v(h)) switch (e.scenario) {
				case A.PERSONAL:
					f.push(h);
					break;
				case A.TESTING:
					p.push(h);
					break;
				default:
					d.push(h);
					break;
			}
		}), {
			routeRecords: i,
			appMenus: d,
			personalMenus: f,
			testingMenus: p
		};
	}, d = (e, t) => {
		console.log("[Herodotus] |- Begin add dynamic routes"), Q().addMenus(t.appMenus, t.personalMenus, t.testingMenus), v(t.routeRecords) ? console.warn("[Herodotus] |- Dynamic routes is empty, skip!") : (t.routeRecords.forEach((t) => {
			e.addRoute(t);
		}), console.log("[Herodotus] |- Dynamic routes add success!"));
	};
	return { initBackendSecurity: async (t, r) => {
		let i = (await n(r)).data.menus, a = u(i, e);
		d(t, a);
	} };
}
//#endregion
//#region ../../node_modules/.pnpm/vuetify@4.1.3_typescript@6._9fbc2319d05588616722e1a5e433b2d5/node_modules/vuetify/lib/util/getCurrentInstance.js
function Ce(e, t) {
	let n = oe();
	if (!n) throw Error(`[Vuetify] ${e} ${t || "must be called from inside a setup function"}`);
	return n;
}
//#endregion
//#region ../../node_modules/.pnpm/vuetify@4.1.3_typescript@6._9fbc2319d05588616722e1a5e433b2d5/node_modules/vuetify/lib/composables/theme.js
var we = Symbol.for("vuetify:theme");
function Te() {
	Ce("useTheme");
	let e = se(we, null);
	if (!e) throw Error("Could not find Vuetify theme injection");
	return e;
}
//#endregion
//#region src/lib/hooks/useSystemTheme.ts
function Ee() {
	let e = Z(), t = Te(), n = C(s.DARK), r = (e) => {
		if (!e || e.nodeType !== Node.ELEMENT_NODE) return !1;
		let t = window.getComputedStyle(e);
		return t.overflowY === "scroll" || t.overflowY === "auto" && e.scrollHeight > e.clientHeight;
	}, i = () => {
		let e = performance.now();
		for (let e = 0; e++ < 1e7; e << 9 & 9);
		if (performance.now() - e > 10) return;
		let t = document.querySelector("[data-v-app]");
		t.querySelectorAll("*").forEach((e) => {
			r(e) && (e.dataset.scrollX = String(e.scrollLeft), e.dataset.scrollY = String(e.scrollTop));
		});
		let n = t.cloneNode(!0);
		n.classList.add("app-copy");
		let i = t.getBoundingClientRect();
		n.style.top = i.top + "px", n.style.left = i.left + "px", n.style.width = i.width + "px", n.style.height = i.height + "px";
		let a = document.activeElement.getBoundingClientRect(), o = a.left + a.width / 2 + window.scrollX, s = a.top + a.height / 2 + window.scrollY;
		t.style.setProperty("--clip-pos", `${o}px ${s}px`), t.style.removeProperty("--clip-size"), ce(() => {
			t.classList.add("app-transition"), requestAnimationFrame(() => {
				requestAnimationFrame(() => {
					t.style.setProperty("--clip-size", Math.hypot(window.innerWidth, window.innerHeight) + "px");
				});
			});
		}), document.body.append(n), n.querySelectorAll("[data-scroll-x], [data-scroll-y]").forEach((e) => {
			e.scrollLeft = Number(e.dataset.scrollX), e.scrollTop = Number(e.dataset.scrollY);
		});
		function c(e) {
			e.target === e.currentTarget && (n.remove(), t.removeEventListener("transitionend", c), t.removeEventListener("transitioncancel", c), t.classList.remove("app-transition"), t.style.removeProperty("--clip-size"), t.style.removeProperty("--clip-pos"));
		}
		t.addEventListener("transitionend", c), t.addEventListener("transitioncancel", c);
	};
	T(() => {
		t.change(e.isSystem ? n.value : e.theme.mode);
	}), w(t.global.name, (e) => {
		i();
		let t = e;
		d.setTheme(t), u.setTheme(t);
	});
	let a = S(() => e.isDarkenMode ? e.theme.dark.primary : e.theme.light.primary);
	return {
		lightColor: S(() => B(a.value, 3)),
		darkColor: S(() => B(a.value, 6)),
		backgroundColor: S(() => {
			let t = e.isDarkenMode ? .5 : .2;
			return W("#ffffff", a.value, t);
		}),
		onCycleChangeTheme: () => {
			if (e.isDark) {
				e.toSystem();
				return;
			}
			if (e.isSystem) {
				e.toLight();
				return;
			}
			if (e.isLight) {
				e.toDark();
				return;
			}
		},
		currentTheme: S({
			get() {
				return e.theme.mode;
			},
			set(t) {
				e.theme.mode = t;
			}
		}),
		cycleChangeThemeIcon: S(() => {
			switch (e.theme.mode) {
				case s.SYSTEM: return "mdi-brightness-5";
				case s.DARK: return "mdi-brightness-auto";
				default: return "mdi-brightness-4";
			}
		}),
		systemTheme: n
	};
}
//#endregion
//#region src/lib/main.ts
var De = (e) => {
	c(Z().theme.mode), G.initialize(e), K.initialize(e.router), J.initialize(e.config), q.initialize(e.signOutExtension);
};
//#endregion
export { O as CaptchaCategoryEnum, D as LayoutModeEnum, M as LibraryEnum, A as MenuScenarioEnum, G as OptionsUtilities, K as RouterUtilities, J as SecurityApiResources, q as SignOutUtilities, k as SocialSourceEnum, j as TableStyleEnum, fe as addColorAlpha, V as getAllColorPalette, B as getColorPalette, _e as getSystemHeaders, De as initializer, pe as isWhiteColor, W as mixColor, E as piniaPluginPersistedstate, ue as useApplicationStore, X as useAuthenticationStore, Y as useCryptoStore, ye as useDeviceAuthorize, ve as useEditFinish, Q as useElementStore, be as useFileDownload, xe as usePasskey, Z as useSettingsStore, Se as useSystemElement, Ee as useSystemTheme, $ as useTabsViewStore };
