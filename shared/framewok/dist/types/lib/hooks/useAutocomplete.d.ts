import { Conditions, Domain, AbstractService } from '@herodotus/core';
import { Ref } from 'vue';
/**
 * 自动补全（Autocompletes）使用 hooks
 *
 * @param property 查询属性
 * @param service API 服务
 * @param <I> 输入值类型。传递给三级路由页面操作数据类型。通常为输入和输出为相同的实体类型，也可为非实体的 Dto 类型。
 * @param <O> 输出值类型，数据表格显示接口返回内容数据类型。通常为输入和输出为相同的实体类型，也可为非实体的 Dto 类型。
 * @returns
 */
export default function useAutocomplete<C extends Conditions, I extends Domain, O extends Domain = I>(property: keyof C, service: AbstractService<I, O>): {
    search: import('vue').ShallowRef<string, string>;
    loading: import('vue').ShallowRef<boolean, boolean>;
    items: Ref<O[], O[]>;
};
