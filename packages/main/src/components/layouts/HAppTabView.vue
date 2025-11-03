<template>
  <v-card rounded="xl" class="ma-4">
    <v-card-item>
      <v-tabs>
        <v-tab
          v-for="(tab, i) in tabs"
          :key="i"
          :tabindex="i"
          :value="tab.path"
          class="font-weight-bold"
          :text="getTitle(tab)"
          :prepend-icon="getIcon(tab)"
          :to="tab.path"
          exact
        >
          <template #append>
            <v-icon
              v-if="isNotLastTab(i)"
              icon="mdi-close-circle"
              class="q-ml-md"
              end
              @click="onCloseTab(tab)"
            />
            <v-icon v-else size="xs" icon="mdi-lock" class="q-ml-md" end />
          </template>
        </v-tab>
      </v-tabs>
      <template #append>
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn icon="mdi-dots-vertical" variant="text" v-bind="props"></v-btn>
          </template>

          <v-list>
            <h-app-tab-menu-item
              title="刷新当前"
              icon="mdi-refresh"
              :disabled="disableRefreshCurrentTab"
              @click="onRefresh"
            ></h-app-tab-menu-item>
            <h-app-tab-menu-item
              title="关闭当前"
              icon="mdi-close"
              :disabled="disableCloseCurrentTab"
              @click="onCloseCurrentTab()"
            ></h-app-tab-menu-item>
            <h-app-tab-menu-item
              title="关闭其它"
              icon="mdi-format-horizontal-align-center"
              @click="onCloseOtherTabs()"
            ></h-app-tab-menu-item>
            <h-app-tab-menu-item
              title="关闭左侧"
              icon="mdi-format-horizontal-align-right"
              :disabled="disableCloseLeftTabs"
              @click="onCloseLeftTabs()"
            ></h-app-tab-menu-item>
            <h-app-tab-menu-item
              title="关闭右侧"
              icon="mdi-format-horizontal-align-left"
              :disabled="disableCloseRightTabs"
              @click="onCloseRightTabs()"
            ></h-app-tab-menu-item>
          </v-list>
        </v-menu>
      </template>
    </v-card-item>
  </v-card>
</template>

<script setup lang="ts">
import type { Tab } from '@herodotus/framework';

import { useRoute } from 'vue-router';
import { useTabsViewStore } from '@herodotus/framework';
import { refreshTabInjectionKey } from '@/composables/symbols';

import HAppTabMenuItem from './HAppTabMenuItem.vue';

defineOptions({ name: 'HAppTabView', components: { HAppTabMenuItem } });

const route = useRoute();

const store = useTabsViewStore();
const {
  tabs,
  isNotLastTab,
  disableCloseCurrentTab,
  disableCloseRightTabs,
  disableCloseLeftTabs,
  disableRefreshCurrentTab,
} = storeToRefs(store);
const { closeTab, smartTab, closeCurrentTab, closeOtherTabs, closeLeftTabs, closeRightTabs } =
  store;

const refreshTab = inject<Function>(refreshTabInjectionKey);

watch(
  () => route.path,
  () => {
    console.log('----------', route);
    smartTab(route);
  },
  { immediate: true },
);

onMounted(() => {
  for (let tab in store.tabs) {
    console.log('----tab----', tab);
  }
});

const onCloseTab = (tab: Tab) => {
  closeTab(tab);
};

const onCloseCurrentTab = () => {
  closeCurrentTab();
};

const onCloseOtherTabs = () => {
  closeOtherTabs();
};

const onCloseLeftTabs = () => {
  closeLeftTabs();
};

const onCloseRightTabs = () => {
  closeRightTabs();
};

const getIcon = (tab: Tab): string => {
  return tab.meta.icon as string;
};

const getTitle = (tab: Tab): string => {
  return tab.meta.title as string;
};

const onRefresh = () => {
  refreshTab && refreshTab();
};
</script>
