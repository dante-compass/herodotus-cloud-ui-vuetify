<template>
  <q-drawer v-model="drawer" show-if-above bordered :width="240">
    <q-scroll-area class="fit"> <h-app-menu></h-app-menu> </q-scroll-area>
  </q-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useApplicationStore } from '@/stores';
import HAppMenu from './HAppMenu.vue';

defineOptions({
  name: 'HAppLeftDrawer',
  components: {
    HAppMenu,
  },
});

const application = useApplicationStore();

const drawer = computed(() => {
  return application.leftDrawer;
});
</script>
