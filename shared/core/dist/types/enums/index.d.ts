export declare enum ContentTypeEnum {
    URL_ENCODED = 0,
    MULTI_PART = 1,
    TEXT = 2,
    JSON = 3
}
export declare enum HttpMethodEnum {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE"
}
export declare enum StatusEnum {
    FORBIDDEN = 0,
    ENABLE = 1,
    LOCKING = 2,
    EXPIRED = 3
}
export declare enum AuthorizationTokenEnum {
    BASIC = "Basic ",
    BEARER = "Bearer "
}
export declare enum AuthorizationGrantTypeEnum {
    AUTHORIZATION_CODE = "authorization_code",
    REFRESH_TOKEN = "refresh_token",
    CLIENT_CREDENTIALS = "client_credentials",
    PASSWORD = "password",
    SOCIAL_CREDENTIALS = "social_credentials",
    WEBAUTHN_CREDENTIALS = "webauthn_credentials",
    DEVICE_CODE = "urn:ietf:params:oauth:grant-type:device_code",
    JWT_BEARER = "urn:ietf:params:oauth:grant-type:jwt-bearer",
    TOKEN_EXCHANGE = "urn:ietf:params:oauth:grant-type:token-exchange"
}
export declare enum BuildInScopeEnum {
    OPENID = "openid",
    EMAIL = "email",
    PROFILE = "profile",
    PHONE = "phone",
    ADDRESS = "address",
    ROLES = "roles",
    CLIENT_CREATE = "client.create",
    CLIENT_READ = "client.read"
}
export declare enum OperationEnum {
    CREATE = "create",
    EDIT = "edit",
    AUTHORIZE = "authorize",
    INFO = "info",
    ALLOCATABLE = "allocatable",
    SETUP = "setup",
    INVOKE = "invoke"
}
