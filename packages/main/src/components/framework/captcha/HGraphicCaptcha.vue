<template>
  <v-row justify="center">
    <v-col cols="7"
      ><v-text-field
        v-model="code"
        id="captcha"
        label="验证码"
        name="captcha"
        color="primary"
        density="compact"
        variant="outlined"
        placeholder="点击图片刷新验证码"
        shaped
        clearable
        @keyup.delete="onClear()"
        @click:clear="onClear()"
        @blur.native.capture="verifyCaptcha()"
      >
        <template v-slot:append>
          <v-fade-transition>
            <v-icon v-if="isShowIcon" :icon="icon" :color="color"> </v-icon>
          </v-fade-transition>
        </template> </v-text-field
    ></v-col>
    <v-col cols="5">
      <v-card flat variant="outlined" height="40" @click="onRefresh()">
        <v-img :src="graphicImageBase64" cover :transition="false"></v-img> </v-card
    ></v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { GraphicCaptcha } from '@herodotus/framework';

import { CaptchaCategoryEnum, useCryptoStore, SecurityApiResources } from '@herodotus/framework';
import { VARIABLES } from '@/configurations';

defineOptions({
  name: 'HGraphicCaptcha',
});

const emit = defineEmits<{
  verify: [status: boolean];
}>();

const graphicImageBase64 = shallowRef('');
const code = shallowRef('');
const isShowIcon = shallowRef(false);
const icon = shallowRef('');
const color = shallowRef('');

const crypto = useCryptoStore();

const createCaptcha = async () => {
  const response = await SecurityApiResources.getInstance()
    .open()
    .createCaptcha(crypto.sessionId, VARIABLES.getCaptcha());

  if (
    !(
      VARIABLES.getCaptcha() === CaptchaCategoryEnum.JIGSAW &&
      VARIABLES.getCaptcha() === CaptchaCategoryEnum.WORD_CLICK
    )
  ) {
    const data = response.data as GraphicCaptcha;
    graphicImageBase64.value = data.graphicImageBase64;
  }
};

const emitVerify = (valid: boolean) => {
  emit('verify', valid);
};

const verifyCaptcha = () => {
  if (code.value) {
    SecurityApiResources.getInstance()
      .open()
      .verifyCaptcha(crypto.sessionId, VARIABLES.getCaptcha(), code.value)
      .then((response) => {
        const data = response.data as boolean;
        icon.value = 'mdi-check-circle';
        color.value = 'green';
        isShowIcon.value = true;
        emitVerify(true);
      })
      .catch((error) => {
        icon.value = 'mdi-close-circle';
        color.value = 'red';
        isShowIcon.value = true;
        emitVerify(false);
      });
  }
};

onMounted(() => {
  createCaptcha();
});

const onRefresh = () => {
  createCaptcha();
};

const onClear = () => {
  isShowIcon.value = false;
};
</script>
