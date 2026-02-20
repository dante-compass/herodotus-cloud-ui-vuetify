<template>
  <h-dialog v-model="openDialog" prepend-icon="mdi-key-chain" :title="`设置/修改【${username}】密码`" @confirm="onSave">
    <v-form ref="changePasswordForm">
      <v-text-field
        v-model="newPassword"
        label="新密码"
        placeholder="请输入新密码"
        clearable
        density="compact"
        class="mt-2"
        :append-inner-icon="newPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="newPasswordVisible ? 'text' : 'password'"
        :rules="[
          (v) => !!v || '新密码不能为空，请输入新密码！',
          (v) => regxRule(v) || '密码中必须包含大小字母、数字、特称字符，至少8个字符，最多30个字符',
        ]"
      ></v-text-field>
      <v-text-field
        v-model="confirmPassword"
        label="确认密码"
        placeholder="请再次输入新密码"
        clearable
        :append-inner-icon="confirmPasswordVisible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="confirmPasswordVisible ? 'text' : 'password'"
        density="compact"
        class="mt-2"
        :rules="[
          (v) => !!v || '确认密码不能为空，请输入确认密码！',
          (v) => regxRule(v) || '密码中必须包含大小字母、数字、特称字符，至少8个字符，最多30个字符',
          (v) => sameAs(v) || '两次输入密码不一致',
        ]"
      ></v-text-field>
    </v-form>
  </h-dialog>
</template>

<script setup lang="ts">
import { useCryptoStore } from '@herodotus/framework';
import { toast } from '@herodotus/core';
import { VARIABLES, API } from '@/configurations';

defineOptions({ name: 'ChangePassoword' });

interface Props {
  userId: string;
  username: string;
}

const props = defineProps<Props>();

const openDialog = defineModel({
  type: Boolean,
  default: false,
  required: true,
});

const crypto = useCryptoStore();

const changePasswordForm = ref();

const newPassword = shallowRef('');
const confirmPassword = shallowRef('');
const newPasswordVisible = shallowRef(false);
const confirmPasswordVisible = shallowRef(false);
const loading = shallowRef(false);

const regxRule = (content: string) => {
  const regx = /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,25}/;
  return regx.test(content);
};

const sameAs = (value: string) => {
  return value === newPassword.value;
};

const onSave = async () => {
  const { valid } = await changePasswordForm.value.validate();
  if (valid) {
    loading.value = true;
    const password = VARIABLES.isUseCrypto() ? crypto.encrypt(confirmPassword.value) : confirmPassword.value;
    API.core
      .sysUser()
      .changePassword(props.userId, password)
      .then((response) => {
        if (response) {
          loading.value = false;
          openDialog.value = false;
          toast.success('设置/修改密码成功！');
        }
      })
      .catch((error) => {
        loading.value = false;
        openDialog.value = false;
        toast.error('设置/修改密码失败！');
      });
  }
};

watch(openDialog, (newValue) => {
  if (!newValue) {
    newPassword.value = '';
    confirmPassword.value = '';
    newPasswordVisible.value = false;
    confirmPasswordVisible.value = false;
    loading.value = false;
  }
});
</script>
