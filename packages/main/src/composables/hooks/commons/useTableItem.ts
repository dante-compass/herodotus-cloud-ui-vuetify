import type { Entity, HttpResult, AbstractService } from '@herodotus/core';

import { OperationEnum, toast } from '@herodotus/core';
import useBaseTableItem from './useBaseTableItem';

export default function useTableItem<E extends Entity>(service: AbstractService<E>) {
  const { editedItem, operation, overlay, title, additional, onFinish } = useBaseTableItem<E>();

  const isEdit = computed(() => {
    return operation.value === OperationEnum.EDIT;
  });

  const assign = (data: any) => {
    overlay.value = true;
    service
      .assign(data)
      .then((response) => {
        const result = response as HttpResult<E>;
        overlay.value = false;
        onFinish();
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success('保存成功');
        }
      })
      .catch(() => {
        overlay.value = false;
        onFinish();
        toast.error('保存失败');
      });
  };

  return {
    editedItem,
    operation,
    overlay,
    title,
    additional,
    onFinish,
    assign,
    isEdit,
  };
}
