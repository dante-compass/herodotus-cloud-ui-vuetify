<template>
  <v-row justify="center">
    <h-button v-if="!hasConfig" rounded icon="mdi-wechat"></h-button>
    <template v-else>
      <q-btn
        v-for="(value, key, index) in list"
        flat
        round
        :key="index"
        :href="value"
        target="_blank"
      >
        <q-avatar size="30px">
          <img :src="find(key)" />
        </q-avatar>
      </q-btn>
    </template>
    <h-button
      color="primary"
      icon="mdi-login"
      round
      flat
      :href="authorizationCodeUrl"
      tooltip="授权码模式登录"
    ></h-button>
  </v-row>
</template>

<script setup lang="ts">
import { isEmpty } from 'lodash-es';
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
  return `/images/social/${name}.${suffix}`;
};

const hasConfig = computed(() => {
  return !isEmpty(list.value);
});

const authorizationCodeUrl = computed(() => {
  return SecurityApiResources.getInstance()
    .oauth2()
    .authorizationCodeRequestFlow(VARIABLES.getRedirectUri());
});

onMounted(() => {
  init();
});
</script>
