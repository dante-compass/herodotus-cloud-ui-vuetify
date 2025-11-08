<template>
  <v-app id="profile">
    <layout-bar profile></layout-bar>

    <v-main>
      <layout-container></layout-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { LayoutContainer, LayoutBar } from '../commons';

defineOptions({
  name: 'ProfileDefaultLayout',
  components: { LayoutContainer },
});
</script>
