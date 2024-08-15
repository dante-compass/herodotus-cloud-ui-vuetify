import { PropType } from 'vue';
import { UserEntity } from '../../declarations';
declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: PropType<Array<UserEntity>>;
        default: () => Array<UserEntity>;
    };
    selection: {
        type: PropType<"single" | "multiple">;
        default: string;
    };
}, {
    tableRows: import('vue').Ref<UserEntity[]>;
    totalPages: import('vue').Ref<number>;
    pagination: import('vue').Ref<{
        sortBy: string | null;
        descending: boolean;
        page: number;
        rowsPerPage: number;
        rowsNumber: number;
    }>;
    loading: import('vue').Ref<boolean>;
    fieldValue: import('vue').Ref<string>;
    selectedItems: import('vue').WritableComputedRef<UserEntity[]>;
    rowKey: keyof UserEntity;
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
    findItems: import('../../declarations').QTableOnRequestProps;
    onClear: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<Array<UserEntity>>;
        default: () => Array<UserEntity>;
    };
    selection: {
        type: PropType<"single" | "multiple">;
        default: string;
    };
}>>, {
    modelValue: UserEntity[];
    selection: "single" | "multiple";
}, {}>;
export default _default;
