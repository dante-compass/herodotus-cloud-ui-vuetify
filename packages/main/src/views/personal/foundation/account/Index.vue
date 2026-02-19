<template>
  <div>
    <v-card class="mb-4">
      <v-card-item>
        <v-tabs v-model="tab" class="font-weight-bold">
          <v-tab text="账号信息" value="account"></v-tab>
          <v-tab text="实名认证" value="realname"></v-tab>
        </v-tabs>
      </v-card-item>
    </v-card>

    <v-tabs-window v-model="tab">
      <v-tabs-window-item value="account" class="py-2">
        <h-binding-table class="mb-4"></h-binding-table>
        <h-passkey-table></h-passkey-table>
      </v-tabs-window-item>
      <v-tabs-window-item value="realname" class="py-2">
        <v-card flat>
          <v-card-text>Lorem ipsum dolor sit amet consectetur adipisicing elit.</v-card-text>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </div>
</template>

<script setup lang="ts">
import { PAGE_NAME } from '@/configurations';

import { HBindingTable, HPasskeyTable } from './components';

defineOptions({ name: PAGE_NAME.FOUNDATION_ACCOUNT, components: { HBindingTable, HPasskeyTable } });

const tab = shallowRef('account');
</script>
