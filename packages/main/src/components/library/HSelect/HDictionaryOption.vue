<template>
  <v-radio-group v-if="isShow" v-model="option" v-bind="$attrs" class="mb-4">
    <v-radio v-for="(option, index) in options" :key="index" :label="option.label" :value="option.value"></v-radio>
  </v-radio-group>
</template>

<script setup lang="ts">
import { useDictionary } from "@/composables/hooks";

defineOptions({ name: "HDictionaryOption" });

interface Props {
  dictionary: string;
  defaultValue?: string;
}

const props = defineProps<Props>();

const option = defineModel<string | undefined>({
  required: true,
});

const { options, isShow } = useDictionary(props.dictionary);

onMounted(() => {
  nextTick(() => {
    if (props.defaultValue && !option.value) {
      option.value = props.defaultValue;
    }
  });
});
</script>
