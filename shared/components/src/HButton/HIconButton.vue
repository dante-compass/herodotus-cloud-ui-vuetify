<template>
  <v-tooltip v-if="tooltip" interactive :location="location">
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon-btn v-bind="mergeProps($attrs, activatorProps)"></v-icon-btn>
    </template>
    <span>{{ tooltip }}</span>
  </v-tooltip>
  <v-icon-btn v-else v-bind="$attrs"></v-icon-btn>
</template>

<script setup lang="ts">
import { mergeProps } from "vue";
import { VTooltip, VIconBtn } from "vuetify/components";

defineOptions({ name: "HIconButton", components: { VTooltip, VIconBtn } });

interface Props {
  tooltip?: string;
  location?: VTooltip["location"];
}

withDefaults(defineProps<Props>(), { location: "bottom" });
</script>
