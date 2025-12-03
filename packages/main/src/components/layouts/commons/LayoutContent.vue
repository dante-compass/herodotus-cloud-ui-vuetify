<template>
  <suspense>
    <template #default>
      <router-view v-slot="{ Component, route }">
        <keep-alive :include="keepAlives">
          <v-slide-x-transition mode="out-in">
            <component :is="getComponent(Component, route)"></component>
          </v-slide-x-transition>
        </keep-alive>
      </router-view>
    </template>
    <template #fallback>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
              :size="70"
              :width="7"
            ></v-progress-circular>
            <p class="mt-4 text-subtitle-1">加载中...</p>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import type { VNode, RendererNode, RendererElement } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { useRoute } from 'vue-router';
import { useElementStore } from '@herodotus/framework';

defineOptions({ name: 'LayoutContent' });

const route = useRoute();
const store = useElementStore();
const { cachedRoutes } = storeToRefs(store);

const keepAlives = cachedRoutes.value;

const getComponent = (
  component: VNode<RendererNode, RendererElement, { [key: string]: any }>,
  route: RouteLocationNormalizedLoaded,
) => {
  // @ts-ignore
  if (component.type.name !== route.name && store.isValidDetailRoute(route)) {
    return defineAsyncComponent({
      loader: store.getDetailComponent(route.name as string),
      delay: 2000,
    });
  }

  return component;
};

watch(
  () => route.path,
  () => {
    store.addCachedRoute(route);
  },
  {
    immediate: true,
  },
);
</script>
