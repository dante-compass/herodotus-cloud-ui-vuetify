interface Props {
    loading?: boolean;
    closed?: boolean;
    hideActions?: boolean;
    maxWidth?: string | number;
    confirmLabel?: string;
}
type __VLS_Props = Props;
declare const open: import('vue').ModelRef<boolean, string, boolean, boolean>;
type __VLS_ModelProps = {
    modelValue: typeof open['value'];
};
type __VLS_PublicProps = __VLS_Props & __VLS_ModelProps;
declare var __VLS_39: {};
type __VLS_Slots = {} & {
    default?: (props: typeof __VLS_39) => any;
};
declare const __VLS_base: import('vue').DefineComponent<__VLS_PublicProps, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    close: () => any;
    "update:modelValue": (value: boolean) => any;
    cancel: () => any;
    confirm: () => any;
}, string, import('vue').PublicProps, Readonly<__VLS_PublicProps> & Readonly<{
    onClose?: (() => any) | undefined;
    "onUpdate:modelValue"?: ((value: boolean) => any) | undefined;
    onCancel?: (() => any) | undefined;
    onConfirm?: (() => any) | undefined;
}>, {
    maxWidth: string | number;
    loading: boolean;
    closed: boolean;
    hideActions: boolean;
    confirmLabel: string;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
