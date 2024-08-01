import { SweetAlertResult } from '../../../declarations';

declare const _default: import('vue').DefineComponent<{
    tooltip: {
        type: StringConstructor;
        default: string;
    };
}, {
    openUploadDialog: import('vue').Ref<boolean, boolean>;
    enableDuplicateCheck: import('vue').Ref<boolean, boolean>;
    deployChangedOnly: import('vue').Ref<boolean, boolean>;
    deploymentName: import('vue').Ref<string, string>;
    loading: import('vue').Ref<boolean, boolean>;
    onSave: () => Promise<SweetAlertResult<string> | undefined>;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    tooltip: {
        type: StringConstructor;
        default: string;
    };
}>>, {
    tooltip: string;
}, {}>;
export default _default;
