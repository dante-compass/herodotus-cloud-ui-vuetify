import type { TslFunctionEntity, TslArgumentEntity, Specification, Specs } from "@herodotus/api";

import { isEmpty } from "lodash-es";

export default function useTslEntity() {
  const hasArguments = (item: TslFunctionEntity) => {
    return !isEmpty(item) && !isEmpty(item.arguments);
  };

  const hasProperties = (item: TslFunctionEntity) => {
    return hasArguments(item) && !isEmpty(item.arguments.property);
  };

  const getPropertyArgument = (item: TslFunctionEntity): TslArgumentEntity | undefined => {
    if (hasProperties(item)) {
      return item.arguments.property;
    }

    return undefined;
  };

  const getArgumentType = (item: TslFunctionEntity) => {
    const argument = getPropertyArgument(item);
    if (!isEmpty(argument)) {
      return argument.type;
    }
    return "";
  };

  const getArgumentSpecs = (item: TslFunctionEntity) => {
    const argument = getPropertyArgument(item);
    if (!isEmpty(argument)) {
      return argument.specs;
    }
    return {} as Specification<Specs>;
  };

  const hasSpecs = (entity: Specification<Specs>) => {
    return !isEmpty(entity) && !isEmpty(entity.dataType) && !isEmpty(entity.dataType.specs);
  };

  return {
    hasArguments,
    hasProperties,
    getArgumentSpecs,
    getArgumentType,
    hasSpecs,
  };
}
