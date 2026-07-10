<template>
  <div class="d-flex justify-center align-center ga-4">
    <h-label
      :text="label"
      :required="required"
      hide-details
      :class="['d-flex', { 'justify-end': isJustifyEnd }]"
      style="width: 100px"
    ></h-label>

    <div class="w-33">
      <slot></slot>
    </div>

    <div>
      <slot name="append"></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HLabel } from "../HLabel";
defineOptions({ name: "HLabelItem", components: { HLabel } });

interface Props {
  label: string;
  required?: boolean;
  justify?: "default" | "end";
}

const props = withDefaults(defineProps<Props>(), {
  justify: "default",
  required: false,
});

const isJustifyEnd = () => {
  return props.justify === "end";
};
</script>
