import { FormTypeEnum, BindingTypeEnum } from '../../../enums';

declare const _default: import('vue').DefineComponent<{}, {
    formsType: import('vue').Ref<string, string>;
    formsOptions: import('vue').Ref<{
        text: string;
        value: FormTypeEnum;
    }[], {
        text: string;
        value: FormTypeEnum;
    }[] | {
        text: string;
        value: FormTypeEnum;
    }[]>;
    bindingType: import('vue').Ref<string, string>;
    bindingOptions: import('vue').Ref<{
        text: string;
        value: BindingTypeEnum;
    }[], {
        text: string;
        value: BindingTypeEnum;
    }[] | {
        text: string;
        value: BindingTypeEnum;
    }[]>;
    formKey: import('vue').Ref<string, string>;
    formRef: import('vue').Ref<string, string>;
    formRefVersion: import('vue').Ref<string, string>;
    isCamundaForms: import('vue').ComputedRef<boolean>;
    isEmbeddedOrExternalTaskForms: import('vue').ComputedRef<boolean>;
    isFormRefVersion: import('vue').ComputedRef<boolean>;
    updateFormKey: (value: string) => void;
    updateFormRef: (value: string) => void;
    updateVersion: (value: string) => void;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}>;
export default _default;
