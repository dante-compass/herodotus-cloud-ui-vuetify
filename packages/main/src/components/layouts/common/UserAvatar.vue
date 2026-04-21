<template>
  <user-menu :avatar="avatar" :username="authenticationStore.username">
    <v-list density="compact" nav slim>
      <v-list-subheader>功能菜单</v-list-subheader>
      <v-list-item
        slim
        prepend-icon="mdi-view-dashboard"
        title="Dashboard"
        to="/dashboard"
        :active="false"
      ></v-list-item>
      <v-list-item
        slim
        prepend-icon="mdi-square-edit-outline"
        title="个人设置"
        to="/message"
        :active="false"
      ></v-list-item>
    </v-list>
    <v-divider></v-divider>
    <v-list density="compact" nav slim>
      <v-list-subheader>系统操作</v-list-subheader>
      <v-list-item slim prepend-icon="mdi-logout-variant" title="退出系统" @click="signOut()"></v-list-item>
    </v-list>
  </user-menu>
</template>

<script setup lang="ts">
import { AvatarUtils } from '@herodotus/core';
import { SignOutUtilities, useAuthenticationStore } from '@herodotus/framework';

import { useImage } from '@/composables/hooks';

import UserMenu from './UserMenu.vue';

defineOptions({ name: 'AppUserAvatar', components: { UserMenu } });

const authenticationStore = useAuthenticationStore();

const { getStaticFile } = useImage();

const readFromStore = () => {
  if (authenticationStore.avatar) {
    return authenticationStore.avatar;
  } else {
    if (authenticationStore.userId) {
      const image = AvatarUtils.generate(authenticationStore.userId);
      return image;
    } else {
      return getStaticFile('boy-avatar.png');
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
