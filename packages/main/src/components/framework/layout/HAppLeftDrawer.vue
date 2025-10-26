<template>
  <v-navigation-drawer v-model="application.leftDrawer" width="300" theme="dark">
    <v-list>
      <v-list-item
        prepend-avatar="https://cdn.vuetifyjs.com/images/john.png"
        subtitle="john@google.com"
        title="John Leider"
      >
        <template v-slot:append>
          <v-btn icon="mdi-menu-down" size="small" variant="text"></v-btn>
        </template>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>
    <!-- <h-app-menu nav></h-app-menu> -->
  </v-navigation-drawer>
</template>

<script lang="ts" setup>
import { useApplicationStore } from '@herodotus/framework';
// import HAppMenu from './HAppMenu.vue';

defineOptions({ name: 'HAppLeftDrawer' });

const application = useApplicationStore();
</script>
