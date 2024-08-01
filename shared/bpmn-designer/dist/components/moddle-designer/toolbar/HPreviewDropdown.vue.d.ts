declare const _default: import('vue').DefineComponent<{}, {
    isOpen: import('vue').Ref<boolean, boolean>;
    data: import('vue').Ref<string, string>;
    language: import('vue').Ref<"xml" | "json", "xml" | "json">;
    onPreviewXml: () => Promise<import('sweetalert2').SweetAlertResult<string> | undefined>;
    onPreviewJson: () => Promise<import('sweetalert2').SweetAlertResult<string> | undefined>;
}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}>;
export default _default;
