<template>
  <v-card>
    <v-card-title class="text-h6 text-md-h5 text-lg-h5 pt-4 pb-4"> 账号密码登录 </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-card>
        <v-card-text>
          <v-alert border="start" type="error" variant="outlined" density="compact">
            Duis arcu tortor, suscipit eget, imperdiet nec, imperdiet iaculis
          </v-alert>
          <v-text-field
            v-model="username"
            prepend-inner-icon="mdi-account"
            label="用户名"
            placeholder="请输入用户名"
            class="mt-6"
          ></v-text-field>
          <v-text-field
            v-model="password"
            prepend-inner-icon="mdi-lock-outline"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            placeholder="请输入密码"
            label="密码"
          ></v-text-field>
          <h-button label="登录" block></h-button>
          <h-text-divider label="OR"></h-text-divider>
          <h-button
            label="Passkey 快速登录"
            block
            tooltip="Passkey 仅在服务为 localhost 或者 https 形式下才能正常使用"
          ></h-button>
          <h-text-divider label="其它登录方式"></h-text-divider>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'AccountPanel' });

const username = shallowRef('');
const password = shallowRef('');
const visible = shallowRef(false);
</script>
