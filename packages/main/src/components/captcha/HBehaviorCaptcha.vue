<template>
  <v-dialog v-model="dialog" width="auto">
    <v-card>
      <v-toolbar density="compact" class="pa-0">
        <v-spacer></v-spacer>
        <v-btn icon size="x-small" class="mr-2" @click="onReset()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
        <v-btn icon size="x-small" class="mr-2" @click="dialog = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container fluid class="pt-0">
        <v-row>
          <v-col>
            <v-card class="pa-2">
              <component
                :is="type"
                :schema="schema"
                :canvas-width="canvasWidth"
                :canvas-height="canvasHeight"
                :slider-size="sliderDisplaySize"
                @reset="onReset()"
                @verify="onVerify($event)"
              ></component>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import HJigsawCaptcha from './HJigsawCaptcha.vue';
import HWordClickCaptcha from './HWordClickCaptcha.vue';

import { useBehaviorCaptcha } from '@/composables/hooks';

defineOptions({
  name: 'HBehaviorCaptcha',
  components: {
    WORD_CLICK: HWordClickCaptcha,
    JIGSAW: HJigsawCaptcha,
  },
});

interface Props {
  type?: 'JIGSAW' | 'WORD_CLICK';
  canvasWidth?: number;
  canvasHeight?: number;
  sliderSize?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'JIGSAW',
  canvasWidth: 310,
  canvasHeight: 155,
  sliderSize: 30,
});

const dialog = defineModel({
  type: Boolean,
});

const emit = defineEmits<{
  verify: [status: boolean];
}>();

const { fetchCaptcha, canOperate, schema } = useBehaviorCaptcha();

const init = () => {
  fetchCaptcha(props.type);
};

const onVerify = ($event: boolean) => {
  emit('verify', $event);
};

const onReset = () => {
  canOperate.value = false;
  init();
};

watch(
  dialog,
  (newValue) => {
    if (newValue) {
      init();
    }
  },
  {
    immediate: true,
  },
);

/**
 * 处理一下sliderSize，弄成整数，以免计算有偏差
 */
const sliderDisplaySize = computed(() => {
  return Math.max(Math.min(Math.round(props.sliderSize), Math.round(props.canvasWidth * 0.5)), 10);
});
</script>
