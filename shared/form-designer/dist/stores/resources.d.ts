import { FormDesignerResources } from '../declarations';
export declare const useFormResourceStore: import('pinia').StoreDefinition<"FormDesignerResources", {
    resources: FormDesignerResources;
}, {
    dynamicForm: (state: {
        resources: FormDesignerResources;
    } & import('pinia').PiniaCustomStateProperties<{
        resources: FormDesignerResources;
    }>) => import('@herodotus/form-apis').DynamicFormService;
}, {
    init(instance: FormDesignerResources): void;
}>;
