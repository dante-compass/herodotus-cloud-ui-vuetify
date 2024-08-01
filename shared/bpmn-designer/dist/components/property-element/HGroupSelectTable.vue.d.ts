import { PropType } from 'vue';
import { GroupEntity } from '../../declarations';

declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: PropType<Array<GroupEntity>>;
        default: () => Array<GroupEntity>;
    };
}, {
    tableRows: import('vue').Ref<GroupEntity[], GroupEntity[]>;
    totalPages: import('vue').Ref<number, number>;
    pagination: import('vue').Ref<{
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
    loading: import('vue').Ref<boolean, boolean>;
    fieldValue: import('vue').Ref<string, string>;
    selectedItems: import('vue').WritableComputedRef<GroupEntity[]>;
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
    findItems: import('../../declarations').QTableOnRequestProps;
    onClear: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: PropType<Array<GroupEntity>>;
        default: () => Array<GroupEntity>;
    };
}>>, {
    modelValue: GroupEntity[];
}, {}>;
export default _default;
