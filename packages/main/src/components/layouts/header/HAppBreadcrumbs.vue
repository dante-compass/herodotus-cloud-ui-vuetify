<template>
  <v-breadcrumbs :items="items" density="compact">
    <template v-slot:title="{ item }">
      <v-icon :icon="parseIcon(item.title)" size="small"></v-icon>
      {{ parseTitle(item.title) }}
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
import type { RouteLocationMatched, RouteLocationRaw } from 'vue-router';
import type { BreadcrumbItem } from 'vuetify/lib/components/VBreadcrumbs/VBreadcrumbs.mjs';
import { useRoute } from 'vue-router';
import { isEmpty, split } from 'lodash-es';

import { DEAULT_ROUTER_LINK } from '@/configurations';

defineOptions({ name: 'HAppBreadcrumbs' });

const route = useRoute();

const matchedToRaw = (item: RouteLocationMatched): RouteLocationRaw => {
  if (item.name) {
    return {
      name: item.name,
      // 可以添加当前路由的参数
      params: route.params, // 需要从当前路由获取
      query: route.query,
    };
  }

  // 方法2: 使用 path
  return {
    path: item.path,
    query: route.query,
  };
};

const getItem = (item: RouteLocationMatched): BreadcrumbItem => {
  let disabled = false;
  let to = matchedToRaw(item);

  if (!isEmpty(item.children)) {
    disabled = true;
  }

  return {
    title: createTitle(item),
    disabled: disabled,
    to: to,
  };
};

const createTitle = (item: RouteLocationMatched) => {
  return item.meta.title + '_' + item.meta.icon;
};

const parseTitle = (title: string) => {
  const result = split(title, '_');
  return result[0];
};

const parseIcon = (title: string) => {
  const result = split(title, '_');
  return result[1];
};

const getHome = (matched: RouteLocationMatched[]) => {
  let disabled = false;
  if (matched[0]?.path === DEAULT_ROUTER_LINK.home.path) {
    disabled = true;
  }

  return {
    title: DEAULT_ROUTER_LINK.home.title + '_mdi-home',
    disabled: disabled,
    to: { name: 'DashboardConsole', path: '/dashboard/console' },
  };
};

const getItems = (matched: RouteLocationMatched[]) => {
  return matched.map((item) => getItem(item));
};

const items = computed(() => {
  const matched = route.matched;
  return [getHome(matched), ...getItems(matched)];
});
</script>
