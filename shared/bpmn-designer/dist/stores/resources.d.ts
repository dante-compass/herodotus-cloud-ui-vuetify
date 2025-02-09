import { BpmnDesignerResources } from '../declarations';
export declare const useResourceStore: import('pinia').StoreDefinition<"BpmnDesignerResources", {
    resources: BpmnDesignerResources;
}, {
    userService: (state: {
        resources: {
            user: () => import('@herodotus/bpmn-apis').UserService;
            group: () => import('@herodotus/bpmn-apis').GroupService;
            deployment: () => import('@herodotus/bpmn-apis').DeploymentService;
            dynamicForm: () => import('@herodotus/form-apis').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('@herodotus/bpmn-apis').UserService;
    groupService: (state: {
        resources: {
            user: () => import('@herodotus/bpmn-apis').UserService;
            group: () => import('@herodotus/bpmn-apis').GroupService;
            deployment: () => import('@herodotus/bpmn-apis').DeploymentService;
            dynamicForm: () => import('@herodotus/form-apis').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('@herodotus/bpmn-apis').GroupService;
    deploymentService: (state: {
        resources: {
            user: () => import('@herodotus/bpmn-apis').UserService;
            group: () => import('@herodotus/bpmn-apis').GroupService;
            deployment: () => import('@herodotus/bpmn-apis').DeploymentService;
            dynamicForm: () => import('@herodotus/form-apis').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('@herodotus/bpmn-apis').DeploymentService;
    dynamicFormService: (state: {
        resources: {
            user: () => import('@herodotus/bpmn-apis').UserService;
            group: () => import('@herodotus/bpmn-apis').GroupService;
            deployment: () => import('@herodotus/bpmn-apis').DeploymentService;
            dynamicForm: () => import('@herodotus/form-apis').DynamicFormService;
        };
    } & import('pinia').PiniaCustomStateProperties<{
        resources: BpmnDesignerResources;
    }>) => import('@herodotus/form-apis').DynamicFormService;
}, {
    init(instance: BpmnDesignerResources): void;
}>;
