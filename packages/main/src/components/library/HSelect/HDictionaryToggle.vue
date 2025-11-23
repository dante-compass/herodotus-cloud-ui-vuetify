<template>
  <v-btn-toggle
    v-if="isShow"
    v-model="toggle"
    :mandatory="isMandatory"
    v-bind="$attrs"
    border
    divided
    density="comfortable"
    class="mb-4"
  >
    <v-btn
      v-for="(option, index) in options"
      :key="index"
      :text="option.label"
      :value="option.name"
    ></v-btn>
  </v-btn-toggle>
</template>

<script setup lang="ts">
import { useDictionary } from '@/composables/hooks';

defineOptions({ name: 'HToggleField' });

interface Props {
  dictionary: string;
  defaultValue?: string;
}

const props = defineProps<Props>();

const toggle = defineModel<string | undefined>({
  required: true,
});

const { options, isShow } = useDictionary(props.dictionary);

const isMandatory = computed(() => {
  return props.defaultValue ? true : false;
});

onMounted(() => {
  nextTick(() => {
    if (props.defaultValue && !toggle.value) {
      toggle.value = props.defaultValue;
    }
  });
});
</script>
