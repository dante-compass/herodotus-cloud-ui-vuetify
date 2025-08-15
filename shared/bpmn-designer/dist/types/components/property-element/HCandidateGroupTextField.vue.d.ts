import { Ref } from 'vue';
import { GroupEntity } from '../../declarations';
declare const _default: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
    };
    title: {
        type: StringConstructor;
    };
}>, {
    isOpen: Ref<boolean, boolean>;
    isDisabled: import('vue').ComputedRef<boolean>;
    selected: Ref<GroupEntity[], GroupEntity[]>;
    assignee: import('vue').WritableComputedRef<string, string>;
    onClose: () => void;
    onSave: () => void;
    onOpen: () => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    label: {
        type: StringConstructor;
    };
    title: {
        type: StringConstructor;
    };
}>> & Readonly<{
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}>, {
    modelValue: string;
}, {}, {
    HDialog: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        cancelLabel: {
            type: StringConstructor;
            default: string;
        };
        confirmLabel: {
            type: StringConstructor;
            default: string;
        };
        confirmDisable: {
            type: BooleanConstructor;
            default: boolean;
        };
        width: {
            type: StringConstructor;
            default: string;
        };
    }>, {
        isOpen: import('vue').WritableComputedRef<boolean, boolean>;
        onClose: () => void;
        onSave: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, ("update:modelValue" | "save")[], "update:modelValue" | "save", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: BooleanConstructor;
            default: boolean;
        };
        title: {
            type: StringConstructor;
            default: string;
        };
        cancelLabel: {
            type: StringConstructor;
            default: string;
        };
        confirmLabel: {
            type: StringConstructor;
            default: string;
        };
        confirmDisable: {
            type: BooleanConstructor;
            default: boolean;
        };
        width: {
            type: StringConstructor;
            default: string;
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        onSave?: ((...args: any[]) => any) | undefined;
    }>, {
        width: string;
        title: string;
        modelValue: boolean;
        cancelLabel: string;
        confirmLabel: string;
        confirmDisable: boolean;
    }, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HGroupSelectTable: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: import('vue').PropType<Array<GroupEntity>>;
            default: () => Array<GroupEntity>;
        };
    }>, {
        tableRows: Ref<GroupEntity[], GroupEntity[]>;
        totalPages: Ref<number, number>;
        pagination: Ref<{
            sortBy: string | null;
            descending: boolean;
            page: number;
            rowsPerPage: number;
            rowsNumber: number;
        }, Required<{
            sortBy?: string | null;
            descending?: boolean;
            page?: number;
            rowsPerPage?: number;
            rowsNumber?: number;
        }> | {
            sortBy: string | null;
            descending: boolean;
            page: number;
            rowsPerPage: number;
            rowsNumber: number;
        }>;
        loading: Ref<boolean, boolean>;
        fieldValue: Ref<string, string>;
        selectedItems: import('vue').WritableComputedRef<GroupEntity[], GroupEntity[]>;
        rowKey: keyof GroupEntity;
        columns: {
            name: string;
            label: string;
            field: string | ((row: any) => any);
            required?: boolean;
            align?: "left" | "right" | "center";
            sortable?: boolean;
            sort?: (a: any, b: any, rowA: any, rowB: any) => number;
            rawSort?: (a: any, b: any, rowA: any, rowB: any) => number;
            sortOrder?: "ad" | "da";
            format?: (val: any, row: any) => any;
            style?: string | ((row: any) => string);
            classes?: string | ((row: any) => string);
            headerStyle?: string;
            headerClasses?: string;
        }[];
        findItems: import('@herodotus-cloud/core').QTableOnRequestProps;
        onClear: () => void;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: import('vue').PropType<Array<GroupEntity>>;
            default: () => Array<GroupEntity>;
        };
    }>> & Readonly<{}>, {
        modelValue: GroupEntity[];
    }, {}, {
        HTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
            };
        }>, {
            text: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
        }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
            modelValue: {
                type: (StringConstructor | NumberConstructor)[];
            };
        }>> & Readonly<{
            "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
        }>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    }, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
    HTextField: import('vue').DefineComponent<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
        };
    }>, {
        text: import('vue').WritableComputedRef<string | number | undefined, string | number | undefined>;
    }, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, "update:modelValue"[], "update:modelValue", import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
        modelValue: {
            type: (StringConstructor | NumberConstructor)[];
        };
    }>> & Readonly<{
        "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    }>, {}, {}, {}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
}, {}, string, import('vue').ComponentProvideOptions, true, {}, any>;
export default _default;
