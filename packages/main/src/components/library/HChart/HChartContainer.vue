<template>
  <div ref="chartRef" :style="{ height: height, width: width }"></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';

defineOptions({ name: 'HChartContainer' });

interface Props {
  options: echarts.EChartsOption;
  width?: string;
  height?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '300px',
});

const chartRef = ref<HTMLElement>() as Ref<HTMLElement>;
const chart = ref<echarts.ECharts>() as Ref<echarts.ECharts>;
let originalAddEventListener: Function | null = null;

// 临时修复 mousewheel 事件监听器
const patchMouseWheelEvent = () => {
  originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function (
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ) {
    // 如果是 mousewheel 或 wheel 事件，确保 passive 为 true
    if (type === 'mousewheel' || type === 'wheel') {
      const patchedOptions =
        typeof options === 'boolean'
          ? { capture: options, passive: true }
          : options
            ? { ...options, passive: options.passive !== false }
            : { passive: true };

      return originalAddEventListener!.call(this, type, listener, patchedOptions);
    }
    return originalAddEventListener!.call(this, type, listener, options);
  };
};

// 恢复原始的事件监听器
const restoreMouseWheelEvent = () => {
  if (originalAddEventListener) {
    // @ts-ignore
    EventTarget.prototype.addEventListener = originalAddEventListener;
    originalAddEventListener = null;
  }
};

const initChart = () => {
  if (!chartRef.value) return;

  // 在初始化前应用补丁
  patchMouseWheelEvent();

  try {
    // 初始化图表
    chart.value = echarts.init(chartRef.value);
    chart.value.setOption(props.options);
  } finally {
    // 确保恢复原始函数
    restoreMouseWheelEvent();
  }
};

const setOptions = (options: echarts.EChartsOption) => {
  chart.value.setOption(options);
};

onMounted(() => {
  initChart();
});

onUnmounted(() => {
  if (chart.value) {
    chart.value.dispose();
  }
});

watch(
  () => props.options,
  (newValue) => {
    setOptions(newValue);
  },
  {
    deep: true,
  },
);
</script>
