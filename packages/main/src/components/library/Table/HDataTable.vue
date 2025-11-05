<template>
  <v-card>
    <v-data-table-server
      v-model:items-per-page="pageSize"
      v-model:page="pageNumber"
      :items-length="totalItems"
      show-select
      select-strategy="single"
      striped="even"
      hover
      v-bind="$attrs"
    >
      <template v-for="slotName in Object.keys($slots)" v-slot:[slotName]="props">
        <slot :name="slotName" v-bind="props"></slot>
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
  </v-card>
</template>

<script setup lang="ts">
import { VDataTableServer } from 'vuetify/components';

defineOptions({ name: 'HDataTable' });

const pageNumber = defineModel('pageNumber', { type: Number, default: 1, required: true });
const pageSize = defineModel('pageSize', { type: Number, default: 10, required: true });
const totalPages = defineModel('totalPages', { type: Number, default: 0, required: true });
const totalItems = defineModel('totalItems', { type: Number, default: 0, required: true });
</script>
