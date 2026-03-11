<template>
  <div></div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useAuthenticationStore } from '@herodotus/framework';
import { isEmpty } from 'lodash-es';

defineOptions({ name: 'AuthorizationCodeSignIn' });
const route = useRoute();
const router = useRouter();

const authentication = useAuthenticationStore();

const signIn = async (code: string, state = '') => {
  await authentication.authorizationCode(code, state);
};

onMounted(() => {
  console.log('---OAuth2 Authorization Code sign in ---');
  if (route && !isEmpty(route.query)) {
    const state = route.query.state as string;
    const code = route.query.code as string;
    if (code) {
      signIn(code, state)
        .then(() => {
          router.push('/');
        })
        .catch(() => {
          router.push('/403');
        });
    }
  }
});
</script>
