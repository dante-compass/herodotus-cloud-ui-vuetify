import type { TslStatus } from "@herodotus/api";

export default function useTslStatus(status: TslStatus) {
  const isCreate = computed(() => {
    return status === "create";
  });

  const isEdit = computed(() => {
    return status === "edit";
  });

  const isView = computed(() => {
    return status === "view";
  });

  const disabled = computed(() => {
    const value = isView.value;
    console.log("-----------", value);
    return value;
  });

  return {
    isCreate,
    isEdit,
    isView,
    disabled,
  };
}
