<template>
  <use-fullscreen v-slot="{ toggle, isFullscreen }">
    <v-expansion-panels
      v-if="$slots.search"
      v-model="panel"
      rounded="xl"
      class="mb-2"
      ripple
      static
    >
      <v-expansion-panel value="search">
        <v-expansion-panel-title expand-icon="mdi-menu-down" collapse-icon="mdi-menu-up">
          搜索：
        </v-expansion-panel-title>
        <v-expansion-panel-text class="pt-3">
          <slot name="search"></slot>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>

    <v-card rounded="xl">
      <v-card-title class="d-flex align-center my-2">
        <slot name="control"></slot>
        <v-spacer></v-spacer>
        <h-action-button
          :icon="settings.densitySwitch('mdi-arrow-expand-vertical', 'mdi-arrow-collapse-vertical')"
          :tooltip="settings.densitySwitch('宽松', '紧凑')"
          @click="settings.display.table.dense = !settings.display.table.dense"
        ></h-action-button>
        <h-action-button
          :icon="isFullscreen ? 'mdi-arrow-collapse-all' : 'mdi-arrow-expand-all'"
          :tooltip="isFullscreen ? '退出全屏' : '全屏显示'"
          @click="toggle()"
        ></h-action-button>
      </v-card-title>

      <v-card-text>
        <v-data-table-server
          v-model:items-per-page="pageSize"
          v-model:page="pageNumber"
          :items-length="totalItems"
          :density="settings.density"
          show-select
          striped="even"
          hover
          v-bind="$attrs"
        >
          <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]="props">
            <slot
              v-if="!['loading', 'item.status', 'item.reserved'].includes(slotName)"
              :name="slotName"
              v-bind="props"
            ></slot>
          </template>

          <!-- 单独处理 loading 插槽 -->
          <template v-if="!$slots.loading" #loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
          </template>
          <template v-else #loading>
            <slot name="loading"></slot>
          </template>

          <template v-if="!$slots['item.status']" #item.status="{ item }">
            <h-column-status
              v-if="options"
              :type="item.status"
              :options="options"
            ></h-column-status>
          </template>
          <template v-else #item.status>
            <slot name="item.status"></slot>
          </template>

          <template v-if="!$slots['item.reserved']" #item.reserved="{ item }">
            <h-column-reserved :status="item.reserved"></h-column-reserved>
          </template>
          <template v-else #item.reserved>
            <slot name="item.reserved"></slot>
          </template>

          <template #bottom>
            <v-container>
              <v-row justify="end">
                <v-pagination
                  v-model="pageNumber"
                  :length="totalPages"
                  size="small"
                  rounded
                  color="primary"
                  show-first-last-page
                  total-visible="5"
                ></v-pagination>
              </v-row>
            </v-container>
          </template>
        </v-data-table-server>
      </v-card-text>
    </v-card>
  </use-fullscreen>
</template>

<script setup lang="ts">
import { VDataTableServer } from 'vuetify/components';
import { useSettingsStore } from '@herodotus/framework';
import { UseFullscreen } from '@vueuse/components';

import { useDictionary } from '@/composables/hooks';
import HColumnReserved from './HColumnReserved.vue';
import HColumnStatus from './HColumnStatus.vue';

defineOptions({
  name: 'HDataTable',
  components: { UseFullscreen, HColumnReserved, HColumnStatus },
});

const pageNumber = defineModel('pageNumber', { type: Number, default: 1, required: true });
const pageSize = defineModel('pageSize', { type: Number, default: 10, required: true });
const totalPages = defineModel('totalPages', { type: Number, default: 0, required: true });
const totalItems = defineModel('totalItems', { type: Number, default: 0, required: true });

const settings = useSettingsStore();
const { options } = useDictionary('DataItemStatus');

const panel = shallowRef('search');
</script>
