<template>
  <div>
    console
    <v-btn size="large">Large Button</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { useRealTimeInformation } from '@/composables/hooks';

defineOptions({ name: 'DashboardConsole' });

const { onlineUserCount } = useRealTimeInformation();
</script>
