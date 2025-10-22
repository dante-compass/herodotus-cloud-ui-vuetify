import axios from "axios";
import qs from "qs";
import { isFunction, isEmpty, merge, toUpper, replace } from "lodash-es";
import dayjs from "dayjs";
import { default as default2 } from "dayjs";
import "dayjs/locale/zh-cn";
import { generateFromString } from "generate-avatar";
import { sm2, sm4 } from "sm-crypto-v2";
import Swal from "sweetalert2";
import { default as default3 } from "sweetalert2";
import { lib, SHA256, enc } from "crypto-js";
var ContentTypeEnum = /* @__PURE__ */ ((ContentTypeEnum2) => {
  ContentTypeEnum2[ContentTypeEnum2["URL_ENCODED"] = 0] = "URL_ENCODED";
  ContentTypeEnum2[ContentTypeEnum2["MULTI_PART"] = 1] = "MULTI_PART";
  ContentTypeEnum2[ContentTypeEnum2["TEXT"] = 2] = "TEXT";
  ContentTypeEnum2[ContentTypeEnum2["JSON"] = 3] = "JSON";
  return ContentTypeEnum2;
})(ContentTypeEnum || {});
var HttpMethodEnum = /* @__PURE__ */ ((HttpMethodEnum2) => {
  HttpMethodEnum2["GET"] = "GET";
  HttpMethodEnum2["POST"] = "POST";
  HttpMethodEnum2["PUT"] = "PUT";
  HttpMethodEnum2["DELETE"] = "DELETE";
  return HttpMethodEnum2;
})(HttpMethodEnum || {});
var StatusEnum = /* @__PURE__ */ ((StatusEnum2) => {
  StatusEnum2[StatusEnum2["FORBIDDEN"] = 0] = "FORBIDDEN";
  StatusEnum2[StatusEnum2["ENABLE"] = 1] = "ENABLE";
  StatusEnum2[StatusEnum2["LOCKING"] = 2] = "LOCKING";
  StatusEnum2[StatusEnum2["EXPIRED"] = 3] = "EXPIRED";
  return StatusEnum2;
})(StatusEnum || {});
var AuthorizationTokenEnum = /* @__PURE__ */ ((AuthorizationTokenEnum2) => {
  AuthorizationTokenEnum2["BASIC"] = "Basic ";
  AuthorizationTokenEnum2["BEARER"] = "Bearer ";
  return AuthorizationTokenEnum2;
})(AuthorizationTokenEnum || {});
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
var ClientAuthenticationMethodEnum = /* @__PURE__ */ ((ClientAuthenticationMethodEnum2) => {
  ClientAuthenticationMethodEnum2["CLIENT_SECRET_BASIC"] = "client_secret_basic";
  ClientAuthenticationMethodEnum2["CLIENT_SECRET_POST"] = "client_secret_post";
  ClientAuthenticationMethodEnum2["CLIENT_SECRET_JWT"] = "client_secret_jwt";
  ClientAuthenticationMethodEnum2["PRIVATE_KEY_JWT"] = "private_key_jwt";
  ClientAuthenticationMethodEnum2["NONE"] = "none";
  ClientAuthenticationMethodEnum2["TLS_CLIENT_AUTH"] = "tls_client_auth";
  ClientAuthenticationMethodEnum2["SELF_SIGNED_TLS_CLIENT_AUTH"] = "self_signed_tls_client_auth";
  return ClientAuthenticationMethodEnum2;
})(ClientAuthenticationMethodEnum || {});
var BuildInScopeEnum = /* @__PURE__ */ ((BuildInScopeEnum2) => {
  BuildInScopeEnum2["OPENID"] = "openid";
  BuildInScopeEnum2["EMAIL"] = "email";
  BuildInScopeEnum2["PROFILE"] = "profile";
  BuildInScopeEnum2["PHONE"] = "phone";
  BuildInScopeEnum2["ADDRESS"] = "address";
  BuildInScopeEnum2["ROLES"] = "roles";
  BuildInScopeEnum2["CLIENT_CREATE"] = "client.create";
  BuildInScopeEnum2["CLIENT_READ"] = "client.read";
  return BuildInScopeEnum2;
})(BuildInScopeEnum || {});
var OperationEnum = /* @__PURE__ */ ((OperationEnum2) => {
  OperationEnum2["CREATE"] = "create";
  OperationEnum2["EDIT"] = "edit";
  OperationEnum2["AUTHORIZE"] = "authorize";
  OperationEnum2["INFO"] = "info";
  OperationEnum2["ALLOCATABLE"] = "allocatable";
  OperationEnum2["SETUP"] = "setup";
  OperationEnum2["INVOKE"] = "invoke";
  return OperationEnum2;
})(OperationEnum || {});
let pendingMap = /* @__PURE__ */ new Map();
const getPendingUrl = (config) => [config.method, config.url].join("&");
class AxiosCanceler {
  /**
   * Add request
   * @param {Object} config
   */
  addPending(config) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
      if (!pendingMap.has(url)) {
        pendingMap.set(url, cancel);
      }
    });
  }
  /**
   * @description: Clear all pending
   */
  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }
  /**
   * Removal request
   * @param {Object} config
   */
  removePending(config) {
    const url = getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }
  /**
   * @description: reset
   */
  reset() {
    pendingMap = /* @__PURE__ */ new Map();
  }
}
class Axios {
  axiosInstance;
  defaultAxiosRequestConfig;
  defaultRequestOptions;
  axiosInstanceHooks;
  constructor(defaultAxiosRequestConfig, axiosInstanceHooks, defaultRequestOptions) {
    this.defaultAxiosRequestConfig = defaultAxiosRequestConfig;
    this.defaultRequestOptions = defaultRequestOptions;
    this.axiosInstanceHooks = axiosInstanceHooks;
    this.axiosInstance = this.createAxiosInstance(defaultAxiosRequestConfig);
    this.setupInterceptors();
  }
  createAxiosInstance(config) {
    return axios.create(config);
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
  createHttpHeaderPolicy(contentType) {
    switch (contentType) {
      case ContentTypeEnum.URL_ENCODED:
        return {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          dataConvert: (data) => {
            return qs.stringify(data, { arrayFormat: "brackets" });
          }
        };
      case ContentTypeEnum.MULTI_PART:
        return {
          headers: { "Content-Type": "multipart/form-data" },
          dataConvert: (data) => {
            return data;
          }
        };
      default:
        return {
          headers: { "Content-Type": "application/json" },
          dataConvert: (data) => {
            return JSON.stringify(data);
          }
        };
    }
  }
  setupInterceptors() {
    const instanceHooks = this.getAxiosInstanceHooks();
    if (!instanceHooks) {
      return;
    }
    const {
      requestInterceptors,
      requestInterceptorsError,
      responseInterceptors,
      responseInterceptorsError
    } = instanceHooks;
    const axiosCanceler = new AxiosCanceler();
    this.getAxiosInstance().interceptors.request.use(
      (config) => {
        const { prohibitRepeatRequests } = this.getDefaultRequestOptions();
        if (prohibitRepeatRequests) {
          axiosCanceler.addPending(config);
        }
        return requestInterceptors(config);
      },
      (error) => {
        return requestInterceptorsError(this.getAxiosInstance(), error);
      }
    );
    this.getAxiosInstance().interceptors.response.use(
      (response) => {
        response && axiosCanceler.removePending(response.config);
        return responseInterceptors(response);
      },
      (error) => {
        return responseInterceptorsError(this.getAxiosInstance(), error);
      }
    );
  }
  /**
   * 把当前请求的 options 与全局 options 整合获得一个完整的 options
   * @param currentRequestOptions 当前请求的 options
   * @returns 合并后的 options
   */
  mergeHttpRequestOptions(currentRequestOptions) {
    const defaultRequestOptions = this.getDefaultRequestOptions();
    if (!isEmpty(currentRequestOptions)) {
      return merge({}, defaultRequestOptions, currentRequestOptions);
    } else {
      return defaultRequestOptions;
    }
  }
  /**
   * 把当前请求的 AxiosRequestConfig 与全局 AxiosRequestConfig 整合获得一个完整的 AxiosRequestConfig
   * @param currentAxiosRequestConfig 当前请求的 AxiosRequestConfig
   * @returns 合并后的 AxiosRequestConfig
   */
  mergeAxiosRequestConfigs(currentAxiosRequestConfig) {
    const defaultAxiosRequestConfig = this.getDefaultAxiosRequestConfig();
    const paramsSerializer = {
      serialize(params) {
        return Object.keys(params).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join("&");
      }
    };
    const result = merge({ paramsSerializer }, defaultAxiosRequestConfig);
    if (!isEmpty(currentAxiosRequestConfig)) {
      return merge({}, result, currentAxiosRequestConfig);
    } else {
      return result;
    }
  }
  setupRequestStrategy(url, currentAxiosRequestConfig, currentHttpRequestOptions) {
    const { onRequestHook } = this.getAxiosInstanceHooks();
    const httpRequestOptions = this.mergeHttpRequestOptions(currentHttpRequestOptions);
    let axiosRequestConfig = this.mergeAxiosRequestConfigs(currentAxiosRequestConfig);
    if (onRequestHook && isFunction(onRequestHook)) {
      axiosRequestConfig = onRequestHook(axiosRequestConfig, httpRequestOptions);
    }
    const httpHeaderPolicy = this.createHttpHeaderPolicy(httpRequestOptions.contentType);
    if (axiosRequestConfig.headers) {
      axiosRequestConfig.headers = merge(axiosRequestConfig.headers, httpHeaderPolicy.headers);
    } else {
      axiosRequestConfig.headers = httpHeaderPolicy.headers;
    }
    axiosRequestConfig.url = url;
    if (!isEmpty(axiosRequestConfig.data)) {
      axiosRequestConfig.data = httpHeaderPolicy.dataConvert(axiosRequestConfig.data);
    }
    return {
      config: axiosRequestConfig,
      options: httpRequestOptions
    };
  }
  /**
   * 请求核心方法
   * @param config axios request 必要参数
   * @param options 针对每个请求特别指定的参数
   * @returns 响应数据
   */
  request(config, options) {
    return new Promise((resolve, reject) => {
      const { onResponseErrorHook, onResponseSuccessHook } = this.getAxiosInstanceHooks();
      this.getAxiosInstance().request(config).then((response) => {
        if (onResponseSuccessHook && isFunction(onResponseSuccessHook)) {
          const result = onResponseSuccessHook(response, options);
          resolve(result);
        } else {
          resolve(response);
        }
      }).catch((error) => {
        if (onResponseErrorHook && isFunction(onResponseErrorHook)) {
          const result = onResponseErrorHook(error, options);
          reject(result);
        } else {
          reject(error);
        }
      });
    });
  }
  /**
   * 处理请求。提取公共代码，避免每个方法中都要写一遍
   * @param url 请求地址
   * @param config axios request 必要参数
   * @param options 针对每个请求特别指定的参数
   * @returns 响应数据
   */
  process(url, config, options = {}) {
    let strategy = this.setupRequestStrategy(url, config, options);
    return this.request(strategy.config, strategy.options);
  }
  /**
   * GET
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param options 对当前请求设置的参数
   * @returns
   */
  get(url, params = {}, options = { contentType: ContentTypeEnum.JSON }) {
    return this.process(
      url,
      {
        params,
        method: HttpMethodEnum.GET
      },
      options
    );
  }
  /**
   * POST
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置。POST 操作会有不同的 Content Type，以及不同的设置。
   * @returns
   */
  post(url, data, options = { contentType: ContentTypeEnum.JSON }, config) {
    return this.process(
      url,
      {
        ...config,
        data,
        method: HttpMethodEnum.POST
      },
      options
    );
  }
  /**
   * POST
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param config 当前请求对 axios 特殊设置
   * @returns
   */
  postWithParams(url, params, data = {}, options = { contentType: ContentTypeEnum.JSON }, config) {
    return this.process(
      url,
      {
        ...config,
        params,
        data,
        method: HttpMethodEnum.POST
      },
      options
    );
  }
  /**
   * PUT。更新操作。
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置
   * @returns 响应数据
   */
  put(url, data, options = { contentType: ContentTypeEnum.JSON }, config) {
    return this.process(
      url,
      {
        ...config,
        data,
        method: HttpMethodEnum.PUT
      },
      options
    );
  }
  /**
   * PUT。更新操作。
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param data 放置在 RequestBody 中的数据
   * @param options 对当前请求设置的参数。
   * @param config 当前请求对 axios 特殊设置
   * @returns 响应数据
   */
  putWithParams(url, params, data = {}, options = { contentType: ContentTypeEnum.JSON }, config) {
    return this.process(
      url,
      {
        ...config,
        params,
        data,
        method: HttpMethodEnum.PUT
      },
      options
    );
  }
  /**
   * DELETE。删除操作
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param options 对当前请求设置的参数。
   * @returns 响应数据
   */
  delete(url, data = {}, options = { contentType: ContentTypeEnum.JSON }) {
    return this.process(
      url,
      {
        data,
        method: HttpMethodEnum.DELETE
      },
      options
    );
  }
  /**
   * DELETE。删除操作
   *
   * 针对 url 中有参数同时 request body 中也有数据的情况。额外增加一个方法，以防对现有的代码产生影响。
   *
   * <T> 返回响应中实际 data 中的内容类型
   * <D> RequestBody 中的数据类型，实际对应 axios config 中的 data
   *
   * @param url 请求地址
   * @param params 拼接在请求地址路径后面的参数，根据实际情况也可能不需要。
   * @param data 放置在 RequestBody 中的数据，根据实际情况也可能不需要
   * @param options 对当前请求设置的参数。
   * @returns 响应数据
   */
  deleteWithParams(url, params, data = {}, options = { contentType: ContentTypeEnum.JSON }) {
    return this.process(
      url,
      {
        params,
        data,
        method: HttpMethodEnum.DELETE
      },
      options
    );
  }
}
const parseResponseStatus = (response, message) => {
  let data = {};
  if ("statusText" in response) {
    data = response.data;
  } else {
    data = response;
  }
  const responseStatus = { status: response.status, code: 0, detail: "" };
  responseStatus.code = data && data.code ? data.code : 0;
  responseStatus.detail = data.error && data.error.detail ? data.error.detail : "";
  if (data.message) {
    responseStatus.message = data.message;
  } else {
    if (data.error && data.error.message) {
      responseStatus.message = data.error.message;
    } else {
      if (message) {
        responseStatus.message = message;
      }
    }
  }
  return responseStatus;
};
const logResponse = (response) => {
  const randomColor = `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(
    Math.random() * 255
  )})`;
  console.log(
    "%c┍------------------------------------------------------------------------------------------┑",
    `color:${randomColor};`
  );
  if ("config" in response) {
    console.log("| 请求地址：", response.config.url);
    console.log("| 请求类型：", toUpper(response.config.method));
    console.log("| 请求参数：", qs.parse(response.config.params));
    console.log("| 响应数据：", response.data);
  } else if ("status" in response) {
    console.log("| 响应数据：", response.data);
  } else {
    console.log("| 响应数据：", response);
  }
  console.log(
    "%c┕------------------------------------------------------------------------------------------┙",
    `color:${randomColor};`
  );
};
const isSuccess = (response) => {
  if (response && "statusText" in response) {
    return /^(2|3)\d{2}$/.test(String(response.status));
  } else {
    return false;
  }
};
class HttpConfig {
  http = {};
  project = "";
  clientId = "";
  clientSecret = "";
  oidc = false;
  uaaAddress = "";
  upmsAddress = "";
  msgAddress = "";
  ossAddress = "";
  bpmnAddress = "";
  cmdbAddress = "";
  iotAddress = "";
  manageAddress = "";
  proxy = "";
  constructor(http, options) {
    this.http = http;
    this.project = options.project;
    this.clientId = options.clientId;
    this.clientSecret = options.clientSecret;
    this.oidc = options.oidc ? options.oidc : false;
    this.proxy = options.proxy ? options.proxy : "/api";
    this.switch(options.project);
  }
  switch(type) {
    switch (type) {
      case "dante":
        this.uaaAddress = "/dante-cloud-uaa";
        this.upmsAddress = "/dante-cloud-upms";
        this.msgAddress = "/dante-cloud-message";
        this.ossAddress = "/dante-cloud-oss-ability";
        this.bpmnAddress = "/dante-cloud-bpmn-ability/engine-rest";
        this.cmdbAddress = "/dante-cloud-cmdb-ability";
        this.iotAddress = "/dante-cloud-iot-ability";
        this.manageAddress = "/dante-cloud-manage-ability";
        break;
      case "herodotus":
        this.uaaAddress = "/herodotus-cloud-uaa";
        this.upmsAddress = "/herodotus-cloud-upms";
        this.msgAddress = "/herodotus-cloud-message";
        this.ossAddress = "/herodotus-cloud-oss-ability";
        this.bpmnAddress = "/herodotus-cloud-bpmn-ability/engine-rest";
        this.cmdbAddress = "/herodotus-cloud-cmdb-ability";
        this.iotAddress = "/herodotus-cloud-iot-ability";
        this.manageAddress = "/herodotus-cloud-manage-ability";
        break;
      default:
        this.uaaAddress = "";
        this.upmsAddress = "";
        this.msgAddress = "";
        this.ossAddress = "";
        this.bpmnAddress = "/engine-rest";
        this.cmdbAddress = "";
        this.iotAddress = "";
        this.manageAddress = "";
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
  processProxy(content, withProxy = true) {
    if (withProxy) {
      return this.proxy + content;
    } else {
      return content;
    }
  }
  getUaa(withProxy = true) {
    return this.processProxy(this.uaaAddress, withProxy);
  }
  getUpms(withProxy = true) {
    return this.processProxy(this.upmsAddress, withProxy);
  }
  getMsg(withProxy = true) {
    return this.processProxy(this.msgAddress, withProxy);
  }
  getOss(withProxy = true) {
    return this.processProxy(this.ossAddress, withProxy);
  }
  getBpmn(withProxy = true, isExtended = false) {
    let result = this.processProxy(this.bpmnAddress, withProxy);
    if (isExtended) {
      return replace(result, "engine-rest", "camunda-extended");
    } else {
      return result;
    }
  }
  getCmdb(withProxy = true) {
    return this.processProxy(this.cmdbAddress, withProxy);
  }
  getIot(withProxy = true) {
    return this.processProxy(this.iotAddress, withProxy);
  }
  getManage(withProxy = true) {
    return this.processProxy(this.manageAddress, withProxy);
  }
}
class Service {
  config;
  constructor(config) {
    this.config = config;
  }
  getConfig() {
    return this.config;
  }
  getParamPath(path, param) {
    return path + "/" + param;
  }
  getIdPath(id) {
    return this.getParamPath(this.getBaseAddress(), id);
  }
}
class AbstractService extends Service {
  getConditionAddress() {
    return this.getBaseAddress() + "/condition";
  }
  getListAddress() {
    return this.getBaseAddress() + "/list";
  }
  getTreeAddress() {
    return this.getBaseAddress() + "/tree";
  }
  fetch(params = {}) {
    return this.getConfig().getHttp().get(this.getBaseAddress(), params);
  }
  fetchByPage(params, others = {}) {
    if (isEmpty(others)) {
      return this.getConfig().getHttp().get(this.getBaseAddress(), params);
    } else {
      const fullParams = Object.assign(params, others);
      return this.getConfig().getHttp().get(this.getConditionAddress(), fullParams);
    }
  }
  fetchAll(params = {}) {
    return this.getConfig().getHttp().get(this.getListAddress(), params);
  }
  fetchTree(params = {}) {
    return this.getConfig().getHttp().get(this.getTreeAddress(), params);
  }
  saveOrUpdate(data) {
    return this.getConfig().getHttp().post(this.getBaseAddress(), data);
  }
  delete(id) {
    return this.getConfig().getHttp().delete(this.getIdPath(id));
  }
  assign(data) {
    return this.getConfig().getHttp().put(this.getBaseAddress(), data, {
      contentType: ContentTypeEnum.URL_ENCODED
    });
  }
}
dayjs.locale("zh-cn");
class AvatarUtilities {
  static instance = new AvatarUtilities();
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  generate(id) {
    return `data:image/svg+xml;utf8,${generateFromString(id)}`;
  }
}
const AvatarUtils = AvatarUtilities.getInstance();
class SM2Utilities {
  static instance = new SM2Utilities();
  cipherMode = 1;
  // 1 - C1C3C2，0 - C1C2C3
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  createKeyPair() {
    return sm2.generateKeyPairHex();
  }
  encrypt(content, publicKey) {
    return "04" + sm2.doEncrypt(content, publicKey, this.cipherMode);
  }
  decrypt(content, privateKey) {
    let data = content.substring(2).toLocaleLowerCase();
    return sm2.doDecrypt(data, privateKey, this.cipherMode, { output: "string" });
  }
}
class SM4Utilities {
  static instance = new SM4Utilities();
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  encrypt(content, publicKey) {
    return sm4.encrypt(content, publicKey, { output: "string" });
  }
  decrypt(content, privateKey) {
    return sm4.decrypt(content, privateKey, { output: "string" });
  }
}
const SM2Utils = SM2Utilities.getInstance();
const SM4Utils = SM4Utilities.getInstance();
const SwalToast = Swal.mixin({
  toast: true,
  position: "top",
  showConfirmButton: false,
  timer: 2e3,
  timerProgressBar: false,
  didOpen: (toast2) => {
    toast2.addEventListener("mouseenter", Swal.stopTimer);
    toast2.addEventListener("mouseleave", Swal.resumeTimer);
  }
});
const standardDeleteNotify = (onConfirm, onCancel) => {
  Swal.fire({
    title: "确定删除?",
    text: "您将无法恢复此操作！",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "是的, 删除!",
    cancelButtonText: "取消"
  }).then((confirm) => {
    if (confirm.value) {
      onConfirm();
    } else {
      if (onCancel) {
        onCancel();
      }
    }
  });
};
class Notify {
  static instance = new Notify();
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  information(title, text, icon) {
    return Swal.fire({
      title,
      text,
      position: "top",
      icon,
      timer: 5e3,
      showConfirmButton: false,
      showClass: {
        popup: "animate__animated animate__fadeIn"
      },
      hideClass: {
        popup: "animate__animated animate__fadeOut"
      }
    });
  }
  info(title, text = "") {
    return this.information(title, text, "info");
  }
  error(title, text = "") {
    return this.information(title, text, "error");
  }
  warning(title, text = "") {
    return this.information(title, text, "warning");
  }
  success(title, text = "") {
    return this.information(title, text, "success");
  }
  question(title, text = "") {
    return this.information(title, text, "question");
  }
}
const notify = Notify.getInstance();
class Toast {
  static instance = new Toast();
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  information(title, icon) {
    return SwalToast.fire({
      icon,
      title
    });
  }
  info(text) {
    return this.information(text, "info");
  }
  error(text) {
    return this.information(text, "error");
  }
  warning(text) {
    return this.information(text, "warning");
  }
  success(text) {
    return this.information(text, "success");
  }
  question(text) {
    return this.information(text, "question");
  }
}
const toast = Toast.getInstance();
class PkceUtilities {
  static instance = new PkceUtilities();
  constructor() {
  }
  static getInstance() {
    return this.instance;
  }
  /**
   * Thanks to @SEIAROTg on stackoverflow:
   * "Convert a 32bit integer into 4 bytes of data in javascript"
   * @param num The 32bit integer
   * @returns An ArrayBuffer representing 4 bytes of binary data
   */
  toBytesInt32(num) {
    const arr = new ArrayBuffer(4);
    const view = new DataView(arr);
    view.setUint32(0, num, false);
    return arr;
  }
  /**
   * Creates an array of length `size` of random bytes
   * @param size
   * @returns Array of random ints (0 to 255)
   */
  getRandomValues(size) {
    const randoms = lib.WordArray.random(size);
    const randoms1byte = [];
    randoms.words.forEach((word) => {
      const arr = this.toBytesInt32(word);
      const fourByteWord = new Uint8Array(arr);
      for (let i = 0; i < 4; i++) {
        let word2 = fourByteWord[i];
        if (word2 !== void 0) {
          randoms1byte.push(word2);
        }
      }
    });
    return randoms1byte;
  }
  /** Generate cryptographically strong random string
   * @param size The desired length of the string
   * @returns The random string
   */
  random(size) {
    const mask = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~";
    let result = "";
    const randomUints = this.getRandomValues(size);
    for (let i = 0; i < size; i++) {
      let randomUint = randomUints[i];
      if (randomUint !== void 0) {
        const randomIndex = randomUint % mask.length;
        result += mask[randomIndex];
      }
    }
    return result;
  }
  /** Generate a PKCE challenge verifier
   * @param length Length of the verifier
   * @returns A random verifier `length` characters long
   */
  generateVerifier(length) {
    return this.random(length);
  }
  /** Generate a PKCE code challenge from a code verifier
   * @param code_verifier
   * @returns The base64 url encoded code challenge
   */
  generateChallenge(code_verifier) {
    return SHA256(code_verifier).toString(enc.Base64url);
  }
  /** Generate a PKCE challenge pair
   * @param length Length of the verifer (between 43-128). Defaults to 43.
   * @returns PKCE challenge pair
   */
  generateCodePair(length = 43) {
    if (length < 43 || length > 128) {
      throw `Expected a length between 43 and 128. Received ${length}.`;
    }
    const verifier = this.generateVerifier(length);
    const challenge = this.generateChallenge(verifier);
    return {
      codeVerifier: verifier,
      codeChallenge: challenge
    };
  }
  /** Verify that a code_verifier produces the expected code challenge
   * @param code_verifier
   * @param expectedChallenge The code challenge to verify
   * @returns True if challenges are equal. False otherwise.
   */
  verifyChallenge(code_verifier, expectedChallenge) {
    const actualChallenge = this.generateChallenge(code_verifier);
    return actualChallenge === expectedChallenge;
  }
}
const PKCE = PkceUtilities.getInstance();
export {
  AbstractService,
  AuthorizationGrantTypeEnum,
  AuthorizationTokenEnum,
  AvatarUtils,
  Axios,
  BuildInScopeEnum,
  ClientAuthenticationMethodEnum,
  ContentTypeEnum,
  default2 as DayJs,
  HttpConfig,
  HttpMethodEnum,
  OperationEnum,
  PKCE,
  SM2Utils,
  SM4Utils,
  Service,
  StatusEnum,
  default3 as Swal,
  isSuccess,
  logResponse,
  notify,
  parseResponseStatus,
  standardDeleteNotify,
  toast
};
