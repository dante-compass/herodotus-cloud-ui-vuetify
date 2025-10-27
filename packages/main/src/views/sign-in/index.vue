<template>
  <h-sign-in-layout>
    <component :is="application.signInPanel"></component>
  </h-sign-in-layout>
</template>

<script setup lang="ts">
import { useCryptoStore, useAuthenticationStore, useApplicationStore } from '@herodotus/framework';

import HSignInLayout from './HSignInLayout.vue';
import AccountPanel from './panel/AccountPanel.vue';
import MobilePanel from './panel/MobilePanel.vue';
import ScanPanel from './panel/ScanPanel.vue';

defineOptions({
  name: 'SignIn',
  components: { HSignInLayout, account: AccountPanel, mobile: MobilePanel, scan: ScanPanel },
});

const application = useApplicationStore();
</script>
