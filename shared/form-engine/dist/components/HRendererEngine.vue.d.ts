import { PropType } from 'vue';
import { Schema } from '../declarations';
declare const _default: import('vue').DefineComponent<{
    modelValue: {
        type: (ObjectConstructor | ArrayConstructor | StringConstructor | NumberConstructor)[];
    };
    schemas: {
        type: PropType<Array<Schema>>;
        default: () => never[];
    };
}, () => any, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, import('vue').EmitsOptions, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    modelValue: {
        type: (ObjectConstructor | ArrayConstructor | StringConstructor | NumberConstructor)[];
    };
    schemas: {
        type: PropType<Array<Schema>>;
        default: () => never[];
    };
}>>, {
    schemas: Schema[];
}, {}>;
export default _default;
