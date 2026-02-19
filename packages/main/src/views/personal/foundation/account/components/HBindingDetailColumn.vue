<template>
  <v-list-item :title="item.detail">
    <template v-if="item.avatar" prepend>
      <v-avatar>
        <img :src="item.avatar" />
      </v-avatar>
    </template>
  </v-list-item>
</template>

<script setup lang="ts">
import type { AccessSourceEntity } from '@herodotus/api';

defineOptions({ name: 'HBindingDetailColumn' });

interface Props {
  item: AccessSourceEntity;
}

defineProps<Props>();
</script>
