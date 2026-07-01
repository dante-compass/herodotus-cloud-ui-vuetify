interface Props {
    required?: boolean;
    text: string;
    message?: string;
    tooltip?: string;
}
declare var __VLS_12: {}, __VLS_31: {};
type __VLS_Slots = {} & {
    text?: (props: typeof __VLS_12) => any;
} & {
    default?: (props: typeof __VLS_31) => any;
};
declare const __VLS_base: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    required: boolean;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
