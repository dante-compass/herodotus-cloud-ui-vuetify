export { ContentTypeEnum } from '@herodotus/core';
export { SocialSourceEnum, CaptchaCategoryEnum, NotificationCategoryEnum } from '@herodotus/apis';

export enum OperationEnum {
  CREATE = 'create',
  EDIT = 'edit',
  AUTHORIZE = 'authorize',
  INFO = 'info',
  ALLOCATABLE = 'allocatable',
  SETUP = 'setup',
  INVOKE = 'invoke',
}

export enum LayoutModeEnum {
  DEFAULT = 'defaults',
  CLASSIC = 'classic',
  TRANSVERSE = 'transverse',
  COLUMNS = 'transverse',
}

export enum ThemeModeEnum {
  DARK = 'dark',
  LIGHT = 'light',
  SYSTEM = 'system',
}
