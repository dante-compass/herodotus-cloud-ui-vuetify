<template>
  <h-sign-in-layout>
    <component :is="application.signInPanel"></component>
  </h-sign-in-layout>
</template>

<script setup lang="ts">
import { useApplicationStore } from '@herodotus/framework';

import HSignInLayout from './HSignInLayout.vue';
import AccountPanel from './components/AccountPanel.vue';
import MobilePanel from './components/MobilePanel.vue';
import ScanPanel from './components/ScanPanel.vue';

defineOptions({
  name: 'HSignIn',
  components: { HSignInLayout, account: AccountPanel, mobile: MobilePanel, scan: ScanPanel },
});

const application = useApplicationStore();
</script>
