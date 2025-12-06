<template>
  <div>
    <h-behavior-captcha-background
      :background-image="backgroundImage"
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      :loading="isLoading"
      :success="isSuccess"
      :show-message="isShowMessage"
      :message="message"
      @click="canOperate ? onWordClick($event) : ''"
    >
      <div
        v-for="(coordinate, index) in flagCoordinate"
        :key="index"
        :style="{
          position: 'absolute',
          'z-index': 9999,
          width: '25px',
          height: '25px',
          border: '3px solid #fff',
          color: '#fff',
          'background-color': '#0D47A1',
          'font-size': '14px',
          'text-align': 'center',
          'line-height': '18px',
          'border-radius': '50%',
          'box-sizing': 'border-box',
          'box-shadow': '0 0 10px black',
          top: coordinate.y - 10 + 'px',
          left: coordinate.x - 10 + 'px',
        }"
      >
        {{ index + 1 }}
      </div>
    </h-behavior-captcha-background>

    <h-behavior-captcha-control
      description="请顺序点选"
      :size="sliderSize"
      :prompt="prompt"
    ></h-behavior-captcha-control>
  </div>
</template>

<script setup lang="ts">
import type { WordClickCaptcha, Coordinate } from '@herodotus/framework';

import { useBehaviorCaptcha } from '@/composables/hooks';
import HBehaviorCaptchaBackground from './HBehaviorCaptchaBackground.vue';
import HBehaviorCaptchaControl from './HBehaviorCaptchaControl.vue';

defineOptions({
  name: 'HWordClickCaptcha',
  components: {
    HBehaviorCaptchaBackground,
    HBehaviorCaptchaControl,
  },
});

interface Props {
  schema: WordClickCaptcha;
  canvasWidth?: number;
  canvasHeight?: number;
  sliderSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  schema: () => ({}) as WordClickCaptcha,
  canvasWidth: 310,
  canvasHeight: 155,
  sliderSize: 30,
});

const emit = defineEmits<{
  verify: [status: boolean];
  reset: [];
}>();

const backgroundImageBase64 = shallowRef('');
// 默认需要点击的字数
const verifyWordCount = shallowRef(3);
const prompt = shallowRef('');
const flagCoordinate = ref([]) as Ref<Array<Coordinate>>;
// 用户点击的坐标
const verifyCoordinate = ref([]) as Ref<Array<Coordinate>>;
// 点击的记数;
const clickWordCount = shallowRef(0);

watch(
  () => props.schema,
  (newValue) => {
    resetStatus();
    backgroundImageBase64.value = newValue.wordClickImageBase64;
    verifyWordCount.value = newValue.wordsCount;
    prompt.value = newValue.words;
    clickWordCount.value = 0;
  },
  {
    immediate: true,
  },
);

const { getImage, message, canOperate, isLoading, isSuccess, isShowMessage, verifyCaptcha, reset } =
  useBehaviorCaptcha();

const resetStatus = () => {
  reset();
  flagCoordinate.value = [];
  verifyCoordinate.value = [];
  clickWordCount.value = 0;
};

const backgroundImage = computed(() => {
  return getImage(backgroundImageBase64.value);
});
// 获取坐标
const getMouseCoordinate = (e: any) => {
  var x = e.offsetX;
  var y = e.offsetY;
  return { x, y };
};

const onWordClick = (e: any) => {
  let coordinate = getMouseCoordinate(e);
  if (clickWordCount.value <= verifyWordCount.value) {
    verifyCoordinate.value.push(coordinate);
    flagCoordinate.value.push(coordinate);
    clickWordCount.value = ++clickWordCount.value;
  }

  if (clickWordCount.value === verifyWordCount.value) {
    verify();
  }
};

const verify = () => {
  verifyCaptcha(
    'WORD_CLICK',
    verifyCoordinate.value,
    () => {
      flagCoordinate.value = [];
      emit('verify', true);
    },
    () => {
      flagCoordinate.value = [];
      emit('verify', false);
      resetStatus();
      emit('reset');
    },
  );
};
</script>
