<template>
  <div class="d-flex flex-column gr-4 py-4">
    <v-divider opacity=".7" v-bind="$attrs">
      <template v-if="label">
        {{ label }}
      </template>
      <template v-else>
        <slot></slot>
      </template>
    </v-divider>
  </div>
</template>

<script setup lang="ts">
import { VDivider } from "vuetify/components";

defineOptions({ name: "HDivider", components: { VDivider } });

interface Props {
  label?: string;
}

defineProps<Props>();
</script>
