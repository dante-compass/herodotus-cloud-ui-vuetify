<template>
  <v-row justify="center">
    <h-button v-if="!hasConfig" rounded icon="mdi-wechat"></h-button>
    <template v-else>
      <h-button
        icon
        color="accent"
        v-for="(value, key, index) in list"
        :key="index"
        :href="value"
        target="_blank"
        class="ma-2"
      >
        <v-avatar>
          <v-img :src="find(key)" />
        </v-avatar>
      </h-button>
    </template>
    <h-button
      color="accent"
      icon="mdi-login-variant"
      :href="authorizationCodeUrl"
      tooltip="授权码模式登录"
      class="ma-2"
    >
    </h-button>
  </v-row>
</template>

<script setup lang="ts">
import { isEmpty, toLower } from 'lodash-es';
import { SecurityApiResources } from '@herodotus/framework';

import { VARIABLES } from '@/configurations';

defineOptions({ name: 'SocialSignInList' });

const list = ref({}) as Ref<Record<string, string>>;

const init = () => {
  SecurityApiResources.getInstance()
    .open()
    .getSocialList()
    .then((result) => {
      list.value = result.data as Record<string, string>;
    });
};

const find = (name: string, suffix = 'png') => {
  return `/images/social/${toLower(name)}.${suffix}`;
};

const hasConfig = computed(() => {
  return !isEmpty(list.value);
});

const authorizationCodeUrl = computed(() => {
  return SecurityApiResources.getInstance()
    .oauth2()
    .authorizationCodeRequestFlow(VARIABLES.getApiUrl(), VARIABLES.getRedirectUri());
});

onMounted(() => {
  init();
});
</script>
