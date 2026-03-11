<template>
  <div></div>
</template>

<script setup lang="ts">
import type { RouteLocationNormalizedLoaded } from 'vue-router';
import type { SocialSource, AccessPrincipal } from '@herodotus/framework';

import { useRoute, useRouter } from 'vue-router';
import { useAuthenticationStore } from '@herodotus/framework';
import { isEmpty } from 'lodash-es';

defineOptions({ name: 'SocialSignInCallback' });

const route = useRoute();
const router = useRouter();

const source = ref() as Ref<SocialSource>;
const accessPrincipal = ref({}) as Ref<AccessPrincipal>;

const getAccessPrincipal = (source: SocialSource, route: RouteLocationNormalizedLoaded): AccessPrincipal => {
  if (route && !isEmpty(route.query)) {
    switch (source) {
      case 'WXAPP':
        break;
      default:
        accessPrincipal.value.code = route.query.code as string;
        accessPrincipal.value.state = route.query.state as string;
        break;
    }
  }

  return accessPrincipal.value;
};

const initParams = () => {
  if (route && !isEmpty(route.params) && route.params.source) {
    source.value = route.params.source as SocialSource;
    getAccessPrincipal(source.value, route);
  }
};

onMounted(() => {
  initParams();
  if (accessPrincipal.value.state) {
    const authentication = useAuthenticationStore();
    authentication.socialSignIn(source.value, accessPrincipal.value).then(() => {
      router.push('/');
    });
  }
});
</script>
