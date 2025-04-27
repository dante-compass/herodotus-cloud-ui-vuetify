declare const _default: import('vue').DefineComponent<{}, {
    conditionExpression: import('vue').Ref<string, string>;
    format: import('vue').Ref<string, string>;
    resource: import('vue').Ref<string, string>;
    script: import('vue').Ref<string, string>;
    conditionType: import('vue').Ref<string, string>;
    conditionOptions: import('vue').Ref<{
        text: string;
        value: string;
    }[], {
        text: string;
        value: string;
    }[] | {
        text: string;
        value: string;
    }[]>;
    scriptType: import('vue').Ref<string, string>;
    scriptOptions: import('vue').Ref<{
        text: string;
        value: string;
    }[], {
        text: string;
        value: string;
    }[] | {
        text: string;
        value: string;
    }[]>;
    isScript: import('vue').ComputedRef<boolean>;
    isExpression: import('vue').ComputedRef<boolean>;
    isExternalResource: import('vue').ComputedRef<boolean>;
    updateConditionExpression: (value: string) => void;
    updateFormat: (value: string) => void;
    updateResource: (value: string) => void;
    updateScript: (value: string) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<{}> & Readonly<{}>, {}, {}, {
    HExpansionItem: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        icon: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: string;
        };
        badge: {
            type: BooleanConstructor;
            default: boolean;
        };
        badgeColor: {
            type: StringConstructor;
            default: string;
        };
        count: {
            type: NumberConstructor;
            default: number;
        };
        defaultOpend: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        icon: {
            type: StringConstructor;
            default: string;
        };
        label: {
            type: StringConstructor;
            default: string;
        };
        badge: {
            type: BooleanConstructor;
            default: boolean;
        };
        badgeColor: {
            type: StringConstructor;
            default: string;
        };
        count: {
            type: NumberConstructor;
            default: number;
        };
        defaultOpend: {
            type: BooleanConstructor;
            default: boolean;
        };
    }>> & Readonly<{}>, {
        label: string;
        icon: string;
        badge: boolean;
        badgeColor: string;
        count: number;
        defaultOpend: boolean;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HTextField: any;
    HSelect: any;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
