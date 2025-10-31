<template>
  <v-card class="px-12" flat>
    <v-card-text>
      <v-card variant="tonal" rounded="xl" class="mx-auto" max-width="400">
        <v-tabs align-tabs="center" fixed-tabs>
          <v-tab>账号密码登录</v-tab>
          <v-tab>手机短信登录</v-tab>
        </v-tabs>
      </v-card>
    </v-card-text>
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
          label="用户名"
          placeholder="请输入用户名"
          prepend-inner-icon="mdi-account"
          clearable
          rounded="xl"
          :rules="[(v) => !!v || '用户名不能为空，请输入用户名！']"
          :disabled="isDisabled"
          tabindex="1"
          @change="onResetError()"
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="密码"
          placeholder="请输入密码"
          prepend-inner-icon="mdi-lock-outline"
          clearable
          rounded="xl"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          :rules="[(v) => !!v || '密码不能为空，请输入密码！']"
          :disabled="isDisabled"
          tabindex="2"
          class="mt-4"
          @change="onResetError()"
        ></v-text-field>
      </v-form>
      <h-button
        tabindex="3"
        block
        @click="onShowCaptcha()"
        @keyup.enter="onShowCaptcha()"
        class="mt-6"
        >登录</h-button
      >
      <h-behavior-captcha
        v-model="isShowCaptcha"
        @verify="onCaptchaVerify($event)"
      ></h-behavior-captcha>
      <h-text-divider label="OR"></h-text-divider>
      <h-button
        block
        tooltip="Passkey 仅在服务为 localhost 或者 https 形式下才能正常使用"
        tabindex="4"
        @click="passkeySignIn()"
        @keyup.enter="passkeySignIn()"
        >Passkey 快速登录</h-button
      >
      <h-text-divider label="其它登录方式"></h-text-divider>
      <social-sign-in-list></social-sign-in-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import SocialSignInList from './SocialSignInList.vue';

import { useRouter } from 'vue-router';
import { toast } from '@herodotus/core';
import {
  useApplicationStore,
  useAuthenticationStore,
  useCryptoStore,
  usePasskey,
} from '@herodotus/framework';
import { DEAULT_ROUTER_LINK } from '@/configurations';

defineOptions({ name: 'AccountPanel', components: { SocialSignInList } });

const loginForm = ref();

const username = shallowRef('');
const password = shallowRef('');
const isShowCaptcha = shallowRef(false);
const isSubmitDisabled = shallowRef(false);
const errorMessage = shallowRef('');
const hasError = shallowRef(false);
const visible = shallowRef(false);

const application = useApplicationStore();
const authentication = useAuthenticationStore();
const crypto = useCryptoStore();

const router = useRouter();
const { authenticator } = usePasskey();

const signIn = async () => {
  isSubmitDisabled.value = true;

  authentication
    .signIn(username.value, password.value)
    .then((response) => {
      if (response) {
        isSubmitDisabled.value = false;
        toast.success('欢迎回来！');
        router.push({
          path: DEAULT_ROUTER_LINK.home.path,
        });
      }
    })
    .catch((error) => {
      isSubmitDisabled.value = false;
      if (error.message) {
        errorMessage.value = error.message;
        hasError.value = true;
      }
    });
};

const passkeySignIn = () => {
  isSubmitDisabled.value = true;

  authenticator()
    .then((response) => {
      if (response) {
        isSubmitDisabled.value = false;
        toast.success('欢迎回来！');
        router.push({
          path: DEAULT_ROUTER_LINK.home.path,
        });
      }
    })
    .catch((error) => {
      isSubmitDisabled.value = false;
      if (error.message) {
        errorMessage.value = error.message;
        hasError.value = true;
      }
    });
};

const prompt = computed(() => {
  return authentication.remainTimes !== 0 && hasError.value;
});

const promptMessage = computed(() => {
  return '您还有【' + authentication.remainTimes + '】次尝试机会，之后将会锁定该账户';
});

const isDisabled = computed(() => {
  return crypto.sessionId ? false : true;
});

const onCaptchaVerify = ($event: boolean) => {
  if ($event) {
    isShowCaptcha.value = false;
    signIn();
  }
};

const onResetError = () => {
  errorMessage.value = '';
  hasError.value = false;
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
