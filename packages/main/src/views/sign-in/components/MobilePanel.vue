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
          v-model="mobile"
          tabindex="1"
          label="手机号码"
          placeholder="请输入手机号码"
          prepend-inner-icon="mdi-cellphone"
          clearable
          rounded="xl"
          variant="solo-filled"
          :disabled="isSubmittingProtected"
          :rules="[(v) => !!v || '手机号码不能为空，请输入手机号码！']"
          @change="onResetError()"
        ></v-text-field>
        <v-container class="px-0 pb-0">
          <v-row>
            <v-col cols="8"
              ><v-text-field
                v-model="verificationCode"
                tabindex="2"
                :rules="[(v) => !!v || '密码不能为空，请输入密码！']"
                label="手机验证码"
                placeholder="请先输入手机验证码"
                prepend-inner-icon="mdi-message-bulleted"
                clearable
                rounded="xl"
                variant="solo-filled"
                :disabled="isSubmittingProtected"
                @change="onResetError()"
              ></v-text-field
            ></v-col>
            <v-col cols="4">
              <h-button
                v-if="showPrompt"
                size="x-large"
                block
                :disabled="!mobile"
                @click="onGetVerificationCode()"
                >获取验证码</h-button
              >
              <h-button v-else size="x-large" disabled readonly block>{{ readSeconds }}</h-button>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
      <h-button
        tabindex="3"
        block
        class="mt-6"
        :disabled="isSubmittingProtected"
        @click="onShowCaptcha()"
        @keyup.enter="onShowCaptcha()"
        >登录</h-button
      >
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
        >Passkey 快速登录</h-button
      >

      <h-text-divider label="其它登录方式"></h-text-divider>

      <social-sign-in-list></social-sign-in-list>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { SecurityApiResources } from '@herodotus/framework';

import { useSignIn } from '@/composables/hooks';

import SocialSignInList from './SocialSignInList.vue';

defineOptions({ name: 'MobilePanel', components: { SocialSignInList } });

const loginForm = ref();

const { smsSignIn, passkeySignIn, onResetError, isSubmittingProtected, prompt, promptMessage } =
  useSignIn();

const mobile = shallowRef('');
const verificationCode = shallowRef('');
const TIME_COUNT = shallowRef(120);
const count = shallowRef();
const timer = ref(null) as Ref<NodeJS.Timeout | null>;
const isShowCaptcha = shallowRef(false);

const showPrompt = shallowRef(true);

const readSeconds = computed(() => {
  return count.value + ' 秒后获取';
});

//点击发送验证码
const onGetVerificationCode = () => {
  if (showPrompt.value) {
    SecurityApiResources.getInstance().open().createVerificationCode(mobile.value);
  }
  if (!timer.value) {
    count.value = TIME_COUNT.value;
    showPrompt.value = false;
    timer.value = setInterval(() => {
      if (count.value > 0 && count.value <= TIME_COUNT.value) {
        count.value--;
      } else {
        showPrompt.value = true;
        clearInterval(timer.value as NodeJS.Timeout);
        timer.value = null;
      }
    }, 1000);
  }
};

const onShowCaptcha = async () => {
  const { valid } = await loginForm.value.validate();
  if (valid) {
    isShowCaptcha.value = true;
  }
};

const onCaptchaVerify = ($event: boolean) => {
  if ($event) {
    isShowCaptcha.value = false;
    smsSignIn(mobile.value, verificationCode.value);
  }
};
</script>
