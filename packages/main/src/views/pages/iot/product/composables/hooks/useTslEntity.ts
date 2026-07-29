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
    property: EMPTY_NORMAL_ARGUMENT,
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
    return cloneDeep(EMPTY_NORMAL_FUNCTION_ARGUMENTS);
  };

  const getProperty = (item: TslFunctionEntity): TslArgumentEntity => {
    let functionArguments = getFunctionArguments(item);
    if (!isEmpty(functionArguments.property)) {
      return functionArguments.property;
    }
    return createEmptyNormalArgument();
  };

  const getPropertyArgumentType = (item: TslFunctionEntity): string => {
    const property = getProperty(item);
    // getProperty 不管怎么样都会返回一个对象，所以不会为空
    return property.type;
  };

  const getPropertyArgumentSpecs = (item: TslFunctionEntity): Specification<Specs> => {
    const property = getProperty(item);
    // getProperty 不管怎么样都会返回一个对象，所以不会为空
    return property.specs;
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
