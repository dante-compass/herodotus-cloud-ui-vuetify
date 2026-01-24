import type { Entity, HttpResult, AbstractDtoService } from '@herodotus/core';

import { toast } from '@herodotus/core';
import useTableItem from './useTableItem';

export default function useDtoTableItem<I extends Entity, O extends Entity>(
  service: AbstractDtoService<I, O>,
) {
  const { operation, overlay, title, additional, onFinish, assign, isEdit } =
    useTableItem<O>(service);

  const saveOrUpdate = (data: I) => {
    overlay.value = true;
    service
      .saveOrUpdate(data)
      .then((response) => {
        const result = response as HttpResult<O>;
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
    operation,
    additional,
    title,
    overlay,
    saveOrUpdate,
    assign,
    isEdit,
  };
}
