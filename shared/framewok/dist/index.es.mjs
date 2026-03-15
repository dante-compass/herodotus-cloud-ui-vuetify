import { AuthorizationGrantTypeEnum as e, AuthorizationTokenEnum as t, BuildInScopeEnum as n, ClientAuthenticationMethodEnum as r, ContentTypeEnum as i, SM2Utils as a, SM4Utils as o, Service as s, ThemeModeEnum as c, changeSwalTheme as l, moment as u, notify as d, toast as f } from "@herodotus/core";
import { useRoute as p } from "vue-router";
import { defineStore as m } from "pinia";
import { jwtDecode as h } from "jwt-decode";
import { colord as g, extend as ee } from "colord";
import _ from "colord/plugins/mix";
import { dropRight as v, endsWith as te, findIndex as y, has as ne, isEmpty as b, join as x, merge as S, remove as C, split as re } from "lodash-es";
import { Base64 as ie } from "js-base64";
import { computed as w, getCurrentInstance as ae, inject as oe, nextTick as se, ref as T, shallowRef as E, watch as ce, watchEffect as D } from "vue";
import le from "pinia-plugin-persistedstate";
//#region src/declarations/enums.ts
var O = /* @__PURE__ */ function(e) {
	return e.DEFAULT = "defaults", e.CLASSIC = "classic", e.TRANSVERSE = "transverse", e.COLUMNS = "transverse", e;
}({}), k = /* @__PURE__ */ function(e) {
	return e.JIGSAW = "JIGSAW", e.WORD_CLICK = "WORD_CLICK", e.ARITHMETIC = "ARITHMETIC", e.CHINESE = "CHINESE", e.CHINESE_GIF = "CHINESE_GIF", e.SPEC_GIF = "SPEC_GIF", e.SPEC = "SPEC", e.HUTOOL_LINE = "HUTOOL_LINE", e.HUTOOL_CIRCLE = "HUTOOL_CIRCLE", e.HUTOOL_SHEAR = "HUTOOL_SHEAR", e.HUTOOL_GIF = "HUTOOL_GIF", e;
}({}), A = /* @__PURE__ */ function(e) {
	return e.INSTITUTION = "INSTITUTION", e.SMS = "SMS", e.WXAPP = "WXAPP", e.QQ = "QQ", e.WEIBO = "WEIBO", e.BAIDU = "BAIDU", e.WECHAT_OPEN = "WECHAT_OPEN", e.WECHAT_MP = "WECHAT_MP", e.WECHAT_ENTERPRISE = "WECHAT_ENTERPRISE", e.WECHAT_ENTERPRISE_WEB = "WECHAT_ENTERPRISE_WEB", e.DINGTALK = "DINGTALK", e.DINGTALK_ACCOUNT = "DINGTALK_ACCOUNT", e.ALIYUN = "ALIYUN", e.TAOBAO = "TAOBAO", e.ALIPAY = "ALIPAY", e.TEAMBITION = "TEAMBITION", e.HUAWEI_V2 = "HUAWEI_V2", e.FEISHU = "FEISHU", e.JD = "JD", e.DOUYIN = "DOUYIN", e.TOUTIAO = "TOUTIAO", e.MI = "MI", e.RENREN = "RENREN", e.MEITUAN = "MEITUAN", e.ELEME = "ELEME", e.KUJIALE = "KUJIALE", e.XMLY = "XMLY", e.GITEE = "GITEE", e.OSCHINA = "OSCHINA", e.CSDN = "CSDN", e.GITHUB = "GITHUB", e.GITLAB = "GITLAB", e.STACK_OVERFLOW = "STACK_OVERFLOW", e.CODING = "CODING", e.GOOGLE = "GOOGLE", e.MICROSOFT = "MICROSOFT", e.FACEBOOK = "FACEBOOK", e.LINKEDIN = "LINKEDIN", e.TWITTER = "TWITTER", e.AMAZON = "AMAZON", e.SLACK = "SLACK", e.LINE = "LINE", e.OKTA = "OKTA", e.PINTEREST = "PINTEREST", e;
}({}), j = /* @__PURE__ */ function(e) {
	return e.APP = "APP", e.PERSONAL = "PERSONAL", e;
}({}), ue = m("Application", {
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
ee([_]);
var M = 2, N = 16, P = 5, F = 5, I = 15, L = 5, R = 4;
function z(e, t) {
	if (t === 6) return e;
	let n = t < 6, r = g(e).toHsv(), i = n ? L + 1 - t : t - L - 1;
	return g({
		h: V(r, i, n),
		s: H(r, i, n),
		v: U(r, i, n)
	}).toHex();
}
function B(e) {
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
	].map((t) => z(e, t));
}
function V(e, t, n) {
	let r;
	return r = e.h >= 60 && e.h <= 240 ? n ? e.h - M * t : e.h + M * t : n ? e.h + M * t : e.h - M * t, r < 0 ? r += 360 : r >= 360 && (r -= 360), r;
}
function H(e, t, n) {
	let r;
	return r = n ? e.s - N * t : t === R ? e.s + N : e.s + P * t, r > 100 && (r = 100), n && t === L && r > 10 && (r = 10), r < 6 && (r = 6), r;
}
function U(e, t, n) {
	let r;
	return r = n ? e.v + F * t : e.v - I * t, r > 100 && (r = 100), r;
}
function de(e, t) {
	return g(e).alpha(t).toHex();
}
function W(e, t, n) {
	return g(e).mix(t, n).toHex();
}
function fe(e) {
	return g(e).isEqual("#ffffff");
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
		return !b(this.router);
	}
	hasParameter(e) {
		return !b(e.params) || !b(e.query);
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
		return x(v(re(e, "/")), "/");
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
		d.signOutNotify(() => this.signOut());
	}
	tokenExpires(e, t, n, r = !1) {
		d.tokenExpiresNotify(e, t, n, () => this.signOut(r));
	}
}, pe = class a {
	static instance = null;
	config = {};
	constructor(e) {
		this.config = e;
	}
	static getInstance(e) {
		return this.instance ??= new a(e), this.instance;
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
	createBasicHeader(e = "", n = "") {
		let r = this.config.getClientId() + ":" + this.config.getClientSecret();
		return e && n && (r = e + ":" + n), t.BASIC + ie.encode(r);
	}
	createClientData(e = "", t = "", n = "") {
		let r = {
			client_id: "",
			client_secret: ""
		};
		return e && t ? (r.client_id = e, r.client_secret = t) : (r.client_id = this.config.getClientId(), r.client_secret = this.config.getClientSecret()), n && S(r, { scope: n }), r;
	}
	createOAuth2Data(e, t, n = !1) {
		let r = { grant_type: e };
		return b(t) || S(r, t), n && S(r, { scope: "openid" }), r;
	}
	signOut(e, t = "", n = "") {
		return this.config.getHttp().put(this.getOAuth2SignOutAddress(), { accessToken: e }, { contentType: i.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(t, n) } });
	}
	revoke(e, t = "", n = "") {
		return this.config.getHttp().post(this.getOAuth2RevokeAddress(), { token: e }, { contentType: i.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(t, n) } });
	}
	refreshTokenFlow(t, n = !1, r = "", a = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.REFRESH_TOKEN, { refresh_token: t }, n), { contentType: i.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(r, a) } });
	}
	passwordFlow(t, n, r = !1, a = "", o = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.PASSWORD, {
			username: t,
			password: n
		}, r), { contentType: i.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(a, o) } });
	}
	authorizationCodeRequestFlow(e, t, n = "openid") {
		let r = `?response_type=code&client_id=${this.config.getClientId()}&client_secret=${this.config.getClientSecret()}&redirect_uri=${t}&scope=${n}`, i = this.config.getProject(), a = e;
		return te(a, "/") && (a = a.substring(0, a.length - 1)), i && (i === "dante" || i === "herodotus") && (a += this.config.getUaa(!1)), a + "/oauth2/authorize" + r;
	}
	authorizationCodeFlow(t, n, r = "", a = !1, o = "", s = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.AUTHORIZATION_CODE, {
			code: t,
			state: r,
			redirect_uri: n
		}, a), { contentType: i.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(o, s) } });
	}
	clientCredentialsFlow(t = "", n = "", r = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.CLIENT_CREDENTIALS, { ...this.createClientData(t, n, r) }), { contentType: i.URL_ENCODED });
	}
	deviceCodeFlow(t, n = "", r = "", a = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.DEVICE_CODE, {
			device_code: t,
			...this.createClientData(n, r, a)
		}), { contentType: i.URL_ENCODED });
	}
	deviceAuthorizationFlow(e = "", t = "", r = n.EMAIL) {
		return this.config.getHttp().post(this.getOAuth2DeviceAuthorizationAddress(), this.createClientData(e, t, r), { contentType: i.URL_ENCODED });
	}
	socialCredentialsFlowBySms(t, n, r = !1, a = "", o = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.SOCIAL_CREDENTIALS, {
			mobile: t,
			code: n,
			source: A.SMS
		}, r), { contentType: i.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(a, o) } });
	}
	socialCredentialsFlowByJustAuth(t, n, r = !1, a = "", o = "") {
		return this.config.getHttp().post(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.SOCIAL_CREDENTIALS, {
			...n,
			source: t
		}, r), { contentType: i.URL_ENCODED }, { headers: { Authorization: this.createBasicHeader(a, o) } });
	}
	webAuthnCredentialsFlow(t, n = !1, r = "", a = "") {
		return this.config.getHttp().postWithParams(this.getOAuth2TokenAddress(), this.createOAuth2Data(e.WEBAUTHN_CREDENTIALS, {}, n), { ...t }, { contentType: i.JSON }, { headers: { Authorization: this.createBasicHeader(r, a) } });
	}
	oidcClientRegistrationFlow(t, i) {
		return this.config.getHttp().post(this.getOIDCConnectRegisterAddress(), {
			product_key: t,
			grant_types: [e.CLIENT_CREDENTIALS, e.DEVICE_CODE],
			redirect_uris: ["http://192.168.101.10:3000"],
			client_name: i,
			scope: [
				n.OPENID,
				n.EMAIL,
				n.PROFILE
			].join(" "),
			response_types: ["token"],
			token_endpoint_auth_method: r.CLIENT_SECRET_POST
		});
	}
}, me = class e {
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
		return t === k.WORD_CLICK ? i.coordinates = n : t === k.JIGSAW ? i.coordinate = n : i.characters = n, this.config.getHttp().post(r, i);
	}
	createVerificationCode(e) {
		let t = this.config.getUpms() + "/open/identity/verification-code";
		return this.config.getHttp().post(t, { mobile: e }, { contentType: i.URL_ENCODED });
	}
	getSocialList() {
		let e = this.config.getUpms() + "/open/identity/sources";
		return this.config.getHttp().get(e);
	}
}, he = class e extends s {
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
		return me.getInstance(this.config);
	}
	oauth2() {
		return pe.getInstance(this.config);
	}
	passkey() {
		return he.getInstance(this.config);
	}
}, Y = m("Crypto", {
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
			this.key = o.encrypt(e, G.getSecurityKey());
		},
		getKey() {
			return o.decrypt(this.key, G.getSecurityKey());
		},
		encrypt(e) {
			let t = this.getKey();
			return o.encrypt(e, t);
		},
		decrypt(e) {
			let t = this.getKey();
			return o.decrypt(e, t);
		},
		exchange(e = "") {
			return new Promise((t, n) => {
				J.getInstance().open().createSession(e).then((e) => {
					let n = e.data;
					if (n) {
						let e = n.sessionId, r = n.publicKey;
						this.state = n.state;
						let i = a.createKeyPair(), o = a.encrypt(i.publicKey, r);
						J.getInstance().open().exchange(e, o).then((n) => {
							let r = n.data, o = a.decrypt(r, i.privateKey);
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
}), X = m("Authentication", {
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
		isNotExpired: (e) => u(u().add(e.expires_in, "seconds").valueOf()).add(1, "seconds").diff(u(), "seconds") !== 0,
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
				let t = h(this.idToken);
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
}), ge = () => {
	let e = X(), n = Y(), r = e.access_token, i = n.sessionId, a = {};
	r && (a.Authorization = t.BEARER + r), i && (a["X-Herodotus-Session-Id"] = i);
	let o = G.getTenantId();
	return o && (a["X-Herodotus-Tenant-Id"] = o), a["X-Herodotus-Api-Version"] = "v1", a;
}, Z = m("SystemSettings", {
	state: () => ({
		theme: {
			mode: c.SYSTEM,
			dark: { primary: "#2563eb" },
			light: { primary: "#6750A4" }
		},
		layout: O.DEFAULT,
		effect: { isUniqueOpened: !1 },
		display: {
			isTabsView: !0,
			isActivateLeftTab: !0,
			showBreadcrumbs: !0,
			showBreadcrumbsIcon: !0,
			table: { dense: !1 }
		}
	}),
	getters: {
		isDark: (e) => e.theme.mode === c.DARK,
		isLight: (e) => e.theme.mode === c.LIGHT,
		isSystem: (e) => e.theme.mode === c.SYSTEM,
		isDarkenMode: (e) => e.theme.mode !== c.LIGHT,
		isLightenMode: (e) => e.theme.mode === c.LIGHT,
		density: (e) => e.display.table.dense ? "compact" : "default",
		densitySwitch: (e) => (t, n) => e.display.table.dense ? t : n
	},
	actions: {
		toDark() {
			this.theme.mode = c.DARK;
		},
		toLight() {
			this.theme.mode = c.LIGHT;
		},
		toSystem() {
			this.theme.mode = c.SYSTEM;
		}
	},
	persist: !0
}), Q = m("SystemElement", {
	state: () => ({
		appMenus: [],
		personalMenus: [],
		cachedRoutes: [],
		details: /* @__PURE__ */ new Map(/* @__PURE__ */ new Map()),
		pushParams: {}
	}),
	getters: { isDynamicRouteAdded() {
		return !b(this.appMenus) || !b(this.personalMenus);
	} },
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
		addMenus(e, t) {
			b(e) || (this.appMenus = e), b(t) || (this.personalMenus = t);
		},
		hasParameter(e) {
			let t = e.name;
			return !!(t && ne(this.pushParams, t));
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
}), $ = m("TabsView", {
	state: () => ({
		tabs: [],
		activatedTab: {},
		activatedTabName: ""
	}),
	getters: {
		isNotLastTab: (e) => (t) => e.tabs.length - 1 !== t,
		getLastTabIndex: (e) => e.tabs.length - 1,
		getTabIndex: (e) => (t) => y(e.tabs, (e) => e.name === t.name),
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
			return y(G.getRoutes(), (t) => t.path === e.path) === -1;
		},
		isTabNotOpened(e) {
			return this.getTabIndex(e) === -1;
		},
		openTab(e, t = !1) {
			this.isNotExistInStaticRoute(e) && (this.isTabNotOpened(e) && (t ? this.isLastTabActivated ? this.tabs.splice(this.getActivatedTabIndex, 0, e) : this.tabs.splice(this.getActivatedTabIndex + 1, 0, e) : this.tabs.push(e)), this.setActivatedTab(e));
		},
		closeTab(e) {
			C(this.tabs, (t) => t.name === e.name);
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
			C(this.tabs, (e) => e.name !== this.activatedTab.name);
		},
		closeLeftTabs() {
			let e = this.getActivatedTabIndex;
			C(this.tabs, (t, n) => n < e);
		},
		closeRightTabs() {
			let e = this.getActivatedTabIndex;
			C(this.tabs, (t, n) => n > e);
		}
	},
	persist: !0
});
//#endregion
//#region src/lib/hooks/useEditFinish.ts
function _e() {
	let e = p(), t = Q(), n = $();
	return { onFinish: () => {
		let r = e.name;
		t.removeRoutePushParam(r), n.deleteTab(e), K.getInstance().goBack();
	} };
}
//#endregion
//#region src/lib/hooks/useDeviceAuthorize.ts
function ve(e, t, n, r = "") {
	let i = E(0), a = E(5), o = E(!1), s = E(!1), c = E({}), l = T([]), u = (e, t = !1) => {
		let n = l.value.length + 1;
		t ? l.value.push({
			id: n,
			icon: "mdi-information",
			color: "green",
			text: e
		}) : l.value.push({
			id: n,
			icon: "mdi-alert-circle",
			color: "error",
			text: e
		});
	}, d = (e) => {
		e === "authorization_pending" ? u("Authorization pending, continuing to poll...") : e === "slow_down" ? (u("Slowing down..."), h()) : e === "token_expired" ? (u("Token expired, stopping..."), m(), s.value = !0) : e === "access_denied" && (u("Access denied, stopping..."), m(), s.value = !0);
	}, f = () => {
		J.getInstance().oauth2().deviceCodeFlow(e.value, t.value, n.value, r).then((e) => {
			u("Authorization successful", !0), m(), o.value = !0, c.value = e;
		}).catch((e) => {
			d(e.error);
		});
	}, p = () => {
		i.value = window.setInterval(f, a.value * 1e3);
	}, m = () => {
		window.clearInterval(i.value);
	}, h = () => {
		a.value += 5, m(), p();
	};
	return {
		pullingResponse: l,
		successResponse: c,
		isFailed: s,
		isSuccess: o,
		schedule: p,
		clear: m,
		slowDown: h
	};
}
//#endregion
//#region src/lib/hooks/usePasskey.ts
function ye() {
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
function be(e, t, n) {
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
	}), l = (e) => b(e.appMenus) ? b(e.personalMenus) ? [] : e.personalMenus : e.appMenus, u = (e, t, n = !1) => {
		let r = Q(), i = [], d = [], f = [];
		return e.forEach((e) => {
			let p = o(e, t);
			a(p) && r.addDetailRoute(p);
			let m = {};
			if (e.children && e.children.length > 0) {
				let r = u(e.children, t, e.meta.isHideAllChild);
				if (p.children = r.routeRecords, n) m = s(p);
				else {
					let e = l(r);
					b(e) ? m = s(p) : (m = c(p), m.children = e);
				}
			} else n || (m = s(p));
			i.push(p), b(m) || (e.scenario === j.APP ? d.push(m) : f.push(m));
		}), {
			routeRecords: i,
			appMenus: d,
			personalMenus: f
		};
	}, d = (e, t) => {
		console.log("[Herodotus] |- Begin add dynamic routes"), Q().addMenus(t.appMenus, t.personalMenus), b(t.routeRecords) ? console.warn("[Herodotus] |- Dynamic routes is empty, skip!") : (t.routeRecords.forEach((t) => {
			e.addRoute(t);
		}), console.log("[Herodotus] |- Dynamic routes add success!"));
	};
	return { initBackendSecurity: async (t, r) => {
		let i = (await n(r)).data.menus;
		d(t, u(i, e));
	} };
}
//#endregion
//#region ../../node_modules/.pnpm/vuetify@4.0.2_typescript@5._225df24ec83f4de4927a86305cf2f94e/node_modules/vuetify/lib/util/getCurrentInstance.js
function xe(e, t) {
	let n = ae();
	if (!n) throw Error(`[Vuetify] ${e} ${t || "must be called from inside a setup function"}`);
	return n;
}
//#endregion
//#region ../../node_modules/.pnpm/vuetify@4.0.2_typescript@5._225df24ec83f4de4927a86305cf2f94e/node_modules/vuetify/lib/composables/theme.js
var Se = Symbol.for("vuetify:theme");
String;
function Ce() {
	xe("useTheme");
	let e = oe(Se, null);
	if (!e) throw Error("Could not find Vuetify theme injection");
	return e;
}
//#endregion
//#region src/lib/hooks/useSystemTheme.ts
function we() {
	let e = Z(), t = Ce(), n = E(c.DARK), r = (e) => {
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
		t.style.setProperty("--clip-pos", `${o}px ${s}px`), t.style.removeProperty("--clip-size"), se(() => {
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
	D(() => {
		t.change(e.isSystem ? n.value : e.theme.mode);
	}), ce(t.global.name, (e) => {
		i();
		let t = e;
		f.setTheme(t), d.setTheme(t);
	});
	let a = w(() => e.isDarkenMode ? e.theme.dark.primary : e.theme.light.primary);
	return {
		lightColor: w(() => z(a.value, 3)),
		darkColor: w(() => z(a.value, 6)),
		backgroundColor: w(() => {
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
		currentTheme: w({
			get() {
				return e.theme.mode;
			},
			set(t) {
				e.theme.mode = t;
			}
		}),
		cycleChangeThemeIcon: w(() => {
			switch (e.theme.mode) {
				case c.SYSTEM: return "mdi-brightness-5";
				case c.DARK: return "mdi-brightness-auto";
				default: return "mdi-brightness-4";
			}
		}),
		systemTheme: n
	};
}
//#endregion
//#region src/lib/main.ts
var Te = (e) => {
	l(Z().theme.mode), G.initialize(e), K.initialize(e.router), J.initialize(e.config), q.initialize(e.signOutExtension);
};
//#endregion
export { k as CaptchaCategoryEnum, O as LayoutModeEnum, j as MenuScenario, G as OptionsUtilities, K as RouterUtilities, J as SecurityApiResources, q as SignOutUtilities, A as SocialSourceEnum, de as addColorAlpha, B as getAllColorPalette, z as getColorPalette, ge as getSystemHeaders, Te as initializer, fe as isWhiteColor, W as mixColor, le as piniaPluginPersistedstate, ue as useApplicationStore, X as useAuthenticationStore, Y as useCryptoStore, ve as useDeviceAuthorize, _e as useEditFinish, Q as useElementStore, ye as usePasskey, Z as useSettingsStore, be as useSystemElement, we as useSystemTheme, $ as useTabsViewStore };
