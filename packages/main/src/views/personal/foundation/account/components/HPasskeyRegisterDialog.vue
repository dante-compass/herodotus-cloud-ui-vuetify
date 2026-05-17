<template>
  <h-dialog
    v-model="model"
    prepend-icon="mdi-calendar-today"
    title="注册通行密钥"
    :loading="loading"
    confirm-label="注册"
    @confirm="onSave"
  >
    <v-form ref="passkeyRegisterForm">
      <v-text-field
        v-model="label"
        label="标签 *"
        placeholder="请输入标签"
        clearable
        density="compact"
        class="mt-2"
        :rules="[(v) => !!v || '标签不能为空，请输入标签！']"
      ></v-text-field>
    </v-form>
  </h-dialog>
</template>

<script setup lang="ts">
import { usePasskey } from "@herodotus/framework";

defineOptions({ name: "HPasskeyRegisterDialog" });

const model = defineModel<boolean>({
  default: false,
  required: true,
});

const emit = defineEmits<{
  save: [];
}>();

const passkeyRegisterForm = ref();

const label = shallowRef("");
const loading = shallowRef(false);

const { registration } = usePasskey();

const onSave = async () => {
  const { valid } = await passkeyRegisterForm.value.validate();

  if (valid) {
    loading.value = true;
    registration(label.value).then(() => {
      model.value = false;
      emit("save");
    });
  }
};

// 每次打开对话框时重置
watch(model, (newValue) => {
  if (newValue) {
    label.value = "";
    loading.value = false;
  }
});
</script>
