<template>
  <div class="d-flex mb-3 w-100">
    <div class="flex-1-1-0">
      <v-label :text="title" class="my-1 font-weight-medium">
        <slot name="title"></slot>
      </v-label>
      <v-messages v-if="showMessage" :messages="text" :active="showMessage" />
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { VLabel, VMessages } from 'vuetify/components';

defineOptions({ name: 'HLabel', components: { VLabel, VMessages } });

interface Props {
  title: string;
  text?: string;
}

const props = defineProps<Props>();

const showMessage = computed(() => {
  return props.text ? true : false;
});
</script>
