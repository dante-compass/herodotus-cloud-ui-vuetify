<template>
  <h-sign-in-layout>
    <v-slide-x-transition mode="out-in">
      <component :is="application.signInPanel"></component>
    </v-slide-x-transition>
  </h-sign-in-layout>
</template>

<script setup lang="ts">
import { useApplicationStore, useAuthenticationStore, useCryptoStore } from '@herodotus/framework';

import HSignInLayout from './HSignInLayout.vue';
import AccountPanel from './components/AccountPanel.vue';
import MobilePanel from './components/MobilePanel.vue';
import ScanPanel from './components/ScanPanel.vue';

defineOptions({
  name: 'HSignIn',
  components: { HSignInLayout, account: AccountPanel, mobile: MobilePanel, scan: ScanPanel },
});

const application = useApplicationStore();
const authentication = useAuthenticationStore();
const crypto = useCryptoStore();

onMounted(() => {
  crypto.exchange();
  authentication.errorTimes = 0;
});
</script>
