<template>
  <div class="canvas-background" :style="`height: ${canvasHeight}px`">
    <img
      :src="backgroundImage"
      :width="canvasWidth"
      :height="canvasHeight"
      :style="`width: ${canvasWidth}px; height: ${canvasHeight}px`"
    />
    <slot></slot>

    <h-behavior-captcha-feedback
      :canvas-width="canvasWidth"
      :canvas-height="canvasHeight"
      v-bind="$attrs"
    ></h-behavior-captcha-feedback>
  </div>
</template>

<script setup lang="ts">
import HBehaviorCaptchaFeedback from './HBehaviorCaptchaFeedback.vue';

defineOptions({
  name: 'HBehaviorCaptchaBackground',
  components: {
    HBehaviorCaptchaFeedback,
  },
});

interface Props {
  backgroundImage: string;
  // 主canvas的宽
  canvasWidth: number;
  // 主canvas的高
  canvasHeight: number;
}

withDefaults(defineProps<Props>(), {
  canvasWidth: 310,
  canvasHeight: 155,
});
</script>

<style lang="scss" scoped>
.canvas-background {
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}
</style>
