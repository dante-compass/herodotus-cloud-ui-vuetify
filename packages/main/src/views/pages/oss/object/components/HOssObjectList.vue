<template>
  <h-data-table
    v-model="selected"
    v-model:page-size="pageSize"
    v-model:page-number="pageNumber"
    :headers="headers"
    :items="tableRows"
    :item-value="rowKey"
    :item-selectable="(item: any) => !item.dir"
    :loading="loading"
    disable-sort
    return-object
  >
    <template #control>
      <v-btn
        v-if="currentFolder"
        color="grey"
        prepend-icon="mdi-arrow-left-box"
        class="mr-2"
        @click="onPreviousFolder()"
      >
        返回上级
      </v-btn>
      <v-btn
        class="mr-4"
        color="red"
        prepend-icon="mdi-delete-forever"
        :disabled="isDisableBatchDelete"
        @click="onBatchDeleteObjects()"
      >
        批量删除
      </v-btn>
      <v-file-input
        v-model="uploadFiles"
        :disabled="isDisableUpload"
        label="上传文件"
        icon-color="primary"
        prepend-icon=""
        prepend-inner-icon="mdi-cloud-upload"
        hide-details
        hide-spin-buttons
        density="compact"
        @update:model-value="onUpload"
        max-width="300px"
        :clearable="false"
        show-size
        :loading="uploading"
      ></v-file-input>
    </template>

    <template #item.objectName="{ item }">
      <v-btn v-if="item.dir" prepend-icon="mdi-folder-open" variant="text" @click="onOpenFolder(item)">
        {{ displayedObjectName(item.objectName) }}
      </v-btn>
      <template v-else>{{ displayedObjectName(item.objectName) }}</template>
    </template>

    <template #item.actions="{ item }">
      <h-action-button
        color="secondary"
        icon="mdi-download-box"
        tooltip="下载"
        @click="onDownloadObject(item)"
      ></h-action-button>
      <h-action-button
        v-if="!item.dir"
        color="black"
        icon="mdi-cog-outline"
        tooltip="详情"
        @click="toSetting(item)"
      ></h-action-button>
      <h-action-delete-button @click="onDeleteObject(item)"></h-action-delete-button>
    </template>

    <template #bottom>
      <div class="row text-end">
        <v-btn
          :disabled="nextEnabled"
          density="comfortable"
          icon="mdi-arrow-right"
          variant="tonal"
          tooltip="下一页"
          rounded
          @click="onFetchNextPageObjects"
        ></v-btn>
      </div>
    </template>
  </h-data-table>
</template>

<script setup lang="ts">
import type { HttpResult } from "@herodotus/core";
import type {
  ObjectDomain,
  ObjectDomainProps,
  ObjectDomainConditions,
  DeletedObjectDomain,
  PutObjectResult,
} from "@herodotus/api";
import type { VDataTableHeaders } from "@/composables/declarations";

import { isEmpty, split, dropRight, join, initial } from "lodash-es";

import { notify, toast } from "@herodotus/core";
import { useBaseTable, useDateTime, useOss } from "@/composables/hooks";
import { API, PAGE_NAME } from "@/configurations";

defineOptions({ name: PAGE_NAME.OSS_BUCKET });

interface Props {
  folderName?: string;
  version?: number;
}

const props = defineProps<Props>();
const bucketName = defineModel<string>({
  required: true,
});

const headers = ref([
  { key: "objectName", align: "center", title: "文件(Object)名" },
  { key: "eTag", align: "center", title: "ETAG" },
  { key: "size", align: "center", title: "文件(Object)大小", value: (item) => humanObjectSize(item.size) },
  { key: "lastModified", align: "center", title: "最后更新时间", value: (item) => defaultFormat(item.lastModified) },
  { key: "actions", align: "center", title: "操作" },
]) as Ref<Array<VDataTableHeaders>>;

const rowKey: ObjectDomainProps = "objectName";

const { toEdit } = useBaseTable<ObjectDomainConditions, ObjectDomain>(PAGE_NAME.OSS_OBJECT);
const { defaultFormat } = useDateTime();
const { humanObjectSize, displayedObjectName, download } = useOss();

const pageNumber = shallowRef(1);
const pageSize = shallowRef(10);
const selected = ref([]) as Ref<Array<ObjectDomain>>;

const loading = shallowRef(false);
const uploading = shallowRef(false);
const uploadFiles = ref(null) as Ref<File | File[] | null>;
const tableRows = ref([]) as Ref<Array<ObjectDomain>>;
const currentFolder = shallowRef("");
const continuationToken = shallowRef();
const isTruncated = shallowRef(false);

const nextEnabled = computed(() => {
  return !isTruncated.value && continuationToken.value;
});

const onUpload = (files: File | File[], folderName = "") => {
  if (files) {
    uploading.value = true;
    API.core
      .ossObject()
      .upload(bucketName.value, files as File)
      .then((response) => {
        const result = response.data as HttpResult<PutObjectResult>;
        if (result.successful) {
          if (result.message) {
            toast.success(result.message);
          } else {
            toast.success("操作成功！");
          }
          uploading.value = false;
          uploadFiles.value = null;
          fetchObjects(bucketName.value, folderName);
        } else {
          uploading.value = false;
          toast.warning("服务端异常！");
        }
      })
      .catch((error) => {
        uploading.value = false;
      });
  }
};

const fetchObjects = (bucketName: string, folderName = "") => {
  loading.value = true;

  const argument = isTruncated.value
    ? {
        bucketName: bucketName,
        prefix: folderName,
        maxKeys: 10,
        continuationToken: continuationToken.value,
      }
    : { bucketName: bucketName, prefix: folderName, maxKeys: 10 };
  API.core
    .ossObject()
    .listObjectsV2(argument)
    .then((result) => {
      const data = result.data.contents;
      tableRows.value = data ? data : [];
      loading.value = false;

      isTruncated.value = result.data.truncated;
      if (isTruncated.value) {
        continuationToken.value = result.data.nextContinuationToken;
      }
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

const getPreviousFolder = () => {
  if (currentFolder.value) {
    const names = initial(split(currentFolder.value, "/"));
    const previous = dropRight(names);
    if (!isEmpty(previous)) {
      return join(previous, "/") + "/";
    }
  }

  return "";
};

/**
 * 批量删除对象
 * @param bucketName 存储桶名称
 * @param objects 选中的、待删除对象
 * @param onSuccess 删除成功操作
 */
const batchDeleteObjects = (bucketName: string, objects: Array<ObjectDomain>, folderName = "") => {
  notify.standardDeleteNotify(() => {
    API.core
      .ossObject()
      .batchDelete({ bucketName: bucketName, delete: toDeleteObjectDomain(objects) })
      .then(() => {
        toast.success("删除成功");
        fetchObjects(bucketName, folderName);
      })
      .catch((error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("删除失败");
        }
      });
  });
};

/**
 * 单独删除对象
 * @param bucketName 存储桶名称
 * @param objectName 对象名称
 */
const deleteObject = (bucketName: string, objectName: string, folderName = "") => {
  notify.standardDeleteNotify(() => {
    API.core
      .ossObject()
      .delete({ bucketName: bucketName, objectName: objectName })
      .then(() => {
        toast.success("删除成功");
        fetchObjects(bucketName, folderName);
      })
      .catch((error) => {
        if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("删除失败");
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

const isDisableBatchDelete = computed(() => {
  return isEmpty(selected.value);
});

const isDisableUpload = computed(() => {
  return isEmpty(bucketName.value);
});

const toSetting = (item: ObjectDomain) => {
  toEdit(item, { bucketName: bucketName.value, folderName: props.folderName });
};

/**
 * 查询数据操作
 */
const onFetchObjects = () => {
  if (bucketName.value) {
    fetchObjects(bucketName.value, props.folderName);
  }
};

/**
 * 批量删除对象操作
 */
const onBatchDeleteObjects = () => {
  batchDeleteObjects(bucketName.value, selected.value, props.folderName);
};

/**
 * 删除对象操作
 * @param item 选中的对象条目实体
 */
const onDeleteObject = (item: ObjectDomain) => {
  deleteObject(bucketName.value, item.objectName, props.folderName);
};

const onDownloadObject = (item: ObjectDomain) => {
  download(bucketName.value, item.objectName, item.size);
};

const onOpenFolder = (item: ObjectDomain) => {
  openFolder(bucketName.value, item.objectName);
};

const onPreviousFolder = () => {
  // 返回上级目录之前，需要清除“分页”标识信息，否则会出错
  isTruncated.value = false;
  continuationToken.value = null;
  returnPreviousFolder(bucketName.value);
};

const onFetchNextPageObjects = () => {
  fetchObjects(bucketName.value, currentFolder.value);
};

watch(
  () => props.version,
  () => {
    // 该 Watch 表示存储桶变换了，那么在刷新数据时，需要清除“分页”标识信息，否则会出错
    isTruncated.value = false;
    continuationToken.value = null;
    onFetchObjects();
  },
);

onMounted(() => {
  onFetchObjects();
});
</script>
