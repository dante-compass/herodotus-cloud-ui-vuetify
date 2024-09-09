export type EmptyObject = {
  [K in string]: never;
};

/**
 * 获取方法中参数的类型
 */
export type ParametersType<T> = T extends (args: infer R) => any ? R : any;

export type Dictionary = {
  ordinal: number;
  name: string;
  value: string;
  label: string;
};
