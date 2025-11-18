<template>
  <v-card class="px-12" flat>
    <v-card-text class="ma-4">
      <v-alert
        v-if="prompt"
        border="start"
        type="error"
        variant="outlined"
        density="compact"
        class="mb-4"
      >
        {{ promptMessage }}
      </v-alert>
      <v-form ref="loginForm">
        <v-text-field
          v-model="username"
          tabindex="1"
          label="用户名"
          placeholder="请输入用户名"
          prepend-inner-icon="mdi-account"
          clearable
          rounded="xl"
          variant="solo-filled"
          autocomplete="username"
          :rules="[(v) => !!v || '用户名不能为空，请输入用户名！']"
          :disabled="isSubmittingProtected"
          @change="onResetError()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          tabindex="2"
          class="mt-4"
          label="密码"
          placeholder="请输入密码"
          prepend-inner-icon="mdi-lock-outline"
          clearable
          rounded="xl"
          variant="solo-filled"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :rules="[(v) => !!v || '密码不能为空，请输入密码！']"
          :disabled="isSubmittingProtected"
          autocomplete="password"
          @change="onResetError()"
        ></v-text-field>
      </v-form>
      <h-button
        tabindex="3"
        block
        class="mt-6"
        :disabled="isSubmittingProtected"
        @click="onShowCaptcha()"
        @keyup.enter="onShowCaptcha()"
      >
        登录
      </h-button>
      <h-behavior-captcha
        v-model="isShowCaptcha"
        @verify="onCaptchaVerify($event)"
      ></h-behavior-captcha>

      <h-text-divider label="OR"></h-text-divider>

      <h-button
        tabindex="4"
        block
        tooltip="Passkey 仅在服务为 localhost 或者 https 形式下才能正常使用"
        :disabled="isSubmittingProtected"
        @click="passkeySignIn()"
        @keyup.enter="passkeySignIn()"
      >
        Passkey 快速登录
      </h-button>
      <h-text-divider label="其它登录方式"></h-text-divider>

      <social-sign-in-list></social-sign-in-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import SocialSignInList from './SocialSignInList.vue';

import { useSignIn } from '@/composables/hooks';

defineOptions({ name: 'AccountPanel', components: { SocialSignInList } });

const loginForm = ref();

const {
  passwordSignIn,
  passkeySignIn,
  onResetError,
  isSubmittingProtected,
  prompt,
  promptMessage,
} = useSignIn();

const username = shallowRef('');
const password = shallowRef('');
const isShowCaptcha = shallowRef(false);
const visible = shallowRef(false);

const onCaptchaVerify = ($event: boolean) => {
  if ($event) {
    isShowCaptcha.value = false;
    passwordSignIn(username.value, password.value);
  }
};

const onShowCaptcha = async () => {
  const { valid } = await loginForm.value.validate();
  if (valid) {
    isShowCaptcha.value = true;
  }
};

const enterKey = (e: any) => {
  // 回车则执行登录方法 enter键的ASCII是13
  if (e.keyCode == 13 || e.keyCode == 100) {
    onShowCaptcha(); // 定义的登录方法
  }
};

onMounted(() => {
  window.addEventListener('keydown', (e) => enterKey(e));
});

onUnmounted(() => {
  window.removeEventListener('keydown', (e) => enterKey(e), false);
});
</script>
