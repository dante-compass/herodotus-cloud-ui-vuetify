<template>
  <v-select
    v-model="selectedValue"
    :items="options"
    item-title="label"
    item-value="value"
    chips
    closable-chips
    v-bind="$attrs"
  ></v-select>
</template>

<script setup lang="ts">
import { useDictionary } from '@/composables/hooks';

defineOptions({ name: 'HDictionarySelect' });

interface Props {
  dictionary: string;
}
const props = defineProps<Props>();

const selectedValue = defineModel();

const { options } = useDictionary(props.dictionary);
</script>
