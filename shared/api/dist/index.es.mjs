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
		return this.getConfig().getUpms() + "/hr/organization";
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
		return this.getConfig().getUpms() + "/hr/department";
	}
}, h = class n extends e {
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
}, g = class t extends e {
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
}, _ = class t extends e {
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
}, v = class t extends e {
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
}, y = class n extends e {
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
}, b = class t extends e {
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
}, x = class t extends e {
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
}, S = class t extends e {
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
}, C = class t extends e {
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
}, w = class t extends e {
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
}, T = class t extends e {
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
}, E = class t extends e {
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
}, D = class t extends e {
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
}, O = class n extends e {
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
}, k = class t extends e {
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
}, A = class t extends e {
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
}, j = class n extends e {
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
}, M = class e {
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
}, N = class e extends r {
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
}, P = class e extends r {
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
}, F = class e extends r {
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
}, I = class t extends e {
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
}, L = class t extends e {
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
}, R = class t extends e {
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
}, z = class t extends e {
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
}, B = class t extends e {
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
}, V = class t extends e {
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
}, H = class t extends e {
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
}, U = class t extends e {
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
}, W = class t extends e {
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
}, G = class e {
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
	sysOrganization() {
		return p.getInstance(this.config);
	}
	sysDepartment() {
		return m.getInstance(this.config);
	}
	sysEmployee() {
		return h.getInstance(this.config);
	}
	sysEmployeeAllocatable() {
		return g.getInstance(this.config);
	}
	sysPermission() {
		return _.getInstance(this.config);
	}
	sysRole() {
		return v.getInstance(this.config);
	}
	sysUser() {
		return y.getInstance(this.config);
	}
	sysAttribute() {
		return b.getInstance(this.config);
	}
	sysDefaultRole() {
		return x.getInstance(this.config);
	}
	sysElement() {
		return S.getInstance(this.config);
	}
	sysDictionary() {
		return w.getInstance(this.config);
	}
	sysTenantDataSource() {
		return C.getInstance(this.config);
	}
	socialBinding() {
		return T.getInstance(this.config);
	}
	dialogueContact() {
		return k.getInstance(this.config);
	}
	dialogueDetail() {
		return A.getInstance(this.config);
	}
	notification() {
		return j.getInstance(this.config);
	}
	webSocketMessage() {
		return M.getInstance(this.config);
	}
	task() {
		return E.getInstance(this.config);
	}
	mgtCertificate() {
		return D.getInstance(this.config);
	}
	mgtCertificateFile() {
		return O.getInstance(this.config);
	}
	ossBucket() {
		return N.getInstance(this.config);
	}
	ossObject() {
		return P.getInstance(this.config);
	}
	ossMultipartUpload() {
		return F.getInstance(this.config);
	}
	iotProductCategory() {
		return I.getInstance(this.config);
	}
	iotProduct() {
		return L.getInstance(this.config);
	}
	iotDevice() {
		return R.getInstance(this.config);
	}
	iotTslUnit() {
		return z.getInstance(this.config);
	}
	iotTslArgument() {
		return B.getInstance(this.config);
	}
	iotTslFunction() {
		return V.getInstance(this.config);
	}
	iotMqttCategory() {
		return H.getInstance(this.config);
	}
	iotMqttAuthority() {
		return U.getInstance(this.config);
	}
	iotMqttAccount() {
		return W.getInstance(this.config);
	}
}, K = (e, t) => {
	let r = new n(e, t);
	return G.getInstance(r);
};
//#endregion
export { G as ApiResources, N as BucketService, t as ContentTypeEnum, R as DeviceService, k as DialogueContactService, A as DialogueDetailService, E as ExtendedTaskService, i as GenderEnum, O as MgtCertificateFileService, D as MgtCertificateService, W as MqttAccountService, U as MqttAuthorityService, H as MqttCategoryService, F as MultipartUploadService, a as NotificationCategoryEnum, j as NotificationService, o as OAuth2ApplicationService, c as OAuth2AuthorizationService, d as OAuth2CredentialRecordService, u as OAuth2InterfaceAuditService, f as OAuth2PersistentTokenService, s as OAuth2ScopeService, l as OAuth2UserLoggingService, P as ObjectService, I as ProductCategoryService, L as ProductService, T as SocialBindingService, b as SysAttributeService, x as SysDefaultRoleService, m as SysDepartmentService, w as SysDictionaryService, S as SysElementService, g as SysEmployeeAllocatableService, h as SysEmployeeService, p as SysOrganizationService, _ as SysPermissionService, v as SysRoleService, C as SysTenantDataSourceService, y as SysUserService, B as TslArgumentService, V as TslFunctionService, z as TslUnitService, M as WebSocketMessageService, K as createApi };
