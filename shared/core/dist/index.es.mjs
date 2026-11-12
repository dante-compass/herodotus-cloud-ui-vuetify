import e from "axios";
import t from "qs";
import { isEmpty as n, isFunction as r, merge as i, replace as a } from "lodash-es";
import o from "moment";
import "moment/dist/locale/zh-cn";
import { generateFromString as s } from "generate-avatar";
import { sm2 as c, sm4 as l } from "sm-crypto-v2";
import { base64urlnopad as u } from "@scure/base";
import d from "sweetalert2";
// src/enums/index.ts
var f = /* @__PURE__ */ function(e) {
	return e.DARK = "dark", e.LIGHT = "light", e.SYSTEM = "system", e;
}({}), p = /* @__PURE__ */ function(e) {
	return e[e.URL_ENCODED = 0] = "URL_ENCODED", e[e.MULTI_PART = 1] = "MULTI_PART", e[e.TEXT = 2] = "TEXT", e[e.JSON = 3] = "JSON", e;
}({}), m = /* @__PURE__ */ function(e) {
	return e.GET = "GET", e.POST = "POST", e.PUT = "PUT", e.DELETE = "DELETE", e;
}({}), h = /* @__PURE__ */ function(e) {
	return e[e.FORBIDDEN = 0] = "FORBIDDEN", e[e.ENABLE = 1] = "ENABLE", e[e.LOCKING = 2] = "LOCKING", e[e.EXPIRED = 3] = "EXPIRED", e;
}({}), ee = /* @__PURE__ */ function(e) {
	return e.BASIC = "Basic ", e.BEARER = "Bearer ", e;
}({}), g = /* @__PURE__ */ function(e) {
	return e.AUTHORIZATION_CODE = "authorization_code", e.REFRESH_TOKEN = "refresh_token", e.CLIENT_CREDENTIALS = "client_credentials", e.PASSWORD = "password", e.SOCIAL_CREDENTIALS = "social_credentials", e.WEBAUTHN_CREDENTIALS = "webauthn_credentials", e.DEVICE_CODE = "urn:ietf:params:oauth:grant-type:device_code", e.JWT_BEARER = "urn:ietf:params:oauth:grant-type:jwt-bearer", e.TOKEN_EXCHANGE = "urn:ietf:params:oauth:grant-type:token-exchange", e;
}({}), te = /* @__PURE__ */ function(e) {
	return e.CLIENT_SECRET_BASIC = "client_secret_basic", e.CLIENT_SECRET_POST = "client_secret_post", e.CLIENT_SECRET_JWT = "client_secret_jwt", e.PRIVATE_KEY_JWT = "private_key_jwt", e.NONE = "none", e.TLS_CLIENT_AUTH = "tls_client_auth", e.SELF_SIGNED_TLS_CLIENT_AUTH = "self_signed_tls_client_auth", e;
}({}), ne = /* @__PURE__ */ function(e) {
	return e.OPENID = "openid", e.EMAIL = "email", e.PROFILE = "profile", e.PHONE = "phone", e.ADDRESS = "address", e.ROLES = "roles", e.CLIENT_CREATE = "client.create", e.CLIENT_READ = "client.read", e;
}({}), re = /* @__PURE__ */ function(e) {
	return e.ALLOCATABLE = "Allocatable", e.AUTHORIZE = "Authorize", e.CREATE = "Create", e.CONTENT = "Content", e.EDIT = "Edit", e.FILE = "File", e.INFO = "Info", e.INVOKE = "Invoke", e.REVOCATION = "Revocation", e.SETUP = "Setup", e;
}({}), _ = /* @__PURE__ */ new Map(), v = (e) => {
	let n = "";
	return e && (n = typeof e == "string" ? e : e instanceof URLSearchParams ? e.toString() : typeof e == "object" ? t.stringify(e, { sort: (e, t) => e.localeCompare(t) }) : String(e)), n;
}, y = (e) => {
	if (!n(e.params)) {
		let t = v(e.params);
		return [
			e.method,
			e.url,
			t
		].join("|");
	}
	return [e.method, e.url].join("|");
}, b = class {
	addPending(t) {
		this.removePending(t);
		let n = y(t);
		t.cancelToken = t.cancelToken || new e.CancelToken((e) => {
			_.has(n) || _.set(n, e);
		});
	}
	removeAllPending() {
		_.forEach((e) => {
			e && r(e) && e();
		}), _.clear();
	}
	removePending(e) {
		let t = y(e);
		if (_.has(t)) {
			let e = _.get(t);
			e && e(t), _.delete(t);
		}
	}
	reset() {
		_ = /* @__PURE__ */ new Map();
	}
}, x = class {
	axiosInstance;
	defaultAxiosRequestConfig;
	defaultRequestOptions;
	axiosInstanceHooks;
	constructor(e, t, n) {
		this.defaultAxiosRequestConfig = e, this.defaultRequestOptions = n, this.axiosInstanceHooks = t, this.axiosInstance = this.createAxiosInstance(e), this.setupInterceptors();
	}
	createAxiosInstance(t) {
		return e.create(t);
	}
	getDefaultAxiosRequestConfig() {
		return this.defaultAxiosRequestConfig;
	}
	getDefaultRequestOptions() {
		return this.defaultRequestOptions;
	}
	getAxiosInstanceHooks() {
		return this.axiosInstanceHooks;
	}
	getAxiosInstance() {
		return this.axiosInstance;
	}
	setupInterceptors() {
		let e = this.getAxiosInstanceHooks();
		if (!e) return;
		let { requestInterceptors: t, requestInterceptorsError: n, responseInterceptors: r, responseInterceptorsError: i } = e, a = new b();
		this.getAxiosInstance().interceptors.request.use((e) => {
			let n = e.effectiveOptions;
			return n.prohibitRepeatRequests && a.addPending(e), t(e, n);
		}, (e) => n(this.getAxiosInstance(), e)), this.getAxiosInstance().interceptors.response.use((e) => (e && a.removePending(e.config), r(e)), (e) => i(this.getAxiosInstance(), e));
	}
	mergeWithDefaultOptions(e) {
		let t = this.getDefaultRequestOptions();
		return n(e) ? t : i({}, t, e);
	}
	mergeWithDefaultConfig(e) {
		let r = this.getDefaultAxiosRequestConfig(), a = i({}, r, { paramsSerializer: { serialize(e) {
			return t.stringify(e, { arrayFormat: "brackets" });
		} } });
		return n(e) ? a : i({}, a, e);
	}
	createHttpHeaderPolicy(e) {
		switch (e) {
			case p.URL_ENCODED: return {
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				dataConvert: (e) => t.stringify(e, { arrayFormat: "brackets" })
			};
			case p.MULTI_PART: return {
				headers: { "Content-Type": "multipart/form-data" },
				dataConvert: (e) => e
			};
			default: return {
				headers: { "Content-Type": "application/json" },
				dataConvert: (e) => JSON.stringify(e)
			};
		}
	}
	setupRequest(e, t, a) {
		let { onRequestHook: o } = this.getAxiosInstanceHooks(), s = this.mergeWithDefaultOptions(a), c = this.mergeWithDefaultConfig(t);
		o && r(o) && (c = o(c, s));
		let l = this.createHttpHeaderPolicy(s.contentType);
		return c.headers ? c.headers = i(c.headers, l.headers) : c.headers = l.headers, n(c.data) || (c.data = l.dataConvert(c.data)), c.url = e, c.effectiveOptions = s, {
			config: c,
			options: s
		};
	}
	request(e, t) {
		return new Promise((n, i) => {
			let { onResponseErrorHook: a, onResponseSuccessHook: o } = this.getAxiosInstanceHooks();
			this.getAxiosInstance().request(e).then((e) => {
				o && r(o) ? n(o(e, t)) : n(e);
			}).catch((e) => {
				a && r(a) ? i(a(e, t)) : i(e);
			});
		});
	}
	process(e, t, n = {}) {
		let r = this.setupRequest(e, t, n);
		return this.request(r.config, r.options);
	}
	get(e, t = {}, n = { contentType: p.JSON }) {
		return this.process(e, {
			params: t,
			method: m.GET
		}, n);
	}
	post(e, t, n = { contentType: p.JSON }, r) {
		return this.process(e, {
			...r,
			data: t,
			method: m.POST
		}, n);
	}
	postWithParams(e, t, n = {}, r = { contentType: p.JSON }, i) {
		return this.process(e, {
			...i,
			params: t,
			data: n,
			method: m.POST
		}, r);
	}
	put(e, t, n = { contentType: p.JSON }, r) {
		return this.process(e, {
			...r,
			data: t,
			method: m.PUT
		}, n);
	}
	putWithParams(e, t, n = {}, r = { contentType: p.JSON }, i) {
		return this.process(e, {
			...i,
			params: t,
			data: n,
			method: m.PUT
		}, r);
	}
	delete(e, t = {}, n = { contentType: p.JSON }) {
		return this.process(e, {
			data: t,
			method: m.DELETE
		}, n);
	}
	deleteWithParams(e, t, n = {}, r = { contentType: p.JSON }) {
		return this.process(e, {
			params: t,
			data: n,
			method: m.DELETE
		}, r);
	}
}, ie = (e, t) => {
	let n = {};
	n = "statusText" in e ? e.data : e;
	let r = {
		status: e.status,
		code: 0,
		detail: ""
	};
	return r.code = n && n.code ? n.code : 0, r.detail = n.error && n.error.detail ? n.error.detail : "", n.message ? r.message = n.message : n.error && n.error.message ? r.message = n.error.message : t && (r.message = t), r;
}, S = (e) => {
	let n = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`;
	console.log("%c┍------------------------------------------------------------------------------------------┑", `color:${n};`), "config" in e ? (console.log("| 请求地址：", e.config.url), console.log("| 请求类型：", e.config.method ? e.config.method.toUpperCase() : ""), console.log("| 请求参数：", t.parse(e.config.params)), console.log("| 响应数据：", e.data)) : "status" in e ? console.log("| 响应数据：", e.data) : console.log("| 响应数据：", e), console.log("%c┕------------------------------------------------------------------------------------------┙", `color:${n};`);
}, ae = (e) => e && "statusText" in e ? /^(2|3)\d{2}$/.test(String(e.status)) : !1, oe = class {
	http = {};
	project = "";
	clientId = "";
	clientSecret = "";
	oidc = !1;
	uaaAddress = "";
	upmsAddress = "";
	msgAddress = "";
	ossAddress = "";
	bpmnAddress = "";
	cmdbAddress = "";
	iotAddress = "";
	manageAddress = "";
	proxy = "";
	constructor(e, t) {
		this.http = e, this.project = t.project, this.clientId = t.clientId, this.clientSecret = t.clientSecret, this.oidc = t.oidc ? t.oidc : !1, this.proxy = t.proxy ? t.proxy : "/api", this.switch(t.project);
	}
	switch(e) {
		switch (e) {
			case "dante":
				this.uaaAddress = "/dante-cloud-uaa", this.upmsAddress = "/dante-cloud-upms", this.msgAddress = "/dante-cloud-message", this.ossAddress = "/dante-cloud-oss-ability", this.bpmnAddress = "/dante-cloud-bpmn-ability/engine-rest", this.cmdbAddress = "/dante-cloud-cmdb-ability", this.iotAddress = "/dante-cloud-iot-ability", this.manageAddress = "/dante-cloud-manage-ability";
				break;
			case "herodotus":
				this.uaaAddress = "/herodotus-cloud-uaa", this.upmsAddress = "/herodotus-cloud-upms", this.msgAddress = "/herodotus-cloud-message", this.ossAddress = "/herodotus-cloud-oss-ability", this.bpmnAddress = "/herodotus-cloud-bpmn-ability/engine-rest", this.cmdbAddress = "/herodotus-cloud-cmdb-ability", this.iotAddress = "/herodotus-cloud-iot-ability", this.manageAddress = "/herodotus-cloud-manage-ability";
				break;
			default: this.uaaAddress = "", this.upmsAddress = "", this.msgAddress = "", this.ossAddress = "", this.bpmnAddress = "/engine-rest", this.cmdbAddress = "", this.iotAddress = "", this.manageAddress = "";
		}
	}
	getProject() {
		return this.project;
	}
	getClientSecret() {
		return this.clientSecret;
	}
	getClientId() {
		return this.clientId;
	}
	isOidc() {
		return this.oidc;
	}
	getProxy() {
		return this.proxy;
	}
	getHttp() {
		return this.http;
	}
	processProxy(e, t = !0) {
		return t ? this.proxy + e : e;
	}
	getUaa(e = !0) {
		return this.processProxy(this.uaaAddress, e);
	}
	getUpms(e = !0) {
		return this.processProxy(this.upmsAddress, e);
	}
	getMsg(e = !0) {
		return this.processProxy(this.msgAddress, e);
	}
	getOss(e = !0) {
		return this.processProxy(this.ossAddress, e);
	}
	getBpmn(e = !0, t = !1) {
		let n = this.processProxy(this.bpmnAddress, e);
		return t ? a(n, "engine-rest", "camunda-extended") : n;
	}
	getCmdb(e = !0) {
		return this.processProxy(this.cmdbAddress, e);
	}
	getIot(e = !0) {
		return this.processProxy(this.iotAddress, e);
	}
	getManage(e = !0) {
		return this.processProxy(this.manageAddress, e);
	}
}, C = class {
	config;
	constructor(e) {
		this.config = e;
	}
	getConfig() {
		return this.config;
	}
	getParamPath(e, t) {
		return e + "/" + t;
	}
	getIdPath(e) {
		return this.getParamPath(this.getBaseAddress(), e);
	}
}, se = class extends C {
	getConditionAddress() {
		return this.getBaseAddress() + "/condition";
	}
	getListAddress() {
		return this.getBaseAddress() + "/list";
	}
	getTreeAddress() {
		return this.getBaseAddress() + "/tree";
	}
	fetch(e = {}) {
		return this.getConfig().getHttp().get(this.getBaseAddress(), e);
	}
	fetchByPage(e, t = {}) {
		if (n(t)) return this.getConfig().getHttp().get(this.getBaseAddress(), e);
		{
			let n = Object.assign(e, t);
			return this.getConfig().getHttp().get(this.getConditionAddress(), n);
		}
	}
	fetchAll(e = {}) {
		return this.getConfig().getHttp().get(this.getListAddress(), e);
	}
	fetchTree(e = {}) {
		return this.getConfig().getHttp().get(this.getTreeAddress(), e);
	}
	deleteById(e) {
		return this.getConfig().getHttp().delete(this.getIdPath(e));
	}
	saveOrUpdate(e) {
		return this.getConfig().getHttp().post(this.getBaseAddress(), e);
	}
	assign(e) {
		return this.getConfig().getHttp().put(this.getBaseAddress(), e, { contentType: p.URL_ENCODED });
	}
}, ce = typeof window < "u";
// src/lib/utils/moment.ts
o.locale("zh-cn");
var le = class e {
	static instance = new e();
	constructor() {}
	static getInstance() {
		return this.instance;
	}
	generate(e) {
		return `data:image/svg+xml;utf8,${s(e)}`;
	}
}.getInstance(), ue = class e {
	static instance = new e();
	cipherMode = 1;
	constructor() {}
	static getInstance() {
		return this.instance;
	}
	createKeyPair() {
		return c.generateKeyPairHex();
	}
	encrypt(e, t) {
		return "04" + c.doEncrypt(e, t, this.cipherMode);
	}
	decrypt(e, t) {
		let n = e.substring(2).toLocaleLowerCase();
		return c.doDecrypt(n, t, this.cipherMode, { output: "string" });
	}
}, de = class e {
	static instance = new e();
	constructor() {}
	static getInstance() {
		return this.instance;
	}
	encrypt(e, t) {
		return l.encrypt(e, t, { output: "string" });
	}
	decrypt(e, t) {
		return l.decrypt(e, t, { output: "string" });
	}
}, fe = ue.getInstance(), pe = de.getInstance();
// ../../node_modules/.pnpm/@noble+hashes@2.4.0/node_modules/@noble/hashes/utils.js
function w(e) {
	return e instanceof Uint8Array || ArrayBuffer.isView(e) && e.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in e && e.BYTES_PER_ELEMENT === 1;
}
var T = (e) => e ? `"${e}" ` : "";
function E(e, t = "") {
	if (typeof e != "number") throw TypeError(T(t) + "expected number, got " + typeof e);
	if (!Number.isSafeInteger(e) || e < 0) throw RangeError(T(t) + "expected integer >= 0, got " + e);
	return e;
}
function D(e, t, n = "") {
	if (w(e) && (t === void 0 || e.length === t)) return e;
	t !== void 0 && E(t, "length");
	let r = w(e), i = t === void 0 ? "" : ` of length ${t}`, a = r ? `length=${e.length}` : `type=${typeof e}`, o = T(n) + "expected Uint8Array" + i + ", got " + a;
	throw r ? RangeError(o) : TypeError(o);
}
function me(e) {
	if (typeof e != "function" || typeof e.create != "function") throw TypeError("expected hash wrapped by utils.createHasher");
	if (E(e.outputLen), E(e.blockLen), e.outputLen < 1 || e.blockLen < 1) throw Error("hash blockLen / outputLen must be >= 1");
}
var he = (e, t) => {
	if (typeof e != "object" || !e || Array.isArray(e)) throw TypeError((t === "object" ? "" : `"${t}" `) + "expected object, got type=" + typeof e);
}, O = (e, t) => {
	he(e, t);
	let n = Object.getPrototypeOf(e);
	if (n !== Object.prototype && n !== null) throw TypeError(`"${t}" expected plain object`);
	if (Object.hasOwn(e, "__proto__")) throw TypeError(`"${t}.__proto__" is not allowed`);
};
function k(e, t = !0) {
	if (e.destroyed) throw Error("hash was destroyed");
	if (t && e.finished) throw Error("digest() was already called");
}
function A(e, t) {
	D(e, void 0, "output");
	let n = t.outputLen;
	if (!(e.length >= n)) throw RangeError("\"output\" expected length >= " + n);
}
function j(...e) {
	for (let t = 0; t < e.length; t++) e[t].fill(0);
}
function M(e) {
	return new DataView(e.buffer, e.byteOffset, e.byteLength);
}
function N(e, t) {
	return e << 32 - t | e >>> t;
}
function P(e, t) {
	return e << t | e >>> 32 - t >>> 0;
}
var F = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function", I = /* @__PURE__ */ Array.from({ length: 256 }, (e, t) => t.toString(16).padStart(2, "0"));
function L(e) {
	if (D(e), F) return e.toHex();
	let t = "";
	for (let n = 0; n < e.length; n++) t += I[e[n]];
	return t;
}
function R(e) {
	if (typeof e != "string") throw TypeError("string expected");
	let t = new TextEncoder().encode(e);
	try {
		return new Uint8Array(t);
	} finally {
		j(t);
	}
}
function ge(e, t, n = "opts") {
	return O(e, "defaults"), t !== void 0 && O(t, n), Object.assign(Object.create(null), e, t);
}
function z(e, t = {}) {
	if (typeof e != "function") throw TypeError("\"hashCons\" expected function, got type=" + typeof e);
	t = ge({}, t, "info");
	let n = (t, n) => e(n).update(t).digest(), r = e(void 0);
	return n.outputLen = r.outputLen, n.blockLen = r.blockLen, n.canXOF = r.canXOF, n.create = (t) => e(t), Object.assign(n, t), Object.freeze(n);
}
function _e(e = 32) {
	E(e, "bytesLength");
	let t = typeof globalThis == "object" ? globalThis.crypto : null;
	if (typeof t?.getRandomValues != "function") throw Error("crypto.getRandomValues must be defined");
	if (e > 65536) throw RangeError(`"bytesLength" expected <= 65536, got ${e}`);
	return t.getRandomValues(new Uint8Array(e));
}
var ve = (e) => ({ oid: Uint8Array.from([
	6,
	9,
	96,
	134,
	72,
	1,
	101,
	3,
	4,
	2,
	e
]) }), B = class {
	oHash;
	iHash;
	blockLen;
	outputLen;
	canXOF = !1;
	finished = !1;
	destroyed = !1;
	constructor(e, t) {
		if (me(e), D(t, void 0, "key"), this.iHash = e.create(), typeof this.iHash.update != "function") throw Error("expected Hash instance");
		this.blockLen = this.iHash.blockLen, this.outputLen = this.iHash.outputLen;
		let n = this.blockLen, r = new Uint8Array(n);
		r.set(t.length > n ? e.create().update(t).digest() : t);
		for (let e = 0; e < r.length; e++) r[e] ^= 54;
		this.iHash.update(r), this.oHash = e.create();
		for (let e = 0; e < r.length; e++) r[e] ^= 106;
		this.oHash.update(r), j(r);
	}
	update(e) {
		return k(this), this.iHash.update(e), this;
	}
	digestInto(e) {
		k(this), A(e, this), this.finished = !0;
		let t = e.subarray(0, this.outputLen);
		this.iHash.digestInto(t), this.oHash.update(t), this.oHash.digestInto(t), this.destroy();
	}
	digest() {
		let e = new Uint8Array(this.oHash.outputLen);
		return this.digestInto(e), e;
	}
	_cloneInto(e) {
		e ||= Object.create(Object.getPrototypeOf(this), {});
		let { oHash: t, iHash: n, finished: r, destroyed: i, blockLen: a, outputLen: o, canXOF: s } = this;
		return e = e, e.finished = r, e.destroyed = i, e.blockLen = a, e.outputLen = o, e.canXOF = s, e.oHash = t._cloneInto(e.oHash), e.iHash = n._cloneInto(e.iHash), e;
	}
	clone() {
		return this._cloneInto();
	}
	destroy() {
		this.destroyed = !0, this.oHash.destroy(), this.iHash.destroy();
	}
}, V = /* @__PURE__ */ (() => {
	let e = ((e, t, n) => new B(e, t).update(n).digest());
	return e.create = (e, t) => new B(e, t), e;
})(), ye = (e) => e / 2 ** 32 | 0, be = (e) => e >>> 0;
function xe(e, t, n, r) {
	let i = ye(n), a = be(n);
	e.setUint32(t, r ? a : i, r), e.setUint32(t + 4, r ? i : a, r);
}
// ../../node_modules/.pnpm/@noble+hashes@2.4.0/node_modules/@noble/hashes/_md.js
function H(e, t, n) {
	return e & t ^ ~e & n;
}
function U(e, t, n) {
	return e & t ^ e & n ^ t & n;
}
var W = class {
	blockLen;
	outputLen;
	canXOF = !1;
	padOffset;
	isLE;
	buffer;
	view;
	finished = !1;
	length = 0;
	pos = 0;
	destroyed = !1;
	constructor(e, t, n, r) {
		this.blockLen = e, this.outputLen = t, this.padOffset = n, this.isLE = r, this.buffer = new Uint8Array(e), this.view = M(this.buffer);
	}
	update(e) {
		k(this), D(e);
		let { view: t, buffer: n, blockLen: r } = this, i = e.length, a = !1;
		for (let o = 0; o < i;) {
			let s = Math.min(r - this.pos, i - o);
			if (s === r) {
				let t = M(e);
				for (; r <= i - o; o += r) this.process(t, o);
				a = !0;
			} else n.set(o === 0 && s === i ? e : e.subarray(o, o + s), this.pos), this.pos += s, o += s, this.pos === r && (this.process(t, 0), this.pos = 0, a = !0);
		}
		return this.length += e.length, a && this.roundClean(), this;
	}
	digestInto(e) {
		k(this), A(e, this), this.finished = !0;
		let { buffer: t, view: n, blockLen: r, isLE: i } = this, { pos: a } = this;
		t[a++] = 128, t.fill(0, a), this.padOffset > r - a && (this.process(n, 0), t.fill(0)), xe(n, r - 8, this.length * 8, i), this.process(n, 0), this.roundClean();
		let o = e === t ? n : M(e), s = this.outputLen, c = s / 4, l = this.get();
		if (s % 4 || c > l.length) throw Error("invalid outputLen");
		for (let e = 0; e < c; e++) o.setUint32(4 * e, l[e], i);
	}
	digest() {
		let { buffer: e, outputLen: t } = this;
		this.digestInto(e);
		let n = e.slice(0, t);
		return this.destroy(), n;
	}
	_cloneIntoMeta(e) {
		let { buffer: t, length: n, finished: r, destroyed: i, pos: a } = this;
		return e.destroyed = i, e.finished = r, e.length = n, e.pos = a, a && e.buffer.set(t), e;
	}
	clone() {
		return this._cloneInto();
	}
}, Se = /* @__PURE__ */ Uint32Array.from([
	1779033703,
	3144134277,
	1013904242,
	2773480762,
	1359893119,
	2600822924,
	528734635,
	1541459225
]), Ce = /* @__PURE__ */ Uint32Array.from([
	1116352408,
	1899447441,
	3049323471,
	3921009573,
	961987163,
	1508970993,
	2453635748,
	2870763221,
	3624381080,
	310598401,
	607225278,
	1426881987,
	1925078388,
	2162078206,
	2614888103,
	3248222580,
	3835390401,
	4022224774,
	264347078,
	604807628,
	770255983,
	1249150122,
	1555081692,
	1996064986,
	2554220882,
	2821834349,
	2952996808,
	3210313671,
	3336571891,
	3584528711,
	113926993,
	338241895,
	666307205,
	773529912,
	1294757372,
	1396182291,
	1695183700,
	1986661051,
	2177026350,
	2456956037,
	2730485921,
	2820302411,
	3259730800,
	3345764771,
	3516065817,
	3600352804,
	4094571909,
	275423344,
	430227734,
	506948616,
	659060556,
	883997877,
	958139571,
	1322822218,
	1537002063,
	1747873779,
	1955562222,
	2024104815,
	2227730452,
	2361852424,
	2428436474,
	2756734187,
	3204031479,
	3329325298
]), G = /* @__PURE__ */ new Uint32Array(64), we = class extends W {
	A = 0;
	B = 0;
	C = 0;
	D = 0;
	E = 0;
	F = 0;
	G = 0;
	H = 0;
	constructor(e, t) {
		super(64, e, 8, !1), this.A = t[0] | 0, this.B = t[1] | 0, this.C = t[2] | 0, this.D = t[3] | 0, this.E = t[4] | 0, this.F = t[5] | 0, this.G = t[6] | 0, this.H = t[7] | 0;
	}
	get() {
		let { A: e, B: t, C: n, D: r, E: i, F: a, G: o, H: s } = this;
		return [
			e,
			t,
			n,
			r,
			i,
			a,
			o,
			s
		];
	}
	set(e, t, n, r, i, a, o, s) {
		this.A = e | 0, this.B = t | 0, this.C = n | 0, this.D = r | 0, this.E = i | 0, this.F = a | 0, this.G = o | 0, this.H = s | 0;
	}
	_cloneInto(e) {
		return (e ||= new this.constructor()).set(...this.get()), this._cloneIntoMeta(e);
	}
	process(e, t) {
		for (let n = 0; n < 16; n++, t += 4) G[n] = e.getUint32(t, !1);
		for (let e = 16; e < 64; e++) {
			let t = G[e - 15], n = G[e - 2], r = N(t, 7) ^ N(t, 18) ^ t >>> 3, i = N(n, 17) ^ N(n, 19) ^ n >>> 10;
			G[e] = i + G[e - 7] + r + G[e - 16] | 0;
		}
		let { A: n, B: r, C: i, D: a, E: o, F: s, G: c, H: l } = this;
		for (let e = 0; e < 64; e++) {
			let t = N(o, 6) ^ N(o, 11) ^ N(o, 25), u = l + t + H(o, s, c) + Ce[e] + G[e] | 0, d = (N(n, 2) ^ N(n, 13) ^ N(n, 22)) + U(n, r, i) | 0;
			l = c, c = s, s = o, o = a + u | 0, a = i, i = r, r = n, n = u + d | 0;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, s = s + this.F | 0, c = c + this.G | 0, l = l + this.H | 0, this.set(n, r, i, a, o, s, c, l);
	}
	roundClean() {
		j(G);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0, 0, 0, 0, 0), j(this.buffer);
	}
}, Te = class extends we {
	constructor() {
		super(32, Se);
	}
}, K = /* @__PURE__ */ z(() => new Te(), /* @__PURE__ */ ve(1)), q = /* @__PURE__ */ Uint32Array.from([
	1732584193,
	4023233417,
	2562383102,
	271733878,
	3285377520
]), J = /* @__PURE__ */ new Uint32Array(80), Ee = class extends W {
	A = q[0] | 0;
	B = q[1] | 0;
	C = q[2] | 0;
	D = q[3] | 0;
	E = q[4] | 0;
	constructor() {
		super(64, 20, 8, !1);
	}
	get() {
		let { A: e, B: t, C: n, D: r, E: i } = this;
		return [
			e,
			t,
			n,
			r,
			i
		];
	}
	set(e, t, n, r, i) {
		this.A = e | 0, this.B = t | 0, this.C = n | 0, this.D = r | 0, this.E = i | 0;
	}
	_cloneInto(e) {
		return (e ||= new this.constructor()).set(...this.get()), this._cloneIntoMeta(e);
	}
	process(e, t) {
		for (let n = 0; n < 16; n++, t += 4) J[n] = e.getUint32(t, !1);
		for (let e = 16; e < 80; e++) J[e] = P(J[e - 3] ^ J[e - 8] ^ J[e - 14] ^ J[e - 16], 1);
		let { A: n, B: r, C: i, D: a, E: o } = this;
		for (let e = 0; e < 80; e++) {
			let t, s;
			e < 20 ? (t = H(r, i, a), s = 1518500249) : e < 40 ? (t = r ^ i ^ a, s = 1859775393) : e < 60 ? (t = U(r, i, a), s = 2400959708) : (t = r ^ i ^ a, s = 3395469782);
			let c = P(n, 5) + t + o + s + J[e] | 0;
			o = a, a = i, i = P(r, 30), r = n, n = c;
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, o = o + this.E | 0, this.set(n, r, i, a, o);
	}
	roundClean() {
		j(J);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0, 0), j(this.buffer);
	}
}, De = /* @__PURE__ */ z(() => new Ee()), Oe = 2 ** 32, ke = /* @__PURE__ */ Array.from({ length: 64 }, (e, t) => Math.floor(Oe * Math.abs(Math.sin(t + 1)))), Y = /* @__PURE__ */ q.slice(0, 4), X = /* @__PURE__ */ new Uint32Array(16), Ae = /* @__PURE__ */ (() => {
	let e = [
		[
			7,
			12,
			17,
			22
		],
		[
			5,
			9,
			14,
			20
		],
		[
			4,
			11,
			16,
			23
		],
		[
			6,
			10,
			15,
			21
		]
	];
	return Uint8Array.from({ length: 64 }, (t, n) => e[Math.floor(n / 16)][n % 4]);
})(), je = class extends W {
	A = Y[0] | 0;
	B = Y[1] | 0;
	C = Y[2] | 0;
	D = Y[3] | 0;
	constructor() {
		super(64, 16, 8, !0);
	}
	get() {
		let { A: e, B: t, C: n, D: r } = this;
		return [
			e,
			t,
			n,
			r
		];
	}
	set(e, t, n, r) {
		this.A = e | 0, this.B = t | 0, this.C = n | 0, this.D = r | 0;
	}
	_cloneInto(e) {
		return (e ||= new this.constructor()).set(...this.get()), this._cloneIntoMeta(e);
	}
	process(e, t) {
		for (let n = 0; n < 16; n++, t += 4) X[n] = e.getUint32(t, !0);
		let { A: n, B: r, C: i, D: a } = this;
		for (let e = 0; e < 64; e++) {
			let t, o;
			e < 16 ? (t = H(r, i, a), o = e) : e < 32 ? (t = H(a, r, i), o = (5 * e + 1) % 16) : e < 48 ? (t = r ^ i ^ a, o = (3 * e + 5) % 16) : (t = i ^ (r | ~a), o = 7 * e % 16), t = t + n + ke[e] + X[o], n = a, a = i, i = r, r += P(t, Ae[e]);
		}
		n = n + this.A | 0, r = r + this.B | 0, i = i + this.C | 0, a = a + this.D | 0, this.set(n, r, i, a);
	}
	roundClean() {
		j(X);
	}
	destroy() {
		this.destroyed = !0, this.set(0, 0, 0, 0), j(this.buffer);
	}
}, Me = /* @__PURE__ */ z(() => new je()), Ne = class e {
	static instance = new e();
	constructor() {}
	static getInstance() {
		return this.instance;
	}
	calculate(e, t, n) {
		let r = R(t), i = R(n), a;
		switch (e) {
			case "hmacsha1":
				a = V(De, r, i);
				break;
			case "hmacsha256":
				a = V(K, r, i);
				break;
			default: a = V(Me, r, i);
		}
		return L(a);
	}
}.getInstance(), Pe = class e {
	static instance = new e();
	constructor() {}
	static getInstance() {
		return this.instance;
	}
	bytesToVerifierString(e) {
		let t = "";
		for (let n = 0; n < e.length; n++) t += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"[e[n] % 66];
		return t;
	}
	generateVerifier(e) {
		let t = _e(e);
		return this.bytesToVerifierString(t);
	}
	generateChallenge(e) {
		let t = K(R(e));
		return u.encode(t);
	}
	generateCodePair(e = 43) {
		if (e < 43 || e > 128) throw `Expected a length between 43 and 128. Received ${e}.`;
		let t = this.generateVerifier(e);
		return {
			codeVerifier: t,
			codeChallenge: this.generateChallenge(t)
		};
	}
	verifyChallenge(e, t) {
		return this.generateChallenge(e) === t;
	}
}.getInstance(), Fe = d.mixin({
	toast: !0,
	position: "top",
	showConfirmButton: !1,
	timer: 2e3,
	timerProgressBar: !1,
	didOpen: (e) => {
		e.addEventListener("mouseenter", d.stopTimer), e.addEventListener("mouseleave", d.resumeTimer);
	}
}), Z = (e) => e === f.SYSTEM ? "auto" : e, Q = class e {
	static _instance = null;
	static _initialized = !1;
	theme;
	constructor(e) {
		this.theme = Z(e);
	}
	static initialize(t) {
		if (e._initialized) throw Error("RouterUtilities has already been initialized");
		return e._instance = new e(t), e._initialized = !0, e._instance;
	}
	static getInstance() {
		if (!e._instance) throw Error("RouterUtilities not initialized. Call initialize() first.");
		return e._instance;
	}
	setTheme(e) {
		this.theme = Z(e);
	}
	information(e, t, n) {
		return d.fire({
			title: e,
			text: t,
			position: "top",
			icon: n,
			theme: this.theme,
			timer: 5e3,
			showConfirmButton: !1,
			showClass: { popup: "animate__animated animate__fadeIn" },
			hideClass: { popup: "animate__animated animate__fadeOut" }
		});
	}
	info(e, t = "") {
		return this.information(e, t, "info");
	}
	error(e, t = "") {
		return this.information(e, t, "error");
	}
	warning(e, t = "") {
		return this.information(e, t, "warning");
	}
	success(e, t = "") {
		return this.information(e, t, "success");
	}
	question(e, t = "") {
		return this.information(e, t, "question");
	}
	getConfirmButtonColor() {
		return this.theme === "light" ? "#6750A4" : "#2563eb";
	}
	standardDeleteNotify(e, t) {
		d.fire({
			title: "确定删除?",
			text: "您将无法恢复此操作！",
			icon: "warning",
			theme: this.theme,
			showCancelButton: !0,
			confirmButtonColor: this.getConfirmButtonColor(),
			cancelButtonColor: "#d33",
			confirmButtonText: "是的, 删除!",
			cancelButtonText: "取消"
		}).then((n) => {
			n.value ? e() : t && t();
		});
	}
	signOutNotify(e, t) {
		d.fire({
			title: "要走了么?",
			text: "您确定要退出系统！",
			icon: "warning",
			theme: this.theme,
			showCancelButton: !0,
			confirmButtonColor: this.getConfirmButtonColor(),
			cancelButtonColor: "#d33",
			confirmButtonText: "是的",
			cancelButtonText: "取消"
		}).then((n) => {
			n.value ? e() : t && t();
		});
	}
	tokenExpiresNotify(e, t, n, r) {
		d.fire({
			title: e,
			text: t,
			icon: n,
			theme: this.theme,
			showClass: { popup: "animate__animated animate__fadeInDown" },
			hideClass: { popup: "animate__animated animate__fadeOutUp" },
			confirmButtonText: "已阅!",
			willClose: () => {
				r();
			}
		});
	}
}.initialize(f.LIGHT), $ = class e {
	static _instance = null;
	static _initialized = !1;
	theme;
	constructor(e) {
		this.theme = Z(e);
	}
	static initialize(t) {
		if (e._initialized) throw Error("RouterUtilities has already been initialized");
		return e._instance = new e(t), e._initialized = !0, e._instance;
	}
	static getInstance() {
		if (!e._instance) throw Error("RouterUtilities not initialized. Call initialize() first.");
		return e._instance;
	}
	setTheme(e) {
		this.theme = Z(e);
	}
	information(e, t) {
		return Fe.fire({
			icon: t,
			title: e,
			theme: this.theme
		});
	}
	info(e) {
		return this.information(e, "info");
	}
	error(e) {
		return this.information(e, "error");
	}
	warning(e) {
		return this.information(e, "warning");
	}
	success(e) {
		return this.information(e, "success");
	}
	question(e) {
		return this.information(e, "question");
	}
}.initialize(f.LIGHT), Ie = (e) => {
	Q.setTheme(e), $.setTheme(e);
};
export { se as AbstractService, g as AuthorizationGrantTypeEnum, ee as AuthorizationTokenEnum, le as AvatarUtils, x as Axios, ne as BuildInScopeEnum, te as ClientAuthenticationMethodEnum, p as ContentTypeEnum, oe as HttpConfig, m as HttpMethodEnum, ce as IN_BROWSER, re as OperationEnum, Pe as PKCE, fe as SM2Utils, pe as SM4Utils, C as Service, Ne as SignatureUtils, h as StatusEnum, d as Swal, f as ThemeModeEnum, Ie as changeSwalTheme, ae as isSuccess, S as logResponse, o as moment, Q as notify, ie as parseResponseStatus, $ as toast };
