<template>
  <div>
    <v-card class="mx-auto mb-4" title="设置文件属性">
      <template #prepend>
        <h-button icon="mdi-arrow-left-box" tooltip="返回" variant="text" @click="onFinish()"></h-button>
      </template>
    </v-card>

    <v-container class="pa-0">
      <v-row>
        <v-col xl="3" lg="3" md="4" sm="6" xs="12">
          <v-sheet>
            <v-card :disabled="loading" :loading="loading" :subtitle="currentObjectName">
              <template v-slot:loader="{ isActive }">
                <v-progress-linear :active="isActive" height="4" indeterminate></v-progress-linear>
              </template>
              <v-card-text>
                <v-list
                  density="compact"
                  activatable
                  active-strategy="single-leaf"
                  selectable
                  select-strategy="single-leaf"
                  border
                  rounded="sm"
                >
                  <v-list-subheader>操作：</v-list-subheader>
                  <v-divider></v-divider>
                  <v-list-item
                    :disabled="isDisableAction"
                    prepend-icon="mdi-hammer-screwdriver"
                    :append-icon="!isDisableAction ? 'mdi-chevron-right' : ''"
                    title="设置文件留存(Legal Hold)"
                    @click="openSetLegalHoldDialog = !openSetLegalHoldDialog"
                  ></v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    :disabled="isDisableAction"
                    prepend-icon="mdi-calendar-today"
                    :append-icon="!isDisableAction ? 'mdi-chevron-right' : ''"
                    title="设置文件保存(Retention)"
                    @click="openSetRetentionDialog = !openSetRetentionDialog"
                  ></v-list-item>
                  <v-divider></v-divider>
                  <v-list-item
                    :disabled="isDisableAction"
                    prepend-icon="mdi-layers-triple"
                    :append-icon="!isDisableAction ? 'mdi-chevron-right' : ''"
                    title="查看文件版本"
                    @click="showVersions = !showVersions"
                  ></v-list-item>
                </v-list>
                <v-btn
                  rounded="sm"
                  color="red"
                  prepend-icon="mdi-delete"
                  variant="outlined"
                  block
                  class="mt-4"
                  @click="onDeleteObject"
                >
                  删除
                </v-btn>
              </v-card-text>
            </v-card>
            <v-card append-icon="mdi-shape" title="文件(Object)信息">
              <v-card-text>
                <v-divider></v-divider>
                <v-list density="compact" lines="two">
                  <v-list-item title="文件名称：" :subtitle="currentObjectName"></v-list-item>
                  <v-list-item title="文件大小：" :subtitle="humanObjectSize(editedItem.size)"></v-list-item>
                  <v-list-item title="最后更新时间：" :subtitle="defaultFormat(editedItem.lastModified)"></v-list-item>
                  <v-list-item title="ETAG：" :subtitle="editedItem.eTag"></v-list-item>
                  <v-list-item
                    title="文件留存(Legal Hold)："
                    :subtitle="humanLegalHold(attributes.lockLegalHold)"
                  ></v-list-item>
                  <v-list-item
                    title="文件保存(Retention)："
                    :subtitle="humanRetentionMode(attributes.retentionMode)"
                  ></v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-sheet>
        </v-col>
        <v-col xl="9" lg="9" md="8" sm="6" xs="12">
          <h-oss-object-versions
            v-if="showVersions"
            :bucket-name="currentBucketName"
            :object-name="currentObjectName"
            :show-versions="showVersions"
          ></h-oss-object-versions>
        </v-col>
      </v-row>
    </v-container>
    <h-oss-set-retention-dialog v-model="openSetRetentionDialog" :attributes="attributes"></h-oss-set-retention-dialog>
    <h-oss-set-legal-hold-dialog
      v-model="openSetLegalHoldDialog"
      :attributes="attributes"
    ></h-oss-set-legal-hold-dialog>
  </div>
</template>

<script setup lang="ts">
import type { ObjectDomain, GetObjectAttributesResult } from "@herodotus/api";

import { isEmpty } from "lodash-es";
import { notify, toast } from "@herodotus/core";
import { useEditFinish } from "@herodotus/framework";
import { useBaseTableItem, useDateTime, useDictionary, useOss } from "@/composables/hooks";
import { API } from "@/configurations";

import { HOssObjectVersions, HOssSetLegalHoldDialog, HOssSetRetentionDialog } from "./components";

defineOptions({
  name: "OssObjectContent",
  components: { HOssObjectVersions, HOssSetLegalHoldDialog, HOssSetRetentionDialog },
});

const { defaultFormat } = useDateTime();
const { humanObjectSize } = useOss();
const { onFinish } = useEditFinish();
const { getDictionaryItemDisplay } = useDictionary("ObjectRetentionMode");
const { editedItem, additional } = useBaseTableItem<ObjectDomain>();

const loading = shallowRef(false);
const showVersions = shallowRef(false);
const openSetLegalHoldDialog = shallowRef(false);
const openSetRetentionDialog = shallowRef(false);
const currentBucketName = shallowRef("");
const currentObjectName = shallowRef("");
const currentFolder = shallowRef("");
const attributes = ref({}) as Ref<GetObjectAttributesResult>;

const isDisableAction = computed(() => {
  return isEmpty(attributes.value) || !attributes.value.lockEnabled;
});

const fetchAttributes = (bucketName: string, objectName: string) => {
  API.core
    .ossObject()
    .fetchObjectAttributes({ bucketName: bucketName, objectName: objectName })
    .then((result) => {
      const data = result.data;
      attributes.value = data;
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};

const humanLegalHold = (legalHold: boolean) => {
  return legalHold ? "ON" : "OFF";
};

const humanRetentionMode = (retentionMode: string) => {
  if (retentionMode) {
    return getDictionaryItemDisplay("ObjectRetentionMode", retentionMode);
  }

  return "NONE";
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
        onFinish();
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

const onDeleteObject = () => {
  if (currentBucketName.value && currentObjectName.value) {
    deleteObject(currentBucketName.value, currentObjectName.value, currentFolder.value);
  }
};

onMounted(() => {
  currentBucketName.value = additional.value.bucketName as string;
  currentObjectName.value = editedItem.value.objectName;
  currentFolder.value = additional.value.folderName as string;

  if (currentBucketName.value && currentObjectName.value) {
    fetchAttributes(currentBucketName.value, currentObjectName.value);
  }
});
</script>
