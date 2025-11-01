import { AbstractService, ContentTypeEnum, Service, HttpConfig } from "@herodotus/core";
import { ContentTypeEnum as ContentTypeEnum2 } from "@herodotus/core";
var GenderEnum = /* @__PURE__ */ ((GenderEnum2) => {
  GenderEnum2[GenderEnum2["OTHERS"] = 0] = "OTHERS";
  GenderEnum2[GenderEnum2["MAN"] = 1] = "MAN";
  GenderEnum2[GenderEnum2["WOMAN"] = 2] = "WOMAN";
  return GenderEnum2;
})(GenderEnum || {});
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
class BucketService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new BucketService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getOss() + "/oss/bucket";
  }
  getListAddress() {
    return this.getBaseAddress() + "/list";
  }
  listBuckets() {
    return this.getConfig().getHttp().get(this.getListAddress());
  }
  createBucket(request) {
    return this.getConfig().getHttp().post(this.getBaseAddress(), request);
  }
  deleteBucket(request) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), request);
  }
}
class ObjectService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new ObjectService(config);
    }
    return this.instance;
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
  listObjectsV2(request) {
    return this.getConfig().getHttp().get(this.getListV2Address(), request);
  }
  delete(request) {
    return this.getConfig().getHttp().delete(this.getBaseAddress(), request);
  }
  upload(bucketName, file, onProgress) {
    return this.getConfig().getHttp().post(this.getUploadAddress(), { bucketName, file }, { contentType: ContentTypeEnum.JSON }, { onUploadProgress: onProgress });
  }
  download(request, onProgress) {
    return this.getConfig().getHttp().post(this.getDownloadAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: "blob", onDownloadProgress: onProgress });
  }
  display(request) {
    return this.getConfig().getHttp().post(this.getDisplayAddress(), request, { contentType: ContentTypeEnum.JSON }, { responseType: "blob" });
  }
  batchDelete(request) {
    return this.getConfig().getHttp().delete(this.getMultiDeleteAddress(), request);
  }
}
class MultipartUploadService extends Service {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new MultipartUploadService(config);
    }
    return this.instance;
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
  createChunkUpload(request) {
    return this.getConfig().getHttp().post(this.getCreateMultipartUploadAddress(), request);
  }
  completeChunkUpload(request) {
    return this.getConfig().getHttp().post(this.getCompleteMultipartUploadAddress(), request);
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
  ossBucket() {
    return BucketService.getInstance(this.config);
  }
  ossObject() {
    return ObjectService.getInstance(this.config);
  }
  ossMultipartUpload() {
    return MultipartUploadService.getInstance(this.config);
  }
}
const createApi = (http, options) => {
  const config = new HttpConfig(http, options);
  return ApiResources.getInstance(config);
};
export {
  ApiResources,
  BucketService,
  ContentTypeEnum2 as ContentTypeEnum,
  DialogueContactService,
  DialogueDetailService,
  ExtendedTaskService,
  GenderEnum,
  MgtCertificateService,
  MultipartUploadService,
  NotificationCategoryEnum,
  NotificationService,
  OAuth2ApplicationService,
  OAuth2AuthorizationService,
  OAuth2CredentialRecordService,
  OAuth2InterfaceAuditService,
  OAuth2ScopeService,
  OAuth2UserLoggingService,
  ObjectService,
  SocialBindingService,
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
  WebSocketMessageService,
  createApi
};
