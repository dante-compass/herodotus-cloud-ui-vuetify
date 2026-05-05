declare const date: import('vue').ModelRef<string | undefined, string, string | undefined, string | undefined>;
type __VLS_ModelProps = {
    modelValue?: typeof date['value'];
};
declare const __VLS_export: import('vue').DefineComponent<__VLS_ModelProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    "update:modelValue": (value: string | undefined) => any;
}, string, import('vue').PublicProps, Readonly<__VLS_ModelProps> & Readonly<{
    "onUpdate:modelValue"?: ((value: string | undefined) => any) | undefined;
}>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const _default: typeof __VLS_export;
export default _default;
