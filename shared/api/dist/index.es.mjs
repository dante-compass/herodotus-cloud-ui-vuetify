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
		return this.getConfig().getUpms() + "/hr/organization";
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
		return this.getConfig().getUpms() + "/hr/department";
	}
}, m = class n extends e {
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
}, h = class t extends e {
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
}, g = class t extends e {
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
}, _ = class t extends e {
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
}, v = class n extends e {
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
}, y = class t extends e {
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
}, b = class t extends e {
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
}, x = class t extends e {
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
}, S = class t extends e {
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
}, C = class t extends e {
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
}, w = class t extends e {
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
}, T = class t extends e {
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
}, E = class t extends e {
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
}, D = class t extends e {
	static instance;
	constructor(e) {
		super(e);
	}
	static getInstance(e) {
		return this.instance ??= new t(e), this.instance;
	}
	getBaseAddress() {
		return this.getConfig().getManage() + "/manage/certificate-file";
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
		return this.getConfig().getMsg() + "/message/dialogue/contact";
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
		return this.getConfig().getMsg() + "/message/dialogue/detail";
	}
	getDeleteDialoguePath(e) {
		return this.getParamPath(this.getBaseAddress(), e);
	}
	deleteDialogueById(e) {
		return this.getConfig().getHttp().delete(this.getDeleteDialoguePath(e));
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
		return this.getConfig().getMsg() + "/message/notification";
	}
	getAllReadAddress() {
		return this.getBaseAddress() + "/all-read";
	}
	setAllRead(e) {
		return this.getConfig().getHttp().put(this.getAllReadAddress(), { userId: e }, { contentType: t.URL_ENCODED });
	}
}, j = class e {
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
}, M = class e extends r {
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
}, N = class e extends r {
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
}, P = class e extends r {
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
}, F = class t extends e {
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
}, I = class t extends e {
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
}, L = class t extends e {
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
}, R = class t extends e {
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
}, z = class t extends e {
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
}, B = class t extends e {
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
}, V = class e {
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
	sysOrganization() {
		return f.getInstance(this.config);
	}
	sysDepartment() {
		return p.getInstance(this.config);
	}
	sysEmployee() {
		return m.getInstance(this.config);
	}
	sysEmployeeAllocatable() {
		return h.getInstance(this.config);
	}
	sysPermission() {
		return g.getInstance(this.config);
	}
	sysRole() {
		return _.getInstance(this.config);
	}
	sysUser() {
		return v.getInstance(this.config);
	}
	sysAttribute() {
		return y.getInstance(this.config);
	}
	sysDefaultRole() {
		return b.getInstance(this.config);
	}
	sysElement() {
		return x.getInstance(this.config);
	}
	sysDictionary() {
		return C.getInstance(this.config);
	}
	sysTenantDataSource() {
		return S.getInstance(this.config);
	}
	socialBinding() {
		return w.getInstance(this.config);
	}
	dialogueContact() {
		return O.getInstance(this.config);
	}
	dialogueDetail() {
		return k.getInstance(this.config);
	}
	notification() {
		return A.getInstance(this.config);
	}
	webSocketMessage() {
		return j.getInstance(this.config);
	}
	task() {
		return T.getInstance(this.config);
	}
	mgtCertificate() {
		return E.getInstance(this.config);
	}
	mgtCertificateFile() {
		return D.getInstance(this.config);
	}
	ossBucket() {
		return M.getInstance(this.config);
	}
	ossObject() {
		return N.getInstance(this.config);
	}
	ossMultipartUpload() {
		return P.getInstance(this.config);
	}
	iotProductCategory() {
		return F.getInstance(this.config);
	}
	iotProduct() {
		return I.getInstance(this.config);
	}
	iotDevice() {
		return L.getInstance(this.config);
	}
	iotTslUnit() {
		return R.getInstance(this.config);
	}
	iotTslArgument() {
		return z.getInstance(this.config);
	}
	iotTslFunction() {
		return B.getInstance(this.config);
	}
}, H = (e, t) => {
	let r = new n(e, t);
	return V.getInstance(r);
};
//#endregion
export { V as ApiResources, M as BucketService, t as ContentTypeEnum, L as DeviceService, O as DialogueContactService, k as DialogueDetailService, T as ExtendedTaskService, i as GenderEnum, D as MgtCertificateFileService, E as MgtCertificateService, P as MultipartUploadService, a as NotificationCategoryEnum, A as NotificationService, o as OAuth2ApplicationService, c as OAuth2AuthorizationService, d as OAuth2CredentialRecordService, u as OAuth2InterfaceAuditService, s as OAuth2ScopeService, l as OAuth2UserLoggingService, N as ObjectService, F as ProductCategoryService, I as ProductService, w as SocialBindingService, y as SysAttributeService, b as SysDefaultRoleService, p as SysDepartmentService, C as SysDictionaryService, x as SysElementService, h as SysEmployeeAllocatableService, m as SysEmployeeService, f as SysOrganizationService, g as SysPermissionService, _ as SysRoleService, S as SysTenantDataSourceService, v as SysUserService, z as TslArgumentService, B as TslFunctionService, R as TslUnitService, j as WebSocketMessageService, H as createApi };
