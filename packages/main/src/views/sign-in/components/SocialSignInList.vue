<template>
  <v-row justify="center">
    <v-btn v-if="!hasConfig" icon="mdi-wechat" variant="tonal"></v-btn>
    <template v-else>
      <v-btn
        icon
        color="accent"
        v-for="(value, key, index) in list"
        :key="index"
        :href="value"
        target="_blank"
        variant="tonal"
      >
        <v-avatar>
          <v-img :src="getSocialLogo(key)" />
        </v-avatar>
      </v-btn>
    </template>
    <v-btn
      color="accent"
      icon="mdi-login-variant"
      :href="authorizationCodeUrl"
      tooltip="授权码模式登录"
      variant="tonal"
    ></v-btn>
  </v-row>
</template>

<script setup lang="ts">
import { isEmpty } from "lodash-es";
import { SecurityApiResources } from "@herodotus/framework";

import { VARIABLES } from "@/configurations";
import { useImage } from "@/composables/hooks";

defineOptions({ name: "SocialSignInList" });

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

const hasConfig = computed(() => {
  return !isEmpty(list.value);
});

const authorizationCodeUrl = computed(() => {
  return SecurityApiResources.getInstance()
    .oauth2()
    .authorizationCodeRequestFlow(
      VARIABLES.getApiUrl(),
      VARIABLES.getRedirectUri(),
      "openid",
      VARIABLES.getAuthorizeUri(),
    );
});

onMounted(() => {
  init();
});
</script>
