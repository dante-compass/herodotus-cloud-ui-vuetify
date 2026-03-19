<template>
  <v-row justify="center">
    <h-button v-if="!hasConfig" icon="mdi-wechat" class="ma-2"></h-button>
    <template v-else>
      <v-btn
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
      </v-btn>
    </template>
    <h-button icon="mdi-login-variant" :href="authorizationCodeUrl" tooltip="授权码模式登录" class="ma-2"></h-button>
  </v-row>
</template>

<script setup lang="ts">
import { isEmpty, toLower } from 'lodash-es';
import { SecurityApiResources } from '@herodotus/framework';

import { VARIABLES } from '@/configurations';
import { useImage } from '@/composables/hooks';

defineOptions({ name: 'SocialSignInList' });

const { getSocialLogo } = useImage();

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
  return getSocialLogo(toLower(name), suffix);
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
