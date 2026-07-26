<template>
  <div>
    <h-label text="布尔值" required></h-label>
    <v-text-field
      v-model="model.dataType.specs['0']"
      density="compact"
      placeholder="如：关"
      :disabled="disabled"
      :rules="[(v: string) => !!v || '布尔值不能为空']"
    >
      <template #prepend>
        <div class="text-subtitle1">{{ ' 0 - ' }}</div>
      </template>
    </v-text-field>
    <v-text-field
      v-model="model.dataType.specs['1']"
      density="compact"
      placeholder="如：开"
      :disabled="disabled"
      :rules="[(v: string) => !!v || '布尔值不能为空']"
    >
      <template #prepend>
        <div class="text-subtitle1">{{ ' 1 - ' }}</div>
      </template>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import type { TslStatus, Specification, BoolSpecs } from '@herodotus/api';

import { useTslStatus } from '../../composables/hooks';

import { HDictionarySelect } from '@/components/library/HDictionary';

defineOptions({ name: 'HArgumentBoolPanel', components: { HDictionarySelect } });

interface Props {
  status?: TslStatus;
}

const props = withDefaults(defineProps<Props>(), {
  status: 'create',
});

const model = defineModel<Specification<BoolSpecs>>({
  default: () => ({}) as Specification<BoolSpecs>,
});

const { disabled } = useTslStatus(props.status);
</script>
