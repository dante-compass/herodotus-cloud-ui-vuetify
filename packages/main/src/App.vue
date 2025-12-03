<template>
  <v-theme-provider>
    <router-view v-if="isRouterAlive"></router-view>

    <v-container class="fill-height" fluid>
      <v-row justify="center" align="center" style="height: 100vh">
        <v-col cols="12" sm="8" md="6" lg="4" align-self="center">
          <v-card class="py-12" flat rounded="xl">
            <v-card-text class="text-center">
              <v-progress-circular
                :size="70"
                :width="7"
                color="primary"
                indeterminate
              ></v-progress-circular>
              <p class="text-h6 mt-6">正在加载，请稍候...</p>
              <v-progress-linear
                indeterminate
                chunk-gap="2"
                chunk-width="50"
                color="primary"
                height="10"
                rounded
                class="mt-10"
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-theme-provider>
</template>

<script lang="ts" setup>
import { useAuthenticationStore } from '@herodotus/framework';

import { useWebSocketMessage } from '@/composables/hooks';

import { VARIABLES } from '@/configurations';
import { refreshTabInjectionKey } from '@/composables/symbols';

defineOptions({ name: 'App' });

const authentication = useAuthenticationStore();

const isRouterAlive = shallowRef(true);
const refreshTab = () => {
  isRouterAlive.value = false;
  nextTick(() => {
    isRouterAlive.value = true;
  });
};

provide(refreshTabInjectionKey, refreshTab);

const gapTime = shallowRef(0);
const beforeUnloadTime = shallowRef(0);
const { connect, disconnect } = useWebSocketMessage();

const beforeUnloadHandler = (e: any) => {
  beforeUnloadTime.value = new Date().getTime();
};

const unloadHandler = (e: any) => {
  gapTime.value = new Date().getTime() - beforeUnloadTime.value;
  // 刷新时onbeforeunload与onunload的时间差一般都远大于5
  // 浏览器关闭
  // 判断是窗口关闭还是刷新 毫秒数判断 网上大部分写的是5
  if (gapTime.value <= 10) {
    if (authentication.token) {
      authentication.signOut();
    }
    localStorage.clear();
    sessionStorage.clear();
  } else {
    return confirm('确定要离开本系统么？');
  }
};

onMounted(() => {
  if (authentication.token) {
    connect();
  }
  if (!VARIABLES.isAutoRefreshToken()) {
    // 监听浏览器关闭
    window.addEventListener('beforeunload', (e) => beforeUnloadHandler(e));
    window.addEventListener('unload', (e) => unloadHandler(e));
  }
});

onUnmounted(() => {
  if (authentication.token) {
    disconnect();
  }
  if (!VARIABLES.isAutoRefreshToken()) {
    window.removeEventListener('beforeunload', (e) => beforeUnloadHandler(e));
    window.removeEventListener('unload', (e) => unloadHandler(e));
  }
});
</script>
