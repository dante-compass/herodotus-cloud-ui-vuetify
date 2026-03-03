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
    >
      <img
        class="jigsaw-slider"
        :src="jigsawImage"
        :height="canvasHeight"
        :style="`transform:translateX(${styleWidth - sliderSize}px)`"
      />
    </h-behavior-captcha-background>
    <h-behavior-captcha-control description="拖动滑块完成拼图" :size="sliderSize">
      <div class="range-slider" ref="RangeSlider" :style="`width:${styleWidth}px`">
        <div
          :class="['range-btn', { isDown: isMouseDown }]"
          :style="`width:${sliderSize}px`"
          @mousedown="onRangeMouseDown($event)"
          @touchstart.passive="onRangeMouseDown($event)"
        >
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </h-behavior-captcha-control>
  </div>
</template>

<script setup lang="ts">
import type { JigsawCaptcha } from '@herodotus/framework';

import { useBehaviorCaptcha } from '@/composables/hooks';
import HBehaviorCaptchaBackground from './HBehaviorCaptchaBackground.vue';
import HBehaviorCaptchaControl from './HBehaviorCaptchaControl.vue';

defineOptions({
  name: 'HJigsawCaptcha',
  components: {
    HBehaviorCaptchaBackground,
    HBehaviorCaptchaControl,
  },
});

interface Props {
  schema: JigsawCaptcha;
  canvasWidth?: number;
  canvasHeight?: number;
  sliderSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  schema: () => ({}) as JigsawCaptcha,
  canvasWidth: 310,
  canvasHeight: 155,
  sliderSize: 30,
});

const emit = defineEmits<{
  verify: [status: boolean];
  reset: [];
}>();

const RangeSlider = ref<HTMLDivElement | null>(null);
// 后台生成的背景图Base64
const backgroundImageBase64 = shallowRef('');
// 后台生成的拼图滑块Base64
const jigsawImageBase64 = shallowRef('');
// 鼠标点下去时父级的width
const startWidth = shallowRef(50);
// 鼠标按下时的X
const startX = shallowRef(0);
// 鼠标当前的偏移X
const newX = shallowRef(0);
// 鼠标是否在按钮上按下
const isMouseDown = shallowRef(false);
// 为了解决Mac上的click BUG
const isCloseDown = shallowRef(false);

const { getImage, timeoutClear, message, canOperate, isLoading, isSuccess, isShowMessage, verifyCaptcha, reset } =
  useBehaviorCaptcha();

onMounted(() => {
  addEventListener();
});

onBeforeMount(() => {
  removeEventListener();
});

/**
 * 添加移动/结束事件监听
 */
const addEventListener = () => {
  document.addEventListener('mousemove', onRangeMouseMove, false);
  document.addEventListener('mouseup', onRangeMouseUp, false);
  document.addEventListener('touchmove', onRangeMouseMove, {
    passive: false,
  });
  document.addEventListener('touchend', onRangeMouseUp, false);
};

/**
 * 移除移动/结束事件监听
 */
const removeEventListener = () => {
  timeoutClear();
  // document.body.removeChild(this.$el);
  document.removeEventListener('mousemove', onRangeMouseMove, false);
  document.removeEventListener('mouseup', onRangeMouseUp, false);
  document.removeEventListener('touchmove', onRangeMouseMove, {
    capture: false,
  });
  document.removeEventListener('touchend', onRangeMouseUp, false);
};

watch(
  () => props.schema,
  (newValue) => {
    resetStatus();
    backgroundImageBase64.value = newValue.originalImageBase64;
    jigsawImageBase64.value = newValue.sliderImageBase64;
  },
);

/**
 * styleWidth是底部用户操作的滑块的父级，就是轨道在鼠标的作用下应该具有的宽度
 */
const styleWidth = computed(() => {
  const w = startWidth.value + newX.value - startX.value;
  return w < props.sliderSize ? props.sliderSize : w > props.canvasWidth ? props.canvasWidth : w;
});

const backgroundImage = computed(() => {
  return getImage(backgroundImageBase64.value);
});

const jigsawImage = computed(() => {
  return getImage(jigsawImageBase64.value);
});

// 鼠标按下准备拖动
const onRangeMouseDown = (e: any) => {
  if (canOperate) {
    isMouseDown.value = true;
    const slider = RangeSlider.value as HTMLDivElement;
    startWidth.value = slider.clientWidth;
    newX.value = e.clientX || e.changedTouches[0].clientX;
    startX.value = e.clientX || e.changedTouches[0].clientX;
  }
};

// 鼠标移动
const onRangeMouseMove = (e: any) => {
  if (isMouseDown.value) {
    e.preventDefault();
    newX.value = e.clientX || e.changedTouches[0].clientX;
  }
};

// 鼠标抬起
const onRangeMouseUp = () => {
  if (isMouseDown.value) {
    isMouseDown.value = false;
    verify();
  }
};

const verify = () => {
  verifyCaptcha(
    'JIGSAW',
    { x: newX.value - startX.value, y: 5 },
    () => {
      emit('verify', true);
    },
    () => {
      emit('verify', false);
      resetStatus();
      emit('reset');
    },
  );
};

const resetStatus = () => {
  reset();
  // 鼠标点下去时父级的width
  startWidth.value = props.sliderSize;
  // 鼠标按下时的X
  startX.value = 0;
  // 鼠标当前的偏移X
  newX.value = 0;
};
</script>

<style scoped lang="scss">
.jigsaw-slider {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 2;
}

.range-slider {
  position: absolute;
  height: 100%;
  width: 50px;
  background-color: rgba(106, 160, 255, 0.8);
  border-radius: 3px;
  .range-btn {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0;
    width: 50px;
    height: 100%;
    background-color: #fff;
    border-radius: 3px;
    box-shadow: 0 0 4px #ccc;
    cursor: pointer;
    & > div {
      width: 0;
      height: 40%;

      transition: all 200ms;
      &:nth-child(2) {
        margin: 0 4px;
      }
      border: solid 1px #6aa0ff;
    }
    &:hover,
    &.isDown {
      & > div:first-child {
        border: solid 4px transparent;
        height: 0;
        border-right-color: #6aa0ff;
      }
      & > div:nth-child(2) {
        border-width: 3px;
        height: 0;
        border-radius: 3px;
        margin: 0 6px;
        border-right-color: #6aa0ff;
      }
      & > div:nth-child(3) {
        border: solid 4px transparent;
        height: 0;
        border-left-color: #6aa0ff;
      }
    }
  }
}
</style>
