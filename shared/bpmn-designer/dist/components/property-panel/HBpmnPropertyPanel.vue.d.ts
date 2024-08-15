declare const _default: import('vue').DefineComponent<{
    title: {
        type: StringConstructor;
        required: true;
    };
    icon: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        required: true;
    };
    label: {
        type: StringConstructor;
    };
}, {
    thumbStyle: {
        right: string;
        borderRadius: string;
        backgroundColor: string;
        width: string;
        opacity: string;
    };
    isShow: import('vue').Ref<boolean>;
    panelGroups: import('vue').Ref<import('bpmn-js-properties-panel/lib/PropertiesActivator').Group[]>;
    parsePropertyPanelName: (id: string) => string;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: true;
    };
    icon: {
        type: StringConstructor;
        required: true;
    };
    type: {
        type: StringConstructor;
        required: true;
    };
    label: {
        type: StringConstructor;
    };
}>>, {}, {}>;
export default _default;
