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
      <loading></loading>
    </template>
  </suspense>
</template>

<script setup lang="ts">
import type { VNode, RendererNode, RendererElement } from 'vue';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

import { useRoute } from 'vue-router';
import { useElementStore } from '@herodotus/framework';

import Loading from './Loading.vue';

defineOptions({ name: 'LayoutContent', components: { Loading } });

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
