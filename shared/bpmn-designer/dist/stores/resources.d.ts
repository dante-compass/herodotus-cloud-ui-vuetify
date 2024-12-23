import { BpmnDesignerResources } from '../declarations';
export declare const useResourceStore: import('pinia').StoreDefinition<"BpmnDesignerResources", {
    resources: BpmnDesignerResources;
}, {
    userService: (state: {
        resources: BpmnDesignerResources;
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('../declarations').UserService;
    groupService: (state: {
        resources: BpmnDesignerResources;
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('../declarations').GroupService;
    deploymentService: (state: {
        resources: BpmnDesignerResources;
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('../declarations').DeploymentService;
    dynamicFormService: (state: {
        resources: BpmnDesignerResources;
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('../declarations').DynamicFormService;
}, {
    init(instance: BpmnDesignerResources): void;
}>;
