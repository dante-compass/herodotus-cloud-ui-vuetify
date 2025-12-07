import type { Page } from '@herodotus/core';
import type { SysEmployeeEntity, SysElementConditions } from '@herodotus/api';
import type { SortItem } from '@/composables/declarations';

import { isEmpty } from 'lodash-es';
import { notify, toast, OperationEnum } from '@herodotus/core';

import { useBaseTable } from '@/composables/hooks';
import { API } from '@/configurations';

export default function useOwnershipTable(name: string) {
  const pageNumber = shallowRef(1);
  const pageSize = shallowRef(10);
  const organizationId = shallowRef('');
  const departmentId = shallowRef('');
  const sortBy = ref([]) as Ref<Array<SortItem>>;

  const {
    loading,
    tableRows,
    totalPages,
    totalItems,
    showLoading,
    hideLoading,
    setPageData,
    resetPageData,
    createSort,
    routePushParam,
  } = useBaseTable<SysEmployeeEntity, SysElementConditions>(name);

  const fetchAssignedByPage = (pageNumber = 1, pageSize = 10, departmentId: string) => {
    showLoading();
    API.core
      .sysEmployee()
      .fetchAssignedByPage(
        {
          pageNumber: pageNumber - 1,
          pageSize: pageSize,
          ...createSort(sortBy.value),
        },
        { departmentId },
      )
      .then((result) => {
        const data = result.data as Page<SysEmployeeEntity>;
        // 用户文档列表中无结果时也要更新列表数据
        if (!isEmpty(data)) {
          setPageData(data);
          hideLoading();
        } else {
          resetPageData();
          hideLoading();
        }
      })
      .catch((error) => {
        hideLoading();
      });
  };

  const findItems = () => {
    fetchAssignedByPage(pageNumber.value, pageSize.value, departmentId.value);
  };

  const deleteAllocatable = (item: SysEmployeeEntity) => {
    notify.standardDeleteNotify(() => {
      API.core
        .sysEmployee()
        .deleteAllocatable({
          organizationId: organizationId.value,
          departmentId: departmentId.value,
          employeeId: item.employeeId,
        })
        .then((response) => {
          findItems();
        })
        .catch((error) => {
          if (error.message) {
            toast.error(error.message);
          } else {
            toast.error('删除失败');
          }
        });
    });
  };

  watch(departmentId, (newValue) => {
    fetchAssignedByPage(pageNumber.value, pageSize.value, newValue);
  });

  watch(pageNumber, (newValue) => {
    fetchAssignedByPage(newValue, pageSize.value, departmentId.value);
  });

  const isShowOperation = computed(() => {
    return organizationId.value && departmentId.value;
  });

  const toAllocatable = () => {
    const routeName = 'SysOwnershipContent';
    routePushParam(routeName, OperationEnum.AUTHORIZE, {
      organizationId: organizationId.value,
      departmentId: departmentId.value,
    });
  };

  return {
    loading,
    tableRows,
    totalPages,
    totalItems,
    pageNumber,
    pageSize,
    findItems,
    deleteAllocatable,
    toAllocatable,
    isShowOperation,
  };
}
