<template>
  <q-layout view="lHr LpR lFr" :class="[$q.dark.isActive ? 'bg-black' : 'bg-grey-2']">
    <h-app-header :tab-view="false" back-home message></h-app-header>

    <h-app-right-drawer></h-app-right-drawer>

    <h-setting-container></h-setting-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { HSettingContainer } from '@/components';
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import { useRoute } from 'vue-router';

import { useRouteStore } from '@/stores';
import { useEditFinish } from '@/hooks';

export default defineComponent({
  name: 'HSettingsLayout',

  components: {
    HSettingContainer,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);
    const $q = useQuasar();

    const route = useRoute();
    const { onFinish } = useEditFinish();

    const smartCloseDetail = (route: RouteLocationNormalizedLoaded) => {
      const store = useRouteStore();
      const isDetailRoute = store.isDetailRoute(route);

      if (isDetailRoute) {
        if (!store.hasParameter(route)) {
          onFinish();
        }
      }
    };

    watch(
      () => route.path,
      () => {
        smartCloseDetail(route);
      },
      { immediate: true },
    );

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      $q,
    };
  },
});
</script>
