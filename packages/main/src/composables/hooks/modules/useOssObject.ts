import type { ObjectDomain, DeletedObjectDomain } from '@herodotus/api';

import { isEmpty, endsWith, trimEnd, split, dropRight, join, initial } from 'lodash-es';

import { notify, toast } from '@herodotus/core';
import { API } from '@/configurations';

export default function useOssObject() {
  const loading = shallowRef(false);
  const tableRows = ref([]) as Ref<Array<ObjectDomain>>;
  const currentFolder = shallowRef('');

  const fetchObjects = (bucketName: string, folderName = '') => {
    loading.value = true;
    API.core
      .ossObject()
      .listObjectsV2({ bucketName: bucketName, prefix: folderName })
      .then((result) => {
        const data = result.data.contents;
        tableRows.value = data ? data : [];
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      });
  };

  /**
   * ObjectDomain 数组转换为 DeleteObjectDomain 数组
   * @param objects Table 中已选择的 ObjectDomain
   * @returns DeleteObjectDomain
   */
  const toDeleteObjectDomain = (objects: Array<ObjectDomain>): Array<DeletedObjectDomain> => {
    const deleteObjects = objects.map((object) => {
      const deleteObject: DeletedObjectDomain = { objectName: object.objectName };
      return deleteObject;
    });
    return deleteObjects;
  };

  const displayedObjectName = (realObjectName: string) => {
    if (endsWith(realObjectName, '/')) {
      return trimEnd(realObjectName, '/');
    } else {
      if (realObjectName.indexOf('/') !== -1) {
        const names = split(realObjectName, '/');
        return names[names.length - 1];
      } else {
        return realObjectName;
      }
    }
  };

  const getPreviousFolder = () => {
    if (currentFolder.value) {
      const names = initial(split(currentFolder.value, '/'));
      const previous = dropRight(names);
      if (!isEmpty(previous)) {
        return join(previous, '/') + '/';
      }
    }

    return '';
  };

  /**
   * 批量删除对象
   * @param bucketName 存储桶名称
   * @param objects 选中的、待删除对象
   * @param onSuccess 删除成功操作
   */
  const batchDeleteObjects = (bucketName: string, objects: Array<ObjectDomain>, folderName = '') => {
    notify.standardDeleteNotify(() => {
      API.core
        .ossObject()
        .batchDelete({ bucketName: bucketName, delete: toDeleteObjectDomain(objects) })
        .then(() => {
          toast.success('删除成功');
          fetchObjects(bucketName, folderName);
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

  /**
   * 单独删除对象
   * @param bucketName 存储桶名称
   * @param objectName 对象名称
   */
  const deleteObject = (bucketName: string, objectName: string, folderName = '') => {
    notify.standardDeleteNotify(() => {
      API.core
        .ossObject()
        .delete({ bucketName: bucketName, objectName: objectName })
        .then(() => {
          toast.success('删除成功');
          fetchObjects(bucketName, folderName);
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

  const openFolder = (bucketName: string, objectName: string) => {
    currentFolder.value = objectName;
    fetchObjects(bucketName, currentFolder.value);
  };

  const returnPreviousFolder = (bucketName: string) => {
    currentFolder.value = getPreviousFolder();
    fetchObjects(bucketName, currentFolder.value);
  };

  return {
    loading,
    tableRows,
    currentFolder,
    fetchObjects,
    displayedObjectName,
    batchDeleteObjects,
    deleteObject,
    openFolder,
    returnPreviousFolder,
  };
}
