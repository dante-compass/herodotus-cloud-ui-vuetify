import { computed } from 'vue';

import type { Entity, HttpResult } from '@/lib/declarations';

import { BaseService, OperationEnum } from '@/lib/definitions';
import { toast } from '@/lib/utils';
import useBaseTableItem from './useBaseTableItem';

export default function useTableItem<E extends Entity>(baseService: BaseService<E>) {
  const { editedItem, operation, overlay, title, onFinish } = useBaseTableItem<E>();

  const isEdit = computed(() => {
    return operation.value === OperationEnum.EDIT;
  });

  const saveOrUpdate = () => {
    overlay.value = true;
    baseService
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

  const assign = (data: any) => {
    overlay.value = true;
    baseService
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
    title,
    overlay,
    saveOrUpdate,
    assign,
    isEdit,
  };
}
