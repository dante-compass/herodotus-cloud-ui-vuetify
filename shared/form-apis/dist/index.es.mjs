import { Service, lodash, HttpConfig } from "@herodotus-cloud/core";
import { Axios, Base64, HttpConfig as HttpConfig2, Service as Service2, lodash as lodash2, moment } from "@herodotus-cloud/core";
class BaseMongoService extends Service {
  getConditionAddress() {
    return this.getBaseAddress() + "/condition";
  }
  getListAddress() {
    return this.getBaseAddress() + "/list";
  }
  fetchByPage(params, others = {}) {
    if (lodash.isEmpty(others)) {
      return this.getConfig().getHttp().get(this.getBaseAddress(), params);
    } else {
      const fullParams = Object.assign(params, others);
      return this.getConfig().getHttp().get(this.getConditionAddress(), fullParams);
    }
  }
  fetchAll(params = {}) {
    return this.getConfig().getHttp().get(this.getListAddress(), params);
  }
  fetchById(id) {
    return this.getConfig().getHttp().get(this.getIdPath(id));
  }
  saveOrUpdate(data) {
    return this.getConfig().getHttp().post(this.getBaseAddress(), data);
  }
  delete(id) {
    return this.getConfig().getHttp().delete(this.getIdPath(id));
  }
}
class DynamicFormService extends BaseMongoService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new DynamicFormService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn(true, true) + "/dynamic-form";
  }
}
class ProcessCommentsService extends BaseMongoService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new ProcessCommentsService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn(true, true) + "/process-comments";
  }
}
class ProcessSpecificsService extends BaseMongoService {
  static instance;
  constructor(config) {
    super(config);
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new ProcessSpecificsService(config);
    }
    return this.instance;
  }
  getBaseAddress() {
    return this.getConfig().getBpmn(true, true) + "/process-specifics";
  }
}
class FormApiResources {
  static instance;
  config = {};
  constructor(config) {
    this.config = config;
  }
  static getInstance(config) {
    if (this.instance == null) {
      this.instance = new FormApiResources(config);
    }
    return this.instance;
  }
  getConfig() {
    return this.config;
  }
  dynamicForm() {
    return DynamicFormService.getInstance(this.config);
  }
  processComments() {
    return ProcessCommentsService.getInstance(this.config);
  }
  processSpecifics() {
    return ProcessSpecificsService.getInstance(this.config);
  }
}
const createFormApi = (http, options) => {
  const config = new HttpConfig(http, options);
  return FormApiResources.getInstance(config);
};
export {
  Axios,
  Base64,
  BaseMongoService,
  DynamicFormService,
  FormApiResources,
  HttpConfig2 as HttpConfig,
  ProcessCommentsService,
  ProcessSpecificsService,
  Service2 as Service,
  createFormApi,
  lodash2 as lodash,
  moment
};
