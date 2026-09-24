import type { SelectItem } from "../declarations";

export const DURATION_UNITS: Array<SelectItem<string>> = [
  // Java Duration 不支持 moment 周、月、年 格式。
  // { title: "年", value: "years" },
  // { title: "月", value: "months" },
  // { title: "周", value: "weeks" },
  { title: "天", value: "days" },
  { title: "小时", value: "hours" },
  { title: "分", value: "minutes" },
  { title: "秒", value: "seconds" },
];
