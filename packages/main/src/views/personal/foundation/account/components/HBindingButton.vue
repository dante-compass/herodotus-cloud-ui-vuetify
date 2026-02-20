<template>
  <div v-if="item.bound">
    <v-btn variant="tonal" color="red" density="compact">解除绑定</v-btn>
  </div>
  <div v-else>
    <v-btn v-if="item.oauth2" variant="tonal" color="green" density="compact" :href="item.authorizeUrl" target="_blank">
      绑定
    </v-btn>
  </div>
</template>

<script setup lang="ts">
import type { AccessSourceEntity } from '@herodotus/api';

defineOptions({ name: 'HBindingButton' });

interface Props {
  item: AccessSourceEntity;
}

defineProps<Props>();
</script>
