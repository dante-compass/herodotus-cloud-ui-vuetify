import type {
  TslFunctionEntity,
  TslFunctionArgumentEntity,
  TslArgumentEntity,
  Specification,
  Specs,
} from "@herodotus/api";

import { isEmpty, cloneDeep } from "lodash-es";

export default function useTslEntity() {
  const EMPTY_NORMAL_SPECIFICATION = {
    identifier: "",
    name: "",
    dataType: { type: "int", specs: {} },
  } as Specification<Specs>;

  // 默认对象，如果涉及 id，要么不要设置，要么设置为 null
  // 如果设置为 id: ""，空串和 null 有很大差别，后端接收到则会认为是已存在的实体导致保存出错。
  const EMPTY_NORMAL_ARGUMENT = {
    identifier: "",
    name: "",
    type: "int",
    specs: EMPTY_NORMAL_SPECIFICATION,
  } as TslArgumentEntity;

  const EMPTY_NORMAL_FUNCTION_ARGUMENTS = {
    property: {} as TslArgumentEntity,
    eventOutputData: [] as TslArgumentEntity[],
    serviceOutputData: [] as TslArgumentEntity[],
    serviceInputData: [] as TslArgumentEntity[],
  } as TslFunctionArgumentEntity;

  const hasArguments = (item: TslFunctionEntity): boolean => {
    return !isEmpty(item) && !isEmpty(item.arguments);
  };

  const hasProperty = (item: TslFunctionEntity) => {
    return hasArguments(item) && !isEmpty(item.arguments.property);
  };

  const createEmptyNormalArgument = (): TslArgumentEntity => {
    return cloneDeep(EMPTY_NORMAL_ARGUMENT);
  };

  const getFunctionArguments = (item: TslFunctionEntity): TslFunctionArgumentEntity => {
    if (hasArguments(item)) {
      return item.arguments;
    }
    console.log("----getFunctionArguments----");
    return cloneDeep(EMPTY_NORMAL_FUNCTION_ARGUMENTS);
  };

  const getProperty = (item: TslFunctionEntity): TslArgumentEntity => {
    const functionArguments = getFunctionArguments(item);
    return functionArguments.property;
  };

  const getPropertyArgumentType = (item: TslFunctionEntity): string | undefined => {
    const property = getProperty(item);
    if (!isEmpty(property) && property.type) {
      return property.type;
    }
    return undefined;
  };

  const getPropertyArgumentSpecs = (item: TslFunctionEntity): Specification<Specs> | undefined => {
    const property = getProperty(item);
    if (!isEmpty(property) && property.specs) {
      return property.specs;
    }
    return undefined;
  };

  const isSpecificationNotEmpty = (specification: Specification<Specs>) => {
    return !isEmpty(specification) && !isEmpty(specification.dataType) && !isEmpty(specification.dataType.specs);
  };

  const createEmptyFunction = (productId: string, productKey: string) => {
    return {
      dimension: "properties",
      productId: productId,
      productKey: productKey,
      required: false,
      arguments: cloneDeep(EMPTY_NORMAL_FUNCTION_ARGUMENTS),
    } as TslFunctionEntity;
  };

  return {
    EMPTY_NORMAL_SPECIFICATION,
    EMPTY_NORMAL_ARGUMENT,
    EMPTY_NORMAL_FUNCTION_ARGUMENTS,
    hasArguments,
    hasProperty,
    getPropertyArgumentType,
    getPropertyArgumentSpecs,
    isSpecificationNotEmpty,
    createEmptyFunction,
    createEmptyNormalArgument,
  };
}
