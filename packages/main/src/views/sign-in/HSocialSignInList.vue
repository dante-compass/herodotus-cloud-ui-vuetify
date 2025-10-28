<template>
  <div>Mobile</div>
</template>

<script setup lang="ts">
import { SecurityApiResources } from '@herodotus/framework';

defineOptions({ name: 'HSocialSignInList' });

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

const createAuthorizationCodeAddress = () => {
  const project = API.core.getConfig().getProject();
  let address = VARIABLES.getApiUrl();
  if (lodash.endsWith(address, '/')) {
    address = address.substring(0, address.length - 1);
  }

  if (project && (project === 'dante' || project === 'herodotus')) {
    address += API.core.getConfig().getUaa(false);
  }

  return address + '/oauth2/authorize';
};

const createAuthorizationCodeParams = () => {
  const param = `?response_type=code&client_id=${VARIABLES.getClientId()}&client_secret=${VARIABLES.getClientSecret()}&redirect_uri=${VARIABLES.getRedirectUri()}&scope=openid`;
  console.log('---pkce---', PKCE.generateCodePair(64));
  return param;
};

const authorizationCodeUrl = computed(() => {
  return createAuthorizationCodeAddress() + createAuthorizationCodeParams();
});
</script>
