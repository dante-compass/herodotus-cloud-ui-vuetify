<template>
  <h-sign-in-layout>
    <component :is="application.signInPanel"></component>
  </h-sign-in-layout>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useApplicationStore, useCryptoStore, useAuthenticationStore } from '@/stores';

import { HSignInLayout } from '@/composables/sign-in';
import { AccountPanel, MobilePanel, ScanPanel } from './panel';

defineOptions({
  name: 'SignIn',
  components: {
    HSignInLayout,
    account: AccountPanel,
    mobile: MobilePanel,
    scan: ScanPanel,
  },
});

const application = useApplicationStore();
const authentication = useAuthenticationStore();
const crypto = useCryptoStore();

onMounted(() => {
  crypto.exchange();
  authentication.errorTimes = 0;
});
</script>
