import { AbstractService, ContentTypeEnum, HttpConfig } from "@herodotus-cloud/core";
import { AbstractService as AbstractService2, Axios, Base64, ContentTypeEnum as ContentTypeEnum2, HttpConfig as HttpConfig2, Service, lodash, moment } from "@herodotus-cloud/core";
var AuthorityTypeEnum = /* @__PURE__ */ ((AuthorityTypeEnum2) => {
  AuthorityTypeEnum2[AuthorityTypeEnum2["API"] = 0] = "API";
  AuthorityTypeEnum2[AuthorityTypeEnum2["MENU"] = 1] = "MENU";
  AuthorityTypeEnum2[AuthorityTypeEnum2["PAGE"] = 2] = "PAGE";
  AuthorityTypeEnum2[AuthorityTypeEnum2["MINI_PAGE"] = 3] = "MINI_PAGE";
  return AuthorityTypeEnum2;
})(AuthorityTypeEnum || {});
var IdentityEnum = /* @__PURE__ */ ((IdentityEnum2) => {
  IdentityEnum2[IdentityEnum2["LEADERSHIP"] = 0] = "LEADERSHIP";
  IdentityEnum2[IdentityEnum2["SECTION_LEADER"] = 1] = "SECTION_LEADER";
  IdentityEnum2[IdentityEnum2["STAFF"] = 2] = "STAFF";
  return IdentityEnum2;
})(IdentityEnum || {});
var GenderEnum = /* @__PURE__ */ ((GenderEnum2) => {
  GenderEnum2[GenderEnum2["OTHERS"] = 0] = "OTHERS";
  GenderEnum2[GenderEnum2["MAN"] = 1] = "MAN";
  GenderEnum2[GenderEnum2["WOMAN"] = 2] = "WOMAN";
  return GenderEnum2;
})(GenderEnum || {});
var StatusEnum = /* @__PURE__ */ ((StatusEnum2) => {
  StatusEnum2[StatusEnum2["FORBIDDEN"] = 0] = "FORBIDDEN";
  StatusEnum2[StatusEnum2["ENABLE"] = 1] = "ENABLE";
  StatusEnum2[StatusEnum2["LOCKING"] = 2] = "LOCKING";
  StatusEnum2[StatusEnum2["EXPIRED"] = 3] = "EXPIRED";
  return StatusEnum2;
})(StatusEnum || {});
var ConstantEnum = /* @__PURE__ */ ((ConstantEnum2) => {
  ConstantEnum2["APPLICATION"] = "applicationType";
  ConstantEnum2["GENDER"] = "gender";
  ConstantEnum2["GRANT"] = "grantType";
  ConstantEnum2["IDENTITY"] = "identity";
  ConstantEnum2["STATUS"] = "status";
  ConstantEnum2["SUPPLIER"] = "supplierType";
  ConstantEnum2["TECHNOLOGY"] = "technologyType";
  ConstantEnum2["EXPRESSION"] = "expression";
  return ConstantEnum2;
})(ConstantEnum || {});
var ApplicationEnum = /* @__PURE__ */ ((ApplicationEnum2) => {
  ApplicationEnum2[ApplicationEnum2["WEB"] = 0] = "WEB";
  ApplicationEnum2[ApplicationEnum2["SERVICE"] = 1] = "SERVICE";
  ApplicationEnum2[ApplicationEnum2["APP"] = 2] = "APP";
  ApplicationEnum2[ApplicationEnum2["WAP"] = 3] = "WAP";
  ApplicationEnum2[ApplicationEnum2["MINI"] = 4] = "MINI";
  return ApplicationEnum2;
})(ApplicationEnum || {});
var TechnologyEnum = /* @__PURE__ */ ((TechnologyEnum2) => {
  TechnologyEnum2[TechnologyEnum2["JAVA"] = 0] = "JAVA";
  TechnologyEnum2[TechnologyEnum2["NET"] = 1] = "NET";
  TechnologyEnum2[TechnologyEnum2["PHP"] = 2] = "PHP";
  TechnologyEnum2[TechnologyEnum2["NODE"] = 3] = "NODE";
  TechnologyEnum2[TechnologyEnum2["IOS"] = 4] = "IOS";
  TechnologyEnum2[TechnologyEnum2["ANDROID"] = 5] = "ANDROID";
  TechnologyEnum2[TechnologyEnum2["WEAPP"] = 6] = "WEAPP";
  TechnologyEnum2[TechnologyEnum2["ALIAPP"] = 7] = "ALIAPP";
  TechnologyEnum2[TechnologyEnum2["DUAPP"] = 8] = "DUAPP";
  return TechnologyEnum2;
})(TechnologyEnum || {});
var SupplierType = /* @__PURE__ */ ((SupplierType2) => {
  SupplierType2[SupplierType2["CORE"] = 0] = "CORE";
  SupplierType2[SupplierType2["BAT"] = 1] = "BAT";
  SupplierType2[SupplierType2["THIRD_PARTY"] = 2] = "THIRD_PARTY";
  SupplierType2[SupplierType2["Outsourcing"] = 3] = "Outsourcing";
  return SupplierType2;
})(SupplierType || {});
var NotificationCategoryEnum = /* @__PURE__ */ ((NotificationCategoryEnum2) => {
  NotificationCategoryEnum2[NotificationCategoryEnum2["ANNOUNCEMENT"] = 0] = "ANNOUNCEMENT";
  NotificationCategoryEnum2[NotificationCategoryEnum2["DIALOGUE"] = 1] = "DIALOGUE";
  return NotificationCategoryEnum2;
})(NotificationCategoryEnum || {});
class OAuth2ApplicationService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ApplicationService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/application";
  }
}
class OAuth2ScopeService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2ScopeService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/scope";
  }
  getAssignedAddress() {
    return this.getBaseAddress() + "/assigned";
  }
  getScopeCodePath(scopeCode) {
    return this.getParamPath(this.getBaseAddress(), scopeCode);
  }
  fetchByScopeCode(scopeCode) {
    return this.getConfig().getHttp().get(this.getScopeCodePath(scopeCode));
  }
  assigned(data) {
    return this.getConfig().getHttp().post(this.getAssignedAddress(), data);
  }
}
class OAuth2AuthorizationService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2AuthorizationService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/authorization";
  }
}
class OAuth2UserLoggingService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2UserLoggingService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/compliance";
  }
}
class OAuth2InterfaceAuditService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2InterfaceAuditService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/audit";
  }
}
class OAuth2CredentialRecordService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new OAuth2CredentialRecordService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/authorize/passkey";
  }
}
class SysOrganizationService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysOrganizationService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/hr/organization";
  }
}
class SysDepartmentService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysDepartmentService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/hr/department";
  }
}
class SysEmployeeService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysEmployeeService(config);
    }
    return this.instance;
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
  getEmployeeNamePath(employeeName) {
    return this.getParamPath(this.getBaseAddress(), employeeName);
  }
  fetchByEmployeeName(employeeName) {
    return this.getConfig().getHttp().get(this.getEmployeeNamePath(employeeName));
  }
  fetchAssignedByPage(params, others = {}) {
    const fullParams = Object.assign(params, others);
    return this.getConfig().getHttp().get(this.getAssignedAddress(), fullParams);
  }
  deleteAllocatable(data) {
    return this.getConfig().getHttp().delete(this.getAllocatableAddress(), data);
  }
  saveAllocatable(data) {
    return this.getConfig().getHttp().post(this.getAllocatableAddress(), data);
  }
  authorizeUser(data) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), data, {
      contentType: ContentTypeEnum.URL_ENCODED
    });
  }
}
class SysEmployeeAllocatableService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysEmployeeAllocatableService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/";
  }
}
class SysPermissionService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysPermissionService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/security/permission";
  }
}
class SysRoleService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysRoleService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/security/role";
  }
  getRoleCodePath(roleCode) {
    return this.getParamPath(this.getBaseAddress(), roleCode);
  }
  fetchByRoleCode(roleCode) {
    return this.getConfig().getHttp().get(this.getRoleCodePath(roleCode));
  }
}
class SysUserService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysUserService(config);
    }
    return this.instance;
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
  getUsernamePath(username) {
    return this.getParamPath(this.getUsernameAddress(), username);
  }
  fetchByUsername(username) {
    return this.getConfig().getHttp().get(this.getUsernamePath(username));
  }
  changePassword(userId, password) {
    return this.getConfig().getHttp().put(
      this.getChangePasswordAddress(),
      { userId, password },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
}
class SysAttributeService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysAttributeService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/security/attribute";
  }
}
class SysDefaultRoleService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysDefaultRoleService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/security/default-role";
  }
}
class SysElementService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysElementService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/security/element";
  }
  fetchById(id) {
    return this.getConfig().getHttp().get(this.getIdPath(id));
  }
}
class SysTenantDataSourceService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysTenantDataSourceService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUaa() + "/security/tenant/datasource";
  }
  getTenantIdPath(tenantId) {
    return this.getParamPath(this.getBaseAddress(), tenantId);
  }
  fetchByTenantId(tenantId) {
    return this.getConfig().getHttp().get(this.getTenantIdPath(tenantId));
  }
}
class SysDictionaryService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SysDictionaryService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/security/dictionary";
  }
  getItemsAddress() {
    return this.getBaseAddress() + "/items";
  }
  getCategoryPath(category) {
    return this.getParamPath(this.getItemsAddress(), category);
  }
  fetchByCategory(category) {
    return this.getConfig().getHttp().get(this.getCategoryPath(category));
  }
  fetchCategories(categories) {
    return this.getConfig().getHttp().get(this.getItemsAddress(), { categories });
  }
}
class SocialBindingService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new SocialBindingService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getUpms() + "/security/social/binding";
  }
}
class ExtendedTaskService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new ExtendedTaskService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn(true, true) + "/task";
  }
  getToDoTasksAddress() {
    return this.getBaseAddress() + "/todo";
  }
  getCompletedTasksAddress() {
    return this.getBaseAddress() + "/completed";
  }
  fetchToDoTasksByPage(params, others = {}) {
    const fullParams = Object.assign(params, others);
    return this.getConfig().getHttp().get(this.getToDoTasksAddress(), fullParams);
  }
  fetchCompletedTasksByPage(params, others = {}) {
    const fullParams = Object.assign(params, others);
    return this.getConfig().getHttp().get(this.getCompletedTasksAddress(), fullParams);
  }
}
class MgtCertificateService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MgtCertificateService(config);
    }
    return this.instance;
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
  findByAlias(alias) {
    return this.getConfig().getHttp().get(this.getAliasAddress(), { alias });
  }
  findAllByCertificateCategory(certificateCategory) {
    return this.getConfig().getHttp().get(this.getCategoryAddress(), { certificateCategory });
  }
}
class DialogueContactService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new DialogueContactService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getMsg() + "/message/dialogue/contact";
  }
}
class DialogueDetailService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new DialogueDetailService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getMsg() + "/message/dialogue/detail";
  }
  getDeleteDialoguePath(id) {
    return this.getParamPath(this.getBaseAddress(), id);
  }
  deleteDialogueById(id) {
    return this.getConfig().getHttp().delete(this.getDeleteDialoguePath(id));
  }
}
class NotificationService extends AbstractService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new NotificationService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getMsg() + "/message/notification";
  }
  getAllReadAddress() {
    return this.getBaseAddress() + "/all-read";
  }
  setAllRead(userId) {
    return this.getConfig().getHttp().put(
      this.getAllReadAddress(),
      { userId },
      {
        contentType: ContentTypeEnum.URL_ENCODED
      }
    );
  }
}
class WebSocketMessageService {
  static instance;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new WebSocketMessageService(config);
    }
    return this.instance;
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
}
class ApiResources {
  static instance;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new ApiResources(config);
    }
    return this.instance;
  }
  getConfig() {
    return this.config;
  }
  oauth2Application() {
    return OAuth2ApplicationService.getInstance(this.config);
  }
  oauth2Scope() {
    return OAuth2ScopeService.getInstance(this.config);
  }
  oauth2Authorization() {
    return OAuth2AuthorizationService.getInstance(this.config);
  }
  oauth2CredentialRecord() {
    return OAuth2CredentialRecordService.getInstance(this.config);
  }
  oauth2UserLogging() {
    return OAuth2UserLoggingService.getInstance(this.config);
  }
  oauth2InterfaceAudit() {
    return OAuth2InterfaceAuditService.getInstance(this.config);
  }
  sysOrganization() {
    return SysOrganizationService.getInstance(this.config);
  }
  sysDepartment() {
    return SysDepartmentService.getInstance(this.config);
  }
  sysEmployee() {
    return SysEmployeeService.getInstance(this.config);
  }
  sysEmployeeAllocatable() {
    return SysEmployeeAllocatableService.getInstance(this.config);
  }
  sysPermission() {
    return SysPermissionService.getInstance(this.config);
  }
  sysRole() {
    return SysRoleService.getInstance(this.config);
  }
  sysUser() {
    return SysUserService.getInstance(this.config);
  }
  sysAttribute() {
    return SysAttributeService.getInstance(this.config);
  }
  sysDefaultRole() {
    return SysDefaultRoleService.getInstance(this.config);
  }
  sysElement() {
    return SysElementService.getInstance(this.config);
  }
  sysDictionary() {
    return SysDictionaryService.getInstance(this.config);
  }
  sysTenantDataSource() {
    return SysTenantDataSourceService.getInstance(this.config);
  }
  socialBinding() {
    return SocialBindingService.getInstance(this.config);
  }
  dialogueContact() {
    return DialogueContactService.getInstance(this.config);
  }
  dialogueDetail() {
    return DialogueDetailService.getInstance(this.config);
  }
  notification() {
    return NotificationService.getInstance(this.config);
  }
  webSocketMessage() {
    return WebSocketMessageService.getInstance(this.config);
  }
  task() {
    return ExtendedTaskService.getInstance(this.config);
  }
  mgtCertificate() {
    return MgtCertificateService.getInstance(this.config);
  }
}
const createApi = (http, options) => {
  const config = new HttpConfig(http, options);
  return ApiResources.getInstance(config);
};
export {
  AbstractService2 as AbstractService,
  ApiResources,
  ApplicationEnum,
  AuthorityTypeEnum,
  Axios,
  Base64,
  ConstantEnum,
  ContentTypeEnum2 as ContentTypeEnum,
  ExtendedTaskService,
  GenderEnum,
  HttpConfig2 as HttpConfig,
  IdentityEnum,
  MgtCertificateService,
  NotificationCategoryEnum,
  OAuth2ApplicationService,
  OAuth2AuthorizationService,
  OAuth2CredentialRecordService,
  OAuth2InterfaceAuditService,
  OAuth2ScopeService,
  OAuth2UserLoggingService,
  Service,
  SocialBindingService,
  StatusEnum,
  SupplierType,
  SysAttributeService,
  SysDefaultRoleService,
  SysDepartmentService,
  SysDictionaryService,
  SysElementService,
  SysEmployeeAllocatableService,
  SysEmployeeService,
  SysOrganizationService,
  SysPermissionService,
  SysRoleService,
  SysTenantDataSourceService,
  SysUserService,
  TechnologyEnum,
  createApi,
  lodash,
  moment
};
