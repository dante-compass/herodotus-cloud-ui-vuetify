<template>
  <h-detail-container :title="title">
    <v-container>
      <v-row>
        <v-col>
          <slot></slot>
        </v-col>
        <v-col>
          <slot name="right"></slot>
        </v-col>
      </v-row>
    </v-container>
  </h-detail-container>
</template>

<script setup lang="ts">
import { HDetailContainer } from '../../layouts/form';

defineOptions({ name: 'HAuthorizeLayout', components: { HDetailContainer } });

interface Props {
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: '',
});
</script>
