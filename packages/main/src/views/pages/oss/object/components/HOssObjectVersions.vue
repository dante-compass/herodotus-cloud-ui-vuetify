<template>
  <v-card prepend-icon="mdi-layers-triple" :title="objectName">
    <v-card-text>
      <v-data-iterator :items="tableRows" :loading="loading">
        <template #no-data>NO Date</template>
        <template #default="{ items }">
          <v-list selectable>
            <v-list-subheader>版本信息：</v-list-subheader>
            <template v-for="(item, i) in items" :key="i">
              <v-list-item :disabled="item.raw.deleteMarker">
                <v-list-item-title class="text-h6">
                  {{ 'v' + (items.length - i) }}
                  <v-chip v-if="item.raw.latest" class="ma-2" size="small" color="pink" label>
                    <v-icon icon="mdi-label" start></v-icon>
                    CURRENT VERSION
                  </v-chip>
                  <v-chip v-if="item.raw.deleteMarker" class="ma-2" size="small" color="gray" label>
                    <v-icon icon="mdi-delete" start></v-icon>
                    DELETE
                  </v-chip>
                </v-list-item-title>
                <v-list-item-subtitle class="mb-2 text-high-emphasis opacity-100">
                  {{ item.raw.versionId }}
                </v-list-item-subtitle>

                <v-list-item-subtitle class="text-high-emphasis">
                  最后更新时间： {{ defaultFormat(item.raw.lastModified) }} - | - 文件大小：{{
                    humanObjectSize(item.raw.size)
                  }}
                </v-list-item-subtitle>
              </v-list-item>

              <v-divider></v-divider>
            </template>
          </v-list>
        </template>
      </v-data-iterator>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import type { ObjectVersionDomain } from '@herodotus/api';

import { useOss, useDateTime } from '@/composables/hooks';
import { API } from '@/configurations';

defineOptions({ name: 'HOssObjectVersions' });

interface Props {
  bucketName: string;
  objectName: string;
  showVersions: boolean;
}

const props = defineProps<Props>();

const { humanObjectSize } = useOss();
const { defaultFormat } = useDateTime();

const loading = shallowRef(false);
const tableRows = ref([]) as Ref<Array<ObjectVersionDomain>>;

const fetchObjectVersions = (bucketName: string, prefix = '') => {
  loading.value = true;
  API.core
    .ossObject()
    .listObjectVersions({ bucketName: bucketName, prefix: prefix })
    .then((result) => {
      const data = result.data.versions;
      tableRows.value = data ? data : [];
      console.log(tableRows.value);
      loading.value = false;
    })
    .catch(() => {
      loading.value = false;
    });
};

watch(
  () => props.showVersions,
  (newValue) => {
    if (newValue) {
      fetchObjectVersions(props.bucketName, props.objectName);
    } else {
      tableRows.value = [];
    }
  },
  { immediate: true },
);
</script>
