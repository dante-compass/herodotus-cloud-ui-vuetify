<template>
  <v-navigation-drawer v-model="application.leftDrawer" width="300" theme="dark">
    <!-- <h-app-menu nav></h-app-menu> -->

    <template #append>
      <v-divider></v-divider>
      <div class="d-flex align-center text-caption text-medium-emphasis pa-2">
        <div class="d-flex ms-auto overflow-hidden">
          <v-btn
            :text="version"
            :to="`https://gitee.com/dromara/dante-cloud/releases/tag/v${version}`"
            class="text-caption"
            prepend-icon="mdi-tag-outline"
            size="small"
            variant="text"
            slim
          ></v-btn>
        </div>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useApplicationStore } from '@herodotus/framework';
// import HAppMenu from './HAppMenu.vue';

defineOptions({ name: 'HAppLeftDrawer' });

const application = useApplicationStore();

const version = shallowRef('3.5.7.6');
</script>
