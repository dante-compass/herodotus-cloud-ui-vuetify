import type { BpmnDesignerResources, FormDesignerResources } from '@/lib/declarations';

import { createApi } from '@herodotus-cloud/apis';
import { createBpmnApi } from '@herodotus-cloud/bpmn-apis';
import { createFormApi } from '@herodotus-cloud/form-apis';
import { createOssApi } from '@herodotus-cloud/oss-apis';

import { DeploymentService, GroupService, UserService, DynamicFormService } from '../base';

import { http, options } from '@/configurations';

export const api = createApi(http, options);

export const bpmnApi = createBpmnApi(http, options);

export const formApi = createFormApi(http, options);

export const ossApi = createOssApi(http, options);

class BpmnDesignerStorage implements BpmnDesignerResources {
  private static instance: BpmnDesignerStorage;

  private constructor() {}

  public static getInstance(): BpmnDesignerStorage {
    if (this.instance == null) {
      this.instance = new BpmnDesignerStorage();
    }
    return this.instance;
  }

  public user(): UserService {
    return bpmnApi.user();
  }

  public group(): GroupService {
    return bpmnApi.group();
  }

  public deployment(): DeploymentService {
    return bpmnApi.deployment();
  }

  public dynamicForm(): DynamicFormService {
    return formApi.dynamicForm();
  }
}

class FormDesignerStorage implements FormDesignerResources {
  private static instance: FormDesignerStorage;

  private constructor() {}

  public static getInstance(): FormDesignerStorage {
    if (this.instance == null) {
      this.instance = new FormDesignerStorage();
    }
    return this.instance;
  }

  public dynamicForm(): DynamicFormService {
    return formApi.dynamicForm();
  }
}

export const BpmnDesignerInstance = BpmnDesignerStorage.getInstance();
export const FormDesignerInstance = FormDesignerStorage.getInstance();
