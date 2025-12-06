<template>
  <h-authorize-layout :title="title">
    <v-container>
      <v-row>
        <v-col cols="2"></v-col>
        <v-col cols="8">
          <v-form ref="applicationForm" validate-on="blur lazy">
            <v-text-field
              v-model.lazy="editedItem.applicationName"
              label="应用名称 * "
              placeholder="请输入应用名称"
              :rules="[
                (v: string) => !!v || '用户名不能为空',
                (v: string) => (v && v.length >= 5) || '用户名至少5个字符',
              ]"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.abbreviation"
              label="应用简称(可选)"
              placeholder="请输入应用简称"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.logo"
              label="应用图标(可选)"
              placeholder="请输入应用图标"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.homepage"
              label="应用主页(可选)"
              placeholder="请输入应用主页"
            ></v-text-field>
            <h-dictionary-select
              v-model="editedItem.applicationType"
              dictionary="ApplicationType"
              label="应用类型"
            ></h-dictionary-select>
            <h-dictionary-select
              v-model="editedItem.authorizationGrantTypes"
              dictionary="GrantType"
              label="认证模式 * "
              placeholder="请选择认证模式，可以多个"
              multiple
              :rules="[(v: string) => !!(v && v.length > 0) || '认证模式不能为空']"
            ></h-dictionary-select>
            <h-dictionary-select
              v-model="editedItem.clientAuthenticationMethods"
              dictionary="AuthenticationMethod"
              label="客户端验证模式 * "
              placeholder="请选择客户端验证模式，可以多个"
              multiple
              :rules="[(v: string) => !!(v && v.length > 0) || '客户端验证模式不能为空']"
            ></h-dictionary-select>

            <v-text-field
              v-model="editedItem.redirectUris"
              label="回调地址(可多个逗号分隔)"
              placeholder="请输入回调地址"
              :rules="[(v: string) => !!v || '回调地址不能为空']"
            ></v-text-field>
            <v-text-field
              v-model="editedItem.postLogoutRedirectUris"
              label="OIDC Logout 回调地址(可多个逗号分隔)"
              placeholder="请输入OIDC Logout 回调地址"
            ></v-text-field>
            <h-text-divider label="客户端设置"></h-text-divider>

            <v-switch
              v-model="editedItem.requireProofKey"
              label="是否需要 Proof Key"
              hide-details
            ></v-switch>
            <v-switch
              v-model="editedItem.requireAuthorizationConsent"
              label="是否需要认证确认"
              hide-details
            ></v-switch>
            <v-text-field
              v-model="editedItem.jwkSetUrl"
              label="客户端密钥集URL"
              placeholder="请输入客户端密钥集URL"
              class="mt-2"
            ></v-text-field>
            <v-select
              v-if="isShowAuthenticationSigningAlgorithm"
              v-model="editedItem.authenticationSigningAlgorithm"
              :options="authenticationSigningAlgorithmItem"
              label="令牌端点认证签名算法"
            ></v-select>
            <h-text-divider label="令牌设置"></h-text-divider>
            <h-setting-label title="令牌有效期"></h-setting-label>
            <h-duration v-model="editedItem.accessTokenTimeToLive" label="令牌有效期"></h-duration>
            <h-setting-label title="刷新令牌有效期"></h-setting-label>
            <h-duration
              v-model="editedItem.refreshTokenTimeToLive"
              label="刷新令牌有效期"
            ></h-duration>
            <h-setting-label title="授权码有效期"></h-setting-label>
            <h-duration
              v-model="editedItem.authorizationCodeTimeToLive"
              label="授权码有效期"
            ></h-duration>
            <h-setting-label title="设备激活码有效期"></h-setting-label>
            <h-duration
              v-model="editedItem.deviceCodeTimeToLive"
              label="设备激活码有效期"
            ></h-duration>
            <v-switch
              v-model="editedItem.reuseRefreshTokens"
              label="是否允许重用刷新令牌"
            ></v-switch>
            <h-dictionary-select
              v-model="editedItem.idTokenSignatureAlgorithmJwsAlgorithm"
              dictionary="SignatureJwsAlgorithm"
              label="OIDC idToken 端点认证签名算法"
            ></h-dictionary-select>
            <h-text-divider label="数据条目设置"></h-text-divider>
            <v-text-field
              v-model="editedItem.description"
              label="备注"
              placeholder="请输入备注"
            ></v-text-field>
            <v-text-field
              v-model.number="editedItem.ranking"
              label="排序值"
              placeholder="请输入排序值"
              type="number"
            />
            <h-dictionary-select
              v-model="editedItem.status"
              dictionary="DataItemStatus"
              label="数据状态"
            ></h-dictionary-select>
            <v-divider></v-divider>
            <v-switch v-model="editedItem.reserved" label="是否为保留数据"></v-switch>
            <div>
              <h-button color="red" @click="onFinish()">取消</h-button>
              <h-button class="ml-2" @click="onSave()">保存</h-button>
            </div>
          </v-form>
        </v-col>
        <v-col cols="2"></v-col>
      </v-row>
    </v-container>
    <template #right>
      <v-text-field
        v-if="isEdit"
        v-model="editedItem.clientId"
        label="Client Id"
        disabled
      ></v-text-field>
      <v-text-field
        v-if="isEdit"
        v-model="editedItem.clientSecret"
        label="Client Secret"
        disabled
      ></v-text-field>

      <v-data-table-server
        v-model="editedItem.scopes"
        v-model:items-per-page="pageSize"
        v-model:page="pageNumber"
        :items-length="totalItems"
        :headers="headers"
        :items="tableRows"
        item-value="scopeId"
        item-selectable="scopeId"
        :loading="loading"
        show-select
        select-strategy="page"
        striped="even"
        hover
        hide-default-footer
        disable-sort
        return-object
        @update:options="findItems"
      ></v-data-table-server>
    </template>
  </h-authorize-layout>
</template>

<script setup lang="ts">
import type {
  OAuth2ApplicationEntity,
  OAuth2ScopeEntity,
  OAuth2ScopeConditions,
} from '@herodotus/api';
import type { VDataTableHeaders } from '@/composables/declarations';

import { useEditFinish } from '@herodotus/framework';
import { includes } from 'lodash-es';
import { useDictionary, useTableItem, useTable } from '@/composables/hooks';
import { API, PAGE_NAME } from '@/configurations';

defineOptions({ name: 'OAuth2ApplicationContent' });

const { editedItem, isEdit, title, overlay, saveOrUpdate } = useTableItem<OAuth2ApplicationEntity>(
  API.core.oauth2Application(),
);
const { tableRows, loading, pageNumber, pageSize, totalItems, findItems } = useTable<
  OAuth2ScopeEntity,
  OAuth2ScopeConditions
>(API.core.oauth2Scope(), PAGE_NAME.OAUTH2_SCOPE, true);

const headers = ref([
  { key: 'scopeCode', align: 'center', title: '范围代码' },
  { key: 'scopeName', align: 'center', title: '范围名称' },
  { key: 'description', align: 'center', title: '说明' },
]) as Ref<Array<VDataTableHeaders>>;

const { options } = useDictionary('AllJwsAlgorithm');
const { onFinish } = useEditFinish();

const applicationForm = ref();

const includePrivateKeyJwt = () => {
  return includes(editedItem.value.clientAuthenticationMethods, 'private_key_jwt');
};

const includeClientSecretJwt = () => {
  return includes(editedItem.value.clientAuthenticationMethods, 'client_secret_jwt');
};

const onlyHasPrivateKeyJwt = () => {
  return includePrivateKeyJwt() && !includeClientSecretJwt();
};

const onlyHasClientSecretJwt = () => {
  return !includePrivateKeyJwt() && includeClientSecretJwt();
};

/**
 * 参见后端 SAS ： JwtClientAssertionAuthenticationProvider
 * 1. 只有当客户端配置了 urn:ietf:params:oauth:client-assertion-type:jwt-bearer 认证模式时，配置 private_key_jwt 或 client_secret_jwt 才有意义。
 * 2. private_key_jwt 是针对 签名算法 client_secret_jwt 是针对 mac 算法。
 */
const isShowAuthenticationSigningAlgorithm = computed(() => {
  return includePrivateKeyJwt() || includeClientSecretJwt();
});

const authenticationSigningAlgorithmItem = computed(() => {
  if (onlyHasPrivateKeyJwt()) {
    if (options.value) {
      return options.value.filter((item) => item.ordinal < 9);
    }
  }

  if (onlyHasClientSecretJwt()) {
    if (options.value) {
      return options.value.filter((item) => item.ordinal < 9);
    }
  }

  return options.value;
});

const onSave = async () => {
  const { valid } = await applicationForm.value.validate();
  if (valid) {
    saveOrUpdate();
  }
};
</script>
