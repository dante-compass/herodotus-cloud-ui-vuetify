import type { Entity, HttpResult, AbstractEntityService } from '@herodotus/core';

import { toast } from '@herodotus/core';
import useTableItem from './useTableItem';

export default function useDtoTableItem<E extends Entity>(service: AbstractEntityService<E>) {
  const { editedItem, operation, overlay, title, additional, onFinish, assign, isEdit } =
    useTableItem<E>(service);

  const saveOrUpdate = () => {
    overlay.value = true;
    service
      .saveOrUpdate(editedItem.value)
      .then((response) => {
        const result = response as HttpResult<E>;
        overlay.value = false;
        if (result.message) {
          toast.success(result.message);
        } else {
          toast.success('保存成功');
        }
        onFinish();
      })
      .catch(() => {
        overlay.value = false;
        toast.error('保存失败');
        onFinish();
      });
  };

  return {
    editedItem,
    operation,
    additional,
    title,
    overlay,
    saveOrUpdate,
    assign,
    isEdit,
  };
}
