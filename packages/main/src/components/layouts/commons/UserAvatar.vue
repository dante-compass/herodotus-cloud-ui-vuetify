<template>
  <user-menu :avatar="avatar" :username="authenticationStore.username">
    <v-list density="compact" nav slim>
      <v-list-item
        slim
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        to="/dashboard/console"
        :active="false"
      ></v-list-item>
      <v-list-item
        slim
        prepend-icon="mdi-square-edit-outline"
        title="个人设置"
        to="/dashboard/console"
        :active="false"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" nav slim>
      <v-list-item
        slim
        prepend-icon="mdi-logout-variant"
        title="退出系统"
        @click="signOut()"
      ></v-list-item>
    </v-list>
  </user-menu>
</template>

<script setup lang="ts">
import { AvatarUtils } from '@herodotus/core';
import { SignOutUtilities, useAuthenticationStore } from '@herodotus/framework';

import UserMenu from './UserMenu.vue';

defineOptions({ name: 'AppUserAvatar', components: { UserMenu } });

const authenticationStore = useAuthenticationStore();

const defaultAvatar = '/images/boy-avatar.png';

const readFromStore = () => {
  if (authenticationStore.avatar) {
    return authenticationStore.avatar;
  } else {
    if (authenticationStore.userId) {
      const image = AvatarUtils.generate(authenticationStore.userId);
      return image;
    } else {
      return defaultAvatar;
    }
  }
};

const avatar = computed(() => {
  return readFromStore();
});

const signOut = () => {
  SignOutUtilities.getInstance().signOutWithDialog();
};
</script>
