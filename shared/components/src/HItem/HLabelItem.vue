<template>
  <div :class="['d-flex', ...clazz, 'ga-4']">
    <div class="w-20">
      <h-label :text="label" :required="required" hide-details :class="[{ 'justify-end': right }]"></h-label>
    </div>

    <div class="w-50">
      <slot></slot>
    </div>

    <div>
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HLabel } from "../HLabel";
import { HIconButton } from "../HButton";
import { computed } from "vue";

defineOptions({ name: "HLabelItem", components: { HLabel, HIconButton } });

interface Props {
  label: string;
  required?: boolean;
  justify?: "start" | "center" | "end" | null;
  align?: "start" | "center" | "end" | null;
  right?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  justify: "center",
  align: "center",
  required: false,
  right: false,
});

const clazz = computed(() => {
  const items: string[] = [];

  if (props.justify) {
    items.push(`justify-${props.justify}`);
  }

  if (props.align) {
    items.push(`align-${props.align}`);
  }

  return items;
});
</script>
