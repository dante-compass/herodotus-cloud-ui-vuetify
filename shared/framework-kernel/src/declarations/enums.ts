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

export enum CaptchaCategoryEnum {
  /**
   * 滑块拼图验证码
   */
  JIGSAW = 'JIGSAW',
  /**
   * 文字点选验证码
   */
  WORD_CLICK = 'WORD_CLICK',
  /**
   * 算数类型验证码
   */
  ARITHMETIC = 'ARITHMETIC',
  /**
   * 中文类型验证码
   */
  CHINESE = 'CHINESE',
  /**
   * 中文GIF类型验证码
   */
  CHINESE_GIF = 'CHINESE_GIF',
  /**
   * GIF类型验证码
   */
  SPEC_GIF = 'SPEC_GIF',
  /**
   * PNG类型验证码
   */
  SPEC = 'SPEC',
  /**
   * Hutool线段干扰验证码
   */
  HUTOOL_LINE = 'HUTOOL_LINE',
  /**
   * Hutool圆圈干扰验证码
   */
  HUTOOL_CIRCLE = 'HUTOOL_CIRCLE',
  /**
   * Hutool扭曲干扰验证码
   */
  HUTOOL_SHEAR = 'HUTOOL_SHEAR',
  /**
   * Hutool GIF验证码
   */
  HUTOOL_GIF = 'HUTOOL_GIF',
}

export enum SocialSourceEnum {
  INSTITUTION,
  SMS,
  WXAPP,
  QQ,
  WEIBO,
  BAIDU,
  WECHAT_OPEN,
  WECHAT_MP,
  WECHAT_ENTERPRISE,
  WECHAT_ENTERPRISE_WEB,
  DINGTALK,
  DINGTALK_ACCOUNT,
  ALIYUN,
  TAOBAO,
  ALIPAY,
  TEAMBITION,
  HUAWEI_V2,
  FEISHU,
  JD,
  DOUYIN,
  TOUTIAO,
  MI,
  RENREN,
  MEITUAN,
  ELEME,
  KUJIALE,
  XMLY,
  GITEE,
  OSCHINA,
  CSDN,
  GITHUB,
  GITLAB,
  STACK_OVERFLOW,
  CODING,
  GOOGLE,
  MICROSOFT,
  FACEBOOK,
  LINKEDIN,
  TWITTER,
  AMAZON,
  SLACK,
  LINE,
  OKTA,
  PINTEREST,
}
