<template>
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="keepAlives">
      <v-fade-transition mode="out-in">
        <component :is="getComponent(Component, route)"></component>
      </v-fade-transition>
    </keep-alive>
  </router-view>
</template>

<script setup lang="ts">
import type { VNode, RendererNode, RendererElement } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { useRoute } from 'vue-router';
import { useRouterStore } from '@herodotus/framework';

defineOptions({ name: 'LayoutContent' });

const route = useRoute();
const store = useRouterStore();
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
