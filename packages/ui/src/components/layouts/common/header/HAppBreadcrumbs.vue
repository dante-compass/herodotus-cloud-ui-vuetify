<template>
  <q-breadcrumbs class="q-ml-lg" :class="settings.display.showBreadcrumbsIcon ? '' : 'hidden_icon'">
    <q-breadcrumbs-el label="首页" icon="home" :to="homePath" />
    <q-breadcrumbs-el
      v-for="(item, i) in $route.matched"
      :key="i"
      :label="item.meta.title as string"
      :icon="item.meta.icon as string"
      :disable="true" />
  </q-breadcrumbs>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { Constants } from '/@/lib/definitions';
import { useSettingsStore } from '/@/stores';

export default defineComponent({
  name: 'HAppBreadcrumbs',

  setup(props) {
    const homePath = Constants.Path.HOME;
    const settings = useSettingsStore();

    return {
      homePath,
      settings,
    };
  },
});
</script>

<style lang="scss">
.hidden_icon {
  a {
    i {
      display: none;
    }
  }
}
</style>
