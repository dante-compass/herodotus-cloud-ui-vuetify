import type { Domain, HttpResult, AbstractService } from "@herodotus/core";

import { OperationEnum, toast } from "@herodotus/core";
import useBaseTableItem from "./useBaseTableItem";

export default function useTableItem<I extends Domain, O extends Domain = I>(
  service: AbstractService<I, O>,
  componentName: string,
) {
  const { editedItem, operation, overlay, title, additional, onFinish, onReturn } = useBaseTableItem<I>(componentName);

  const isEdit = computed(() => {
    return operation.value === OperationEnum.EDIT;
  });

  const saveOrUpdate = () => {
    overlay.value = true;
    service
      .saveOrUpdate(editedItem.value)
      .then((response) => {
        const result = response as HttpResult<O>;
        overlay.value = false;
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success("保存成功");
        }
        onReturn();
      })
      .catch(() => {
        overlay.value = false;
        toast.error("保存失败");
        onReturn();
      });
  };

  const assign = (data: any) => {
    overlay.value = true;
    service
      .assign(data)
      .then((response) => {
        const result = response as HttpResult<O>;
        overlay.value = false;
        onReturn();
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success("保存成功");
        }
      })
      .catch(() => {
        overlay.value = false;
        onReturn();
        toast.error("保存失败");
      });
  };

  return {
    editedItem,
    operation,
    overlay,
    title,
    additional,
    onFinish,
    onReturn,
    saveOrUpdate,
    assign,
    isEdit,
  };
}
