declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        defalut: string;
    };
}>, {
    durationValue: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
    amount: import('vue').Ref<number, number>;
    unit: import('vue').Ref<string, string>;
    options: import('vue').Ref<{
        text: string;
        value: string;
    }[], import('..').SelectItem<string>[] | {
        text: string;
        value: string;
    }[]>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (StringConstructor | NumberConstructor)[];
        defalut: string;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {}, {}, {
    HSelect: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | ObjectConstructor | NumberConstructor | ArrayConstructor)[];
        };
        optionLabel: {
            type: StringConstructor;
            default: string;
        };
        optionValue: {
            type: StringConstructor;
            default: string;
        };
        errorMessage: {
            type: StringConstructor;
        };
    }>, {
        selectedValue: import('vue').WritableComputedRef<string | number | Record<string, any> | unknown[] | undefined, string | number | Record<string, any> | unknown[] | undefined>;
        hasError: import('vue').ComputedRef<boolean>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | ObjectConstructor | NumberConstructor | ArrayConstructor)[];
        };
        optionLabel: {
            type: StringConstructor;
            default: string;
        };
        optionValue: {
            type: StringConstructor;
            default: string;
        };
        errorMessage: {
            type: StringConstructor;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, {
        optionLabel: string;
        optionValue: string;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
