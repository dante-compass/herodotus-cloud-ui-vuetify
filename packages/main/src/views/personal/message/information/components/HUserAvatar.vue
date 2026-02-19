<template>
  <v-avatar v-bind="$attrs">
    <v-img :src="src" />
  </v-avatar>
</template>

<script setup lang="ts">
import { useAuthenticationStore } from '@herodotus/framework';
import { AvatarUtils } from '@herodotus/core';

defineOptions({ name: 'HUserAvatar' });

interface Props {
  id?: string;
  avatar?: string;
  fromStore?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  id: '',
  avatar: '',
  fromStore: false,
});

const defaultAvatar = '/images/boy-avatar.png';
const authenticationStore = useAuthenticationStore();

const readFromStore = () => {
  if (authenticationStore.avatar) {
    return authenticationStore.avatar;
  } else {
    if (authenticationStore.userId) {
      return AvatarUtils.generate(authenticationStore.userId);
    } else {
      return defaultAvatar;
    }
  }
};

const readFromProps = () => {
  if (props.avatar) {
    return props.avatar;
  } else {
    if (props.id) {
      return AvatarUtils.generate(props.id);
    } else {
      return defaultAvatar;
    }
  }
};

const src = computed(() => {
  if (props.fromStore) {
    return readFromStore();
  } else {
    return readFromProps();
  }
});
</script>
