<template>
  <h-center-layout-container
    :entity="editedItem"
    :title="title"
    :overlay="overlay"
    :operation="operation"
    @save="onSave()"
  >
    <v-form ref="certificateForm" validate-on="blur lazy">
      <v-text-field
        v-model="editedItem.alias"
        label="证书别名 *"
        placeholder="请输入证书别名 *"
        :rules="[(v: string) => !!v || '证书别名 *不能为空', (v: string) => isUniqueRule(v)]"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.commonName"
        label="公共名称(CN) *"
        placeholder="请输入公共名称(CN)"
        :rules="[(v: string) => !!v || '公共名称(CN)不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.organizationUnit"
        label="组织单位(OU) *"
        placeholder="请输入组织单位(OU)"
        :rules="[(v: string) => !!v || '组织单位(OU)不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.organization"
        label="组织(O) *"
        placeholder="请输入组织(O)"
        :rules="[(v: string) => !!v || '组织(O)不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.locality"
        label="位置或城市(L) *"
        placeholder="请输入位置或城市(L)"
        :rules="[(v: string) => !!v || '位置或城市(L)不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.stateOrProvince"
        label="州或省(ST) *"
        placeholder="请输入州或省(ST)"
        :rules="[(v: string) => !!v || '州或省(ST)不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.country"
        label="国家或地区(C) *"
        placeholder="请输入国家或地区(C)"
        :rules="[(v: string) => !!v || '国家或地区(C)不能为空']"
      ></v-text-field>
      <v-text-field
        v-model="editedItem.password"
        label="证书密码 *"
        placeholder="请输入证书密码(C)"
        :rules="[(v: string) => !!v || '证书密码(C)不能为空']"
      ></v-text-field>
      <h-dictionary-toggle
        class="mb-md"
        v-model="editedItem.certificateCategory"
        dictionary="CertificateCategory"
        default-value="ROOT_CA"
      ></h-dictionary-toggle>
      <v-select
        v-model="editedItem.parentId"
        :items="parentOptions"
        item-title="alias"
        item-value="certId"
        label="上级证书"
        chips
        closable-chips
        :loading="showParentLoading"
        :disabled="disableParentSelect"
        :readonly="disableParentSelect"
      ></v-select>
      <h-date-time
        v-model="editedItem.startTime"
        label="开始时间 *"
        placeholder="请输入开始时间"
        :rules="[(v: string) => !!v || '开始时间不能为空']"
      ></h-date-time>
      <h-date-time
        v-model="editedItem.endTime"
        label="结束时间 *"
        placeholder="请输入结束时间"
        :rules="[(v: string) => !!v || '结束时间不能为空']"
      ></h-date-time>
    </v-form>
  </h-center-layout-container>
</template>

<script setup lang="ts">
import type { MgtCertificateRequest, MgtCertificateResponse } from '@herodotus/api';

import { useTableItem } from '@/composables/hooks';
import { API } from '@/configurations';
import { isEmpty } from 'lodash-es';

defineOptions({ name: 'MgtCertificateContent' });

const certificateForm = ref();

const parentOptions = ref([]) as Ref<Array<MgtCertificateResponse>>;
const showParentLoading = ref(false);
const disableParentSelect = ref(true);

const { editedItem, operation, title, overlay, saveOrUpdate } = useTableItem<
  MgtCertificateRequest,
  MgtCertificateResponse
>(API.core.mgtCertificate());

const validateAlias = async (alias: string) => {
  return await new Promise((resolve, reject) => {
    if (alias) {
      API.core
        .mgtCertificate()
        .findByAlias(alias)
        .then((result) => {
          let cert = result.data as MgtCertificateResponse;
          // 如果能够查询到roleCode
          // 如果该roleCode 对应的 roleId 与当前 editedItem中的roleId相同
          // 则认为是编辑状态，而且employeeName 没有变化，那么就校验通过。
          // 目前能想到的解决新建空值、编辑是原值等校验问题的最优解
          resolve(isEmpty(cert));
        });
    } else {
      reject(false);
    }
  });
};

const isUniqueRule = (alias: string) => {
  return validateAlias(alias)
    .then((validate) => {
      if (validate) {
        return true;
      } else {
        return '证书别名已被占用，请改用其它证书别名';
      }
    })
    .catch(() => {
      return '后端服务暂时不可用';
    });
};

const loadOptionData = (category: string) => {
  showParentLoading.value = true;
  if (category) {
    API.core
      .mgtCertificate()
      .findAllByCertificateCategory(category)
      .then((result) => {
        if (result.data) {
          parentOptions.value = result.data;
        }
        showParentLoading.value = false;
        disableParentSelect.value = false;
      })
      .catch((error) => {
        showParentLoading.value = false;
        disableParentSelect.value = true;
      });
  }
};

watch(
  () => editedItem.value.certificateCategory,
  (newValue) => {
    if (newValue === 'ROOT_CA') {
      disableParentSelect.value = true;
      editedItem.value.parentId = '';
    } else {
      loadOptionData(newValue);
    }
  },
);

const onSave = async () => {
  const { valid } = await certificateForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
