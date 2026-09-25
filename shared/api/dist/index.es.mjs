import { AbstractService as e, ContentTypeEnum as t, HttpConfig as n, Service as r } from "@herodotus/core";
//#region src/enums/application.ts
var i = /* @__PURE__ */ function(e) {
	return e[e.OTHERS = 0] = "OTHERS", e[e.MAN = 1] = "MAN", e[e.WOMAN = 2] = "WOMAN", e;
}({}), a = /* @__PURE__ */ function(e) {
	return e[e.ANNOUNCEMENT = 0] = "ANNOUNCEMENT", e[e.DIALOGUE = 1] = "DIALOGUE", e;
}({}), o = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUaa() + "/authorize/application";
	}
}, s = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUaa() + "/authorize/scope";
	}
	getAssignedAddress() {
		return this.getBaseAddress() + "/assigned";
	}
	getScopeCodePath(e) {
		return this.getParamPath(this.getBaseAddress(), e);
	}
	fetchByScopeCode(e) {
		return this.getConfig().getHttp().get(this.getScopeCodePath(e));
	}
	assigned(e) {
		return this.getConfig().getHttp().post(this.getAssignedAddress(), e);
	}
}, c = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUaa() + "/authorize/authorization";
	}
}, l = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUaa() + "/authorize/compliance";
	}
}, u = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUaa() + "/authorize/audit";
	}
}, d = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUaa() + "/authorize/passkey";
	}
}, f = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUaa() + "/authorize/persistent";
	}
}, p = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUaa() + "/authorize/resource";
	}
	getResourceCodePath(e) {
		return this.getParamPath(this.getBaseAddress(), e);
	}
	fetchByResourceCode(e) {
		return this.getConfig().getHttp().get(this.getResourceCodePath(e));
	}
}, m = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUaa() + "/authorize/supported";
	}
	getScopeCodePath(e) {
		return this.getParamPath(this.getBaseAddress(), e);
	}
	fetchByScopeCode(e) {
		return this.getConfig().getHttp().get(this.getScopeCodePath(e));
	}
}, h = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/hr/organization";
	}
}, g = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/hr/department";
	}
}, _ = class n extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new n(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/hr/employee";
	}
	getAssignedAddress() {
		return this.getBaseAddress() + "/assigned";
	}
	getAllocatableAddress() {
		return this.getBaseAddress() + "/allocatable";
	}
	getEmployeeNamePath(e) {
		return this.getParamPath(this.getBaseAddress(), e);
	}
	fetchByEmployeeName(e) {
		return this.getConfig().getHttp().get(this.getEmployeeNamePath(e));
	}
	fetchAssignedByPage(e, t = {}) {
		let n = Object.assign(e, t);
		return this.getConfig().getHttp().get(this.getAssignedAddress(), n);
	}
	deleteAllocatable(e) {
		return this.getConfig().getHttp().delete(this.getAllocatableAddress(), e);
	}
	saveAllocatable(e) {
		return this.getConfig().getHttp().post(this.getAllocatableAddress(), e);
	}
	authorizeUser(e) {
		return this.getConfig().getHttp().put(this.getBaseAddress(), e, { contentType: t.URL_ENCODED });
	}
}, v = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/";
	}
}, y = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/security/permission";
	}
}, b = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/security/role";
	}
	getRoleCodePath(e) {
		return this.getParamPath(this.getBaseAddress(), e);
	}
	fetchByRoleCode(e) {
		return this.getConfig().getHttp().get(this.getRoleCodePath(e));
	}
}, x = class n extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new n(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/security/user";
	}
	getUsernameAddress() {
		return this.getBaseAddress() + "/sign-in";
	}
	getChangePasswordAddress() {
		return this.getBaseAddress() + "/change-password";
	}
	getUsernamePath(e) {
		return this.getParamPath(this.getUsernameAddress(), e);
	}
	fetchByUsername(e) {
		return this.getConfig().getHttp().get(this.getUsernamePath(e));
	}
	changePassword(e, n) {
		return this.getConfig().getHttp().put(this.getChangePasswordAddress(), {
			userId: e,
			password: n
		}, { contentType: t.URL_ENCODED });
	}
}, S = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/security/attribute";
	}
}, C = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/security/default-role";
	}
}, w = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/security/element";
	}
	getResourcesAddress() {
		return this.getBaseAddress() + "/resources";
	}
	fetchById(e) {
		return this.getConfig().getHttp().get(this.getIdPath(e));
	}
	findResourcesByRoles(e) {
		return this.getConfig().getHttp().get(this.getResourcesAddress(), { roles: e });
	}
}, T = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUaa() + "/security/tenant/datasource";
	}
	getTenantIdPath(e) {
		return this.getParamPath(this.getBaseAddress(), e);
	}
	fetchByTenantId(e) {
		return this.getConfig().getHttp().get(this.getTenantIdPath(e));
	}
}, E = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/security/dictionary";
	}
	getItemsAddress() {
		return this.getBaseAddress() + "/items";
	}
	getCategoryPath(e) {
		return this.getParamPath(this.getItemsAddress(), e);
	}
	fetchByCategory(e) {
		return this.getConfig().getHttp().get(this.getCategoryPath(e));
	}
	fetchCategories(e) {
		return this.getConfig().getHttp().get(this.getItemsAddress(), { categories: e });
	}
}, D = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getUpms() + "/security/social/binding";
	}
}, O = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getBpmn(!0, !0) + "/task";
	}
	getToDoTasksAddress() {
		return this.getBaseAddress() + "/todo";
	}
	getCompletedTasksAddress() {
		return this.getBaseAddress() + "/completed";
	}
	fetchToDoTasksByPage(e, t = {}) {
		let n = Object.assign(e, t);
		return this.getConfig().getHttp().get(this.getToDoTasksAddress(), n);
	}
	fetchCompletedTasksByPage(e, t = {}) {
		let n = Object.assign(e, t);
		return this.getConfig().getHttp().get(this.getCompletedTasksAddress(), n);
	}
}, k = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getManage() + "/manage/certificate";
	}
	getAliasAddress() {
		return this.getBaseAddress() + "/alias";
	}
	getCategoryAddress() {
		return this.getBaseAddress() + "/category";
	}
	findByAlias(e) {
		return this.getConfig().getHttp().get(this.getAliasAddress(), { alias: e });
	}
	findAllByCertificateCategory(e) {
		return this.getConfig().getHttp().get(this.getCategoryAddress(), { certificateCategory: e });
	}
}, A = class n extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new n(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getManage() + "/manage/certificate-file";
	}
	getDownloadAddress() {
		return this.getBaseAddress() + "/download";
	}
	download(e, n) {
		return n ? this.getConfig().getHttp().post(this.getDownloadAddress(), e, { contentType: t.JSON }, {
			responseType: "blob",
			onDownloadProgress: n
		}) : this.getConfig().getHttp().post(this.getDownloadAddress(), e);
	}
}, j = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getMsg() + "/message/dialogue/contact";
	}
}, M = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getMsg() + "/message/dialogue/detail";
	}
	getDeleteDialoguePath(e) {
		return this.getParamPath(this.getBaseAddress(), e);
	}
	deleteDialogueById(e) {
		return this.getConfig().getHttp().delete(this.getDeleteDialoguePath(e));
	}
}, N = class n extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new n(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getMsg() + "/message/notification";
	}
	getAllReadAddress() {
		return this.getBaseAddress() + "/all-read";
	}
	setAllRead(e) {
		return this.getConfig().getHttp().put(this.getAllReadAddress(), { userId: e }, { contentType: t.URL_ENCODED });
	}
}, P = class e {
	static instance;
	config = {};
	constructor(e) {
		this.config = e;
	}
	static getInstance(t) {
		return this.instance ??= new e(t), this.instance;
	}
	getBaseAddress() {
		return this.config.getMsg() + "/message/websocket";
	}
	getStatAddress() {
		return this.getBaseAddress() + "/stat";
	}
	fetchAllStat() {
		return this.config.getHttp().get(this.getStatAddress());
	}
}, F = class e extends r {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(t) {
		return this.instance ??= new e(t), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getOss() + "/oss/bucket";
	}
	getListAddress() {
		return this.getBaseAddress() + "/list";
	}
	getPolicyAddress() {
		return this.getBaseAddress() + "/policy";
	}
	listBuckets() {
		return this.getConfig().getHttp().get(this.getListAddress());
	}
	createBucket(e) {
		return this.getConfig().getHttp().post(this.getBaseAddress(), e);
	}
	deleteBucket(e) {
		return this.getConfig().getHttp().delete(this.getBaseAddress(), e);
	}
	setBucketPolicy(e) {
		return this.getConfig().getHttp().put(this.getPolicyAddress(), e);
	}
}, I = class e extends r {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(t) {
		return this.instance ??= new e(t), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getOss() + "/oss/object";
	}
	getListV2Address() {
		return this.getBaseAddress() + "/list";
	}
	getMultiDeleteAddress() {
		return this.getBaseAddress() + "/multi";
	}
	getDownloadAddress() {
		return this.getBaseAddress() + "/download";
	}
	getDisplayAddress() {
		return this.getBaseAddress() + "/display";
	}
	getUploadAddress() {
		return this.getBaseAddress() + "/upload";
	}
	getAttributesAddress() {
		return this.getBaseAddress() + "/attributes";
	}
	getLegalHoldAddress() {
		return this.getBaseAddress() + "/legalhold";
	}
	getRetentionAddress() {
		return this.getBaseAddress() + "/retention";
	}
	getListVersionsAddress() {
		return this.getBaseAddress() + "/versions";
	}
	listObjectsV2(e) {
		return this.getConfig().getHttp().get(this.getListV2Address(), e);
	}
	delete(e) {
		return this.getConfig().getHttp().delete(this.getBaseAddress(), e);
	}
	upload(e, n, r) {
		let i = new FormData();
		return i.append("file", n), i.append("bucketName", e), r ? this.getConfig().getHttp().post(this.getUploadAddress(), i, { contentType: t.MULTI_PART }, { onUploadProgress: r }) : this.getConfig().getHttp().post(this.getUploadAddress(), i, { contentType: t.MULTI_PART });
	}
	download(e, n) {
		return n ? this.getConfig().getHttp().post(this.getDownloadAddress(), e, { contentType: t.JSON }, {
			responseType: "blob",
			onDownloadProgress: n
		}) : this.getConfig().getHttp().post(this.getDownloadAddress(), e);
	}
	display(e) {
		return this.getConfig().getHttp().post(this.getDisplayAddress(), e, { contentType: t.JSON }, { responseType: "blob" });
	}
	batchDelete(e) {
		return this.getConfig().getHttp().delete(this.getMultiDeleteAddress(), e);
	}
	fetchObjectAttributes(e) {
		return this.getConfig().getHttp().get(this.getAttributesAddress(), e);
	}
	setObjectLegalHold(e) {
		return this.getConfig().getHttp().put(this.getLegalHoldAddress(), e);
	}
	setObjectRetention(e) {
		return this.getConfig().getHttp().put(this.getRetentionAddress(), e);
	}
	listObjectVersions(e) {
		return this.getConfig().getHttp().get(this.getListVersionsAddress(), e);
	}
}, L = class e extends r {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(t) {
		return this.instance ??= new e(t), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getOss() + "/oss/multipart-upload";
	}
	getCreateMultipartUploadAddress() {
		return this.getBaseAddress() + "/create";
	}
	getCompleteMultipartUploadAddress() {
		return this.getBaseAddress() + "/complete";
	}
	createChunkUpload(e) {
		return this.getConfig().getHttp().post(this.getCreateMultipartUploadAddress(), e);
	}
	completeChunkUpload(e) {
		return this.getConfig().getHttp().post(this.getCompleteMultipartUploadAddress(), e);
	}
}, R = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getIot() + "/iot/product-category";
	}
}, z = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getIot() + "/iot/product";
	}
	getValidateProductKeyAddress() {
		return this.getBaseAddress() + "/validation";
	}
	getToggleAddress() {
		return this.getBaseAddress() + "/toggle";
	}
	getValidateProductKeyPath(e) {
		return this.getParamPath(this.getValidateProductKeyAddress(), e);
	}
	validateProductKey(e) {
		return this.getConfig().getHttp().get(this.getValidateProductKeyPath(e));
	}
	toggle(e) {
		return this.getConfig().getHttp().put(this.getToggleAddress(), e);
	}
}, B = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getIot() + "/iot/device";
	}
	getToggleAddress() {
		return this.getBaseAddress() + "/toggle";
	}
}, V = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getIot() + "/iot/tsl/unit";
	}
}, H = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getIot() + "/iot/tsl/argument";
	}
}, U = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getIot() + "/iot/tsl/function";
	}
	getSetAddress() {
		return this.getBaseAddress() + "/set";
	}
	getInvokeAddress() {
		return this.getBaseAddress() + "/invoke";
	}
	set(e) {
		return this.getConfig().getHttp().put(this.getSetAddress(), e);
	}
	invoke(e) {
		return this.getConfig().getHttp().put(this.getInvokeAddress(), e);
	}
}, W = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getIot() + "/iot/mqtt/category";
	}
}, G = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getIot() + "/iot/mqtt/authority";
	}
}, K = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getIot() + "/iot/mqtt/account";
	}
}, q = class e {
	static instance;
	config = {};
	constructor(e) {
		this.config = e;
	}
	static getInstance(t) {
		return this.instance ??= new e(t), this.instance;
	}
	getConfig() {
		return this.config;
	}
	oauth2Application() {
		return o.getInstance(this.config);
	}
	oauth2Scope() {
		return s.getInstance(this.config);
	}
	oauth2Authorization() {
		return c.getInstance(this.config);
	}
	oauth2CredentialRecord() {
		return d.getInstance(this.config);
	}
	oauth2UserLogging() {
		return l.getInstance(this.config);
	}
	oauth2InterfaceAudit() {
		return u.getInstance(this.config);
	}
	oauth2PersistentToken() {
		return f.getInstance(this.config);
	}
	oauth2Resource() {
		return p.getInstance(this.config);
	}
	oauth2SupportedScope() {
		return m.getInstance(this.config);
	}
	sysOrganization() {
		return h.getInstance(this.config);
	}
	sysDepartment() {
		return g.getInstance(this.config);
	}
	sysEmployee() {
		return _.getInstance(this.config);
	}
	sysEmployeeAllocatable() {
		return v.getInstance(this.config);
	}
	sysPermission() {
		return y.getInstance(this.config);
	}
	sysRole() {
		return b.getInstance(this.config);
	}
	sysUser() {
		return x.getInstance(this.config);
	}
	sysAttribute() {
		return S.getInstance(this.config);
	}
	sysDefaultRole() {
		return C.getInstance(this.config);
	}
	sysElement() {
		return w.getInstance(this.config);
	}
	sysDictionary() {
		return E.getInstance(this.config);
	}
	sysTenantDataSource() {
		return T.getInstance(this.config);
	}
	socialBinding() {
		return D.getInstance(this.config);
	}
	dialogueContact() {
		return j.getInstance(this.config);
	}
	dialogueDetail() {
		return M.getInstance(this.config);
	}
	notification() {
		return N.getInstance(this.config);
	}
	webSocketMessage() {
		return P.getInstance(this.config);
	}
	task() {
		return O.getInstance(this.config);
	}
	mgtCertificate() {
		return k.getInstance(this.config);
	}
	mgtCertificateFile() {
		return A.getInstance(this.config);
	}
	ossBucket() {
		return F.getInstance(this.config);
	}
	ossObject() {
		return I.getInstance(this.config);
	}
	ossMultipartUpload() {
		return L.getInstance(this.config);
	}
	iotProductCategory() {
		return R.getInstance(this.config);
	}
	iotProduct() {
		return z.getInstance(this.config);
	}
	iotDevice() {
		return B.getInstance(this.config);
	}
	iotTslUnit() {
		return V.getInstance(this.config);
	}
	iotTslArgument() {
		return H.getInstance(this.config);
	}
	iotTslFunction() {
		return U.getInstance(this.config);
	}
	iotMqttCategory() {
		return W.getInstance(this.config);
	}
	iotMqttAuthority() {
		return G.getInstance(this.config);
	}
	iotMqttAccount() {
		return K.getInstance(this.config);
	}
}, J = (e, t) => {
	let r = new n(e, t);
	return q.getInstance(r);
};
//#endregion
export { q as ApiResources, F as BucketService, t as ContentTypeEnum, B as DeviceService, j as DialogueContactService, M as DialogueDetailService, O as ExtendedTaskService, i as GenderEnum, A as MgtCertificateFileService, k as MgtCertificateService, K as MqttAccountService, G as MqttAuthorityService, W as MqttCategoryService, L as MultipartUploadService, a as NotificationCategoryEnum, N as NotificationService, o as OAuth2ApplicationService, c as OAuth2AuthorizationService, d as OAuth2CredentialRecordService, u as OAuth2InterfaceAuditService, f as OAuth2PersistentTokenService, p as OAuth2ResourceService, s as OAuth2ScopeService, m as OAuth2SupportedScopeService, l as OAuth2UserLoggingService, I as ObjectService, R as ProductCategoryService, z as ProductService, D as SocialBindingService, S as SysAttributeService, C as SysDefaultRoleService, g as SysDepartmentService, E as SysDictionaryService, w as SysElementService, v as SysEmployeeAllocatableService, _ as SysEmployeeService, h as SysOrganizationService, y as SysPermissionService, b as SysRoleService, T as SysTenantDataSourceService, x as SysUserService, H as TslArgumentService, U as TslFunctionService, V as TslUnitService, P as WebSocketMessageService, J as createApi };
