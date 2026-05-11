import type { Specification, Specs, StructSpecs } from "@herodotus/api";

import { cloneDeep } from "lodash-es";

export default function useTslEmptyArgument() {
  const EmptyNormalArgument = {
    identifier: "",
    name: "",
    dataType: { type: "int", specs: {} },
  } as Specification<Specs>;

  const EmptyStructArgument = {
    identifier: "",
    name: "",
    dataType: { type: "struct", specs: [] },
  } as Specification<StructSpecs>;

  const createEmptyNormalArgument = () => {
    return cloneDeep(EmptyNormalArgument);
  };

  const createEmptyStructArgument = () => {
    return cloneDeep(EmptyStructArgument);
  };

  return {
    createEmptyNormalArgument,
    createEmptyStructArgument,
  };
}
