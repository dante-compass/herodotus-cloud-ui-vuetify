import { PropType } from 'vue';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    wider: {
        type: PropType<"start" | "center" | "end">;
        default: string;
    };
    weight: {
        type: PropType<"thin" | "light" | "regular" | "medium" | "bold" | "bolder">;
        default: string;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    label: StringConstructor;
}>, {
    textWeight: import('vue').ComputedRef<string>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    wider: {
        type: PropType<"start" | "center" | "end">;
        default: string;
    };
    weight: {
        type: PropType<"thin" | "light" | "regular" | "medium" | "bold" | "bolder">;
        default: string;
    };
    offset: {
        type: NumberConstructor;
        default: number;
    };
    label: StringConstructor;
}>> & Readonly<{}>, {
    offset: number;
    weight: "bold" | "thin" | "light" | "regular" | "medium" | "bolder";
    wider: "center" | "start" | "end";
}, {}, {
    HContainer: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        mode: {
            type: PropType<"two" | "three">;
            default: string;
        };
        wider: {
            type: PropType<"default" | "start" | "center" | "end">;
            default: string;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
    }>, {
        leftCols: import('vue').Ref<number, number>;
        centerCols: import('vue').Ref<number, number>;
        rightCols: import('vue').Ref<number, number>;
        isTwoColumn: import('vue').ComputedRef<boolean>;
        isToTheLeft: import('vue').ComputedRef<boolean>;
        isToTheRight: import('vue').ComputedRef<boolean>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        mode: {
            type: PropType<"two" | "three">;
            default: string;
        };
        wider: {
            type: PropType<"default" | "start" | "center" | "end">;
            default: string;
        };
        offset: {
            type: NumberConstructor;
            default: number;
        };
    }>> & Readonly<{}>, {
        offset: number;
        mode: "two" | "three";
        wider: "default" | "center" | "start" | "end";
    }, {}, {
        HRow: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            column: {
                type: BooleanConstructor;
                default: boolean;
            };
            self: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: PropType<"none" | "start" | "center" | "end">;
                default: string;
            };
            justify: {
                type: PropType<"none" | "center" | "end" | "around" | "between" | "evenly">;
                default: string;
            };
            gutter: {
                type: PropType<"none" | "xs" | "sm" | "md" | "lg" | "xl">;
                default: string;
            };
            gutterCol: {
                type: BooleanConstructor;
                default: boolean;
            };
            horizontal: {
                type: BooleanConstructor;
                default: boolean;
            };
            vertical: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>, {
            getClasses: () => string;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            column: {
                type: BooleanConstructor;
                default: boolean;
            };
            self: {
                type: BooleanConstructor;
                default: boolean;
            };
            align: {
                type: PropType<"none" | "start" | "center" | "end">;
                default: string;
            };
            justify: {
                type: PropType<"none" | "center" | "end" | "around" | "between" | "evenly">;
                default: string;
            };
            gutter: {
                type: PropType<"none" | "xs" | "sm" | "md" | "lg" | "xl">;
                default: string;
            };
            gutterCol: {
                type: BooleanConstructor;
                default: boolean;
            };
            horizontal: {
                type: BooleanConstructor;
                default: boolean;
            };
            vertical: {
                type: BooleanConstructor;
                default: boolean;
            };
        }>> & Readonly<{}>, {
            align: "center" | "none" | "start" | "end";
            self: boolean;
            horizontal: boolean;
            vertical: boolean;
            justify: "center" | "none" | "end" | "around" | "between" | "evenly";
            column: boolean;
            gutter: "xs" | "sm" | "md" | "lg" | "xl" | "none";
            gutterCol: boolean;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
        HColumn: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            cols: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            xs: {
                type: StringConstructor;
                default: string;
            };
            sm: {
                type: StringConstructor;
                default: string;
            };
            md: {
                type: StringConstructor;
                default: string;
            };
            lg: {
                type: StringConstructor;
                default: string;
            };
            xl: {
                type: StringConstructor;
                default: string;
            };
            auto: {
                type: BooleanConstructor;
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>, {
            classes: import('vue').ComputedRef<string[]>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            cols: {
                type: (StringConstructor | NumberConstructor)[];
                default: string;
            };
            xs: {
                type: StringConstructor;
                default: string;
            };
            sm: {
                type: StringConstructor;
                default: string;
            };
            md: {
                type: StringConstructor;
                default: string;
            };
            lg: {
                type: StringConstructor;
                default: string;
            };
            xl: {
                type: StringConstructor;
                default: string;
            };
            auto: {
                type: BooleanConstructor;
                default: boolean;
            };
            color: {
                type: StringConstructor;
                default: string;
            };
        }>> & Readonly<{}>, {
            color: string;
            xs: string;
            sm: string;
            md: string;
            lg: string;
            xl: string;
            auto: boolean;
            cols: string | number;
        }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HLabel: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        size: {
            type: PropType<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2">;
            default: string;
        };
        weight: {
            type: PropType<"thin" | "light" | "regular" | "medium" | "bold" | "bolder">;
            default: string;
        };
        align: {
            type: PropType<"left" | "right" | "center" | "justify">;
            default: string;
        };
        text: StringConstructor;
    }>, {
        display: import('vue').ComputedRef<string>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        size: {
            type: PropType<"h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "caption" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2">;
            default: string;
        };
        weight: {
            type: PropType<"thin" | "light" | "regular" | "medium" | "bold" | "bolder">;
            default: string;
        };
        align: {
            type: PropType<"left" | "right" | "center" | "justify">;
            default: string;
        };
        text: StringConstructor;
    }>> & Readonly<{}>, {
        size: "caption" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "overline" | "subtitle-1" | "subtitle-2" | "body-1" | "body-2";
        align: "left" | "right" | "center" | "justify";
        weight: "bold" | "thin" | "light" | "regular" | "medium" | "bolder";
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
