import { VIcon, VTooltip } from 'vuetify/components';
interface Props {
    icon?: VIcon["icon"];
    color?: string | undefined;
    text?: string | number | boolean | undefined;
    tooltip?: string;
    location?: VTooltip["location"];
}
declare var __VLS_9: {}, __VLS_12: {}, __VLS_15: {}, __VLS_22: {};
type __VLS_Slots = {} & {
    append?: (props: typeof __VLS_9) => any;
} & {
    prepend?: (props: typeof __VLS_12) => any;
} & {
    loader?: (props: typeof __VLS_15) => any;
} & {
    default?: (props: typeof __VLS_22) => any;
};
declare const __VLS_base: import('vue').DefineComponent<Props, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<Props> & Readonly<{}>, {
    location: import('vuetify/lib/types.mjs').Anchor;
}, {}, {}, {}, string, import('vue').ComponentProvideOptions, false, {}, any>;
declare const __VLS_export: __VLS_WithSlots<typeof __VLS_base, __VLS_Slots>;
declare const _default: typeof __VLS_export;
export default _default;
type __VLS_WithSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
