<template>
  <v-card class="mx-auto" rounded="xl">
    <v-toolbar flat>
      <template #prepend>
        <h-button
          color="red"
          icon="mdi-arrow-left-box"
          tooltip="返回"
          variant="text"
          @click="onFinish()"
        ></h-button>
      </template>

      <v-toolbar-title
        class="text-high-emphasis font-weight-black"
        :text="title"
      ></v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <slot></slot>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useEditFinish } from '@herodotus/framework';

defineOptions({ name: 'HDetailContainer' });

const { onFinish } = useEditFinish();

defineProps({ title: String });
</script>
