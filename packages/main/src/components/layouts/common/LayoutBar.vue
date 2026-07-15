<template>
  <v-app-bar class="border-b px-md-3" flat>
    <div class="px-1" />

    <v-app-bar-nav-icon
      v-if="!personal"
      class="ml-12"
      :icon="application.leftDrawer ? 'mdi-menu-open' : 'mdi-menu-close'"
      @click="application.leftDrawer = !application.leftDrawer"
    />

    <template #prepend>
      <h-app-logo width="180"></h-app-logo>
    </template>

    <layout-breadcrumbs v-if="!personal"></layout-breadcrumbs>

    <v-spacer></v-spacer>

    <template #append>
      <div class="d-flex ga-1">
        <notification-menu v-if="isMessageEnabled"></notification-menu>
        <h-icon-button
          icon="mdi-cog-outline"
          tooltip="设置"
          color="medium-emphasis"
          @click.stop="application.rightDrawer = !application.rightDrawer"
        ></h-icon-button>
        <h-icon-button
          v-if="supportTesting"
          icon="mdi-ab-testing"
          tooltip="功能测试"
          color="medium-emphasis"
          @click="goTo()"
        ></h-icon-button>
      </div>
      <v-divider class="align-self-center h-100 mx-2 mx-sm-4" vertical></v-divider>
      <user-avatar></user-avatar>
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { useApplicationStore, useElementStore } from "@herodotus/framework";
import { VARIABLES, RouterUtils } from "@/configurations";

import { HAppLogo } from "../../library/HLogo";
import LayoutBreadcrumbs from "./LayoutBreadcrumbs.vue";
import UserAvatar from "./UserAvatar.vue";
import NotificationMenu from "./NotificationMenu.vue";

defineOptions({ name: "LayoutBar", components: { HAppLogo, LayoutBreadcrumbs, UserAvatar, NotificationMenu } });

const application = useApplicationStore();
const element = useElementStore();

interface Props {
  personal?: boolean;
}

withDefaults(defineProps<Props>(), {
  personal: false,
});

const isMessageEnabled = computed(() => {
  return VARIABLES.isUseWebSocket();
});

const supportTesting = computed(() => {
  return element.supportTesting;
});

const goTo = () => {
  RouterUtils.push("/iot-testing");
};
</script>
