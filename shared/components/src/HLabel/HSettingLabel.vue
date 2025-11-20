<template>
  <div class="d-flex mb-3 w-100">
    <div class="flex-1-1-0">
      <v-label :text="title" class="mb-1 font-weight-medium">
        <slot name="title"></slot>
      </v-label>
      <v-messages v-if="text" :messages="text" active />
    </div>

    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { VLabel, VMessages } from 'vuetify/components';

defineOptions({ name: 'HSettingLabel', components: { VLabel, VMessages } });

interface Props {
  title: string;
  text?: string;
}

defineProps<Props>();
</script>
