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
export {
  AuthorizationGrantTypeEnum,
  AuthorizationTokenEnum,
  BuildInScopeEnum,
  ClientAuthenticationMethodEnum,
  ContentTypeEnum,
  HttpMethodEnum,
  OperationEnum,
  StatusEnum
};
