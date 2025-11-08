<template>
  <v-card class="mx-auto" rounded="xl" :title="title">
    <template #prepend>
      <h-button
        icon="mdi-arrow-left-box"
        tooltip="返回"
        variant="text"
        @click="onFinish()"
      ></h-button>
    </template>

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
