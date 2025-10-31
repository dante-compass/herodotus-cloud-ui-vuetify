<template>
  <h-sign-in-layout>
    <transition
      appear
      mode="out-in"
      :duration="1000"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
    >
      <component :is="application.signInPanel"></component>
    </transition>
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
