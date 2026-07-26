<template>
  <div>
    <h-label text="功能名称：" required></h-label>
    <v-text-field
      v-model="model.name"
      density="compact"
      placeholder="请输入您的功能名称"
      :rules="[(v: string) => !!v || '功能名称不能为空']"
    ></v-text-field>
    <h-label text="标识符：" required></h-label>
    <v-text-field
      v-model="model.identifier"
      density="compact"
      placeholder="请输入您的标识符"
      :rules="[
        (v: string) => !!v || '标识符不能为空',
        (v) => regexRule(v) || '标识符仅允许包含大小字母、数字、特称字符，至少5个字符，最多50个字符',
      ]"
    ></v-text-field>
  </div>
</template>

<script setup lang="ts">
import type { Characteristic, TslStatus } from '@herodotus/api';

defineOptions({ name: 'HCharacteristicPanel' });

interface Props {
  status?: TslStatus;
}

withDefaults(defineProps<Props>(), {
  status: 'create',
});

const model = defineModel<Characteristic>({
  default: () => ({}) as Characteristic,
});

const regexRule = (content: string) => {
  const regex = /^(?=.*[a-zA-Z])(?!.*\s).{5,50}$/;
  return regex.test(content);
};
</script>
