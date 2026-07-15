<template>
  <div :class="['d-flex w-100', { 'mb-3': !hideDetails }]">
    <div class="flex-1-1-0">
      <div class="d-flex">
        <div v-if="required" class="d-flex align-self-center mr-1">
          <v-icon size="x-small" icon="mdi-star" color="red"></v-icon>
        </div>
        <v-label :text="text" class="font-weight-medium">
          <slot name="text"></slot>
        </v-label>
        <div v-if="tooltip" class="d-flex align-self-center">
          <v-tooltip location="bottom">
            <template #activator="{ props: tooltip }">
              <v-icon size="x-small" icon="mdi-progress-question" color="grey" v-bind="tooltip"></v-icon>
            </template>
            <span>点击设置日期</span>
          </v-tooltip>
        </div>
      </div>
      <v-messages v-if="showMessage" :messages="message" :active="showMessage" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { VIcon, VBtn, VTooltip, VLabel, VMessages } from "vuetify/components";

defineOptions({ name: "HLabel", components: { VIcon, VBtn, VTooltip, VLabel, VMessages } });

interface Props {
  required?: boolean;
  text: string;
  message?: string;
  tooltip?: string;
  hideDetails?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  hideDetails: false,
});

const showMessage = computed(() => {
  return props.message ? true : false;
});
</script>
