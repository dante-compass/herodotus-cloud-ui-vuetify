<template>
  <v-row>
    <v-col cols="9">
      <v-stepper v-model="step" :items="items" show-actions>
        <template #item.1>
          <h-testing-content-card
            flat
            border="dashed md"
            title="产品登录（使用“父”客户端获取 Token）"
            text="OAuth2 客户端动态注册需要有一个“父”客户端，用该获取 AccessToken后，才可以进行动态注册 "
          >
            <v-text-field v-model="productKey" label="Product Key" required></v-text-field>
            <v-text-field v-model="productSecret" label="Product Secret" required></v-text-field>
            <v-btn
              color="purple"
              text="验证产品信息"
              variant="flat"
              size="large"
              width="200px"
              @click="onInitialAccessToken"
            ></v-btn>
          </h-testing-content-card>
          <h-testing-content-card
            flat
            border="dashed md"
            title="验证结果："
            text="是否能够获取 Access Token"
            class="mt-4"
          >
            <v-text-field v-model="productAccessToken" label="Access Token" disabled></v-text-field>
          </h-testing-content-card>
        </template>
        <template #item.2>
          <h-testing-content-card
            flat
            border="dashed md"
            title="基于 OAuth2.0 协议的动态注册客户端"
            text="使用 OAuth2.0 协议标准的方式进行客户端动态注册，注册成功后会返回新注册客户的 ClientId 和 ClientSecret。相关方法设置了部分默认参数，如需修改需要自己改造请求方法"
          >
            <v-btn
              color="purple"
              text="客户端动态注册"
              variant="flat"
              size="large"
              width="200px"
              @click="onDynamicRegistration"
            ></v-btn>
          </h-testing-content-card>
          <h-testing-content-card
            flat
            border="dashed md"
            title="注册结果"
            subtitle="新注册客户端的 ClientId 和 ClientSecret"
            class="mt-4"
          >
            <v-text-field
              v-model="deviceName"
              label="Device Name(新注册的 Client ID)"
              disabled
              class="mt-4"
            ></v-text-field>
            <v-text-field
              v-model="deviceSecret"
              label="Device Secret（新注册的 Client Secret）"
              disabled
            ></v-text-field>
          </h-testing-content-card>
        </template>
        <template #item.3>
          <h-testing-content-card
            title="第三步：验证新客户端"
            text="使用新客户端的 ClientId 和 ClientSecret 获取 AccessToken"
          >
            <v-text-field
              v-model="deviceName"
              label="Device Name(新注册的 Client ID)"
              disabled
              class="mt-4"
            ></v-text-field>
            <v-text-field
              v-model="deviceSecret"
              label="Device Secret（新注册的 Client Secret）"
              disabled
            ></v-text-field>
            <v-btn
              color="purple"
              text="验证客户端登录"
              variant="flat"
              size="large"
              width="200px"
              @click="onNewClientSignIn"
            ></v-btn>
          </h-testing-content-card>

          <h-testing-content-card title="验证结果：" subtitle="是否能够获取 Access Token" class="mt-4">
            <v-text-field v-model="deviceAccessToken" label="Access Token" disabled></v-text-field>
          </h-testing-content-card>
        </template>
      </v-stepper>
    </v-col>
    <v-col cols="3">
      <h-testing-http-response v-model="responseResults"></h-testing-http-response>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import type { AccessTokenResponse } from '@herodotus/core';

import { BuildInScopeEnum } from '@herodotus/core';
import { SecurityApiResources, useAuthenticationStore } from '@herodotus/framework';

import { HTesingContentCard, HTestingHttpResponse, HTestingHttpResponseLayout } from '../../components';

defineOptions({
  name: 'HDeviceRegistration',
  components: { HTesingContentCard, HTestingHttpResponse, HTestingHttpResponseLayout },
});

const step = shallowRef(1);
const items = ['第一步：验证产品信息', '第二步：设备动态注册', '第三步：验证新客户端'];

const responseResults = shallowRef({});

const productKey = shallowRef('apktestadd');
const productSecret = shallowRef('9f3026f4beddf8d29f3026f4beddf8d2');
const productAccessToken = shallowRef('');
const deviceName = shallowRef('');
const deviceSecret = shallowRef('');
const deviceAccessToken = shallowRef('');

const store = useAuthenticationStore();
/**
 * 获取 "initial" Access token
 */
const onInitialAccessToken = () => {
  store.$reset();
  SecurityApiResources.getInstance()
    .oauth2()
    .clientCredentialsFlow(productKey.value, productSecret.value, BuildInScopeEnum.CLIENT_CREATE)
    .then((response) => {
      const data = response as AccessTokenResponse;
      responseResults.value = data;
      productAccessToken.value = data.access_token;

      // 保存到 Store 以便后续调用
      store.saveAccessToken(data);
    })
    .catch((error) => {
      responseResults.value = error;
    });
};

/**
 * 客户端动态注册
 */
const onDynamicRegistration = () => {
  // 客户端注册需要使用到上面方法中的 "initial" Access token
  SecurityApiResources.getInstance()
    .oauth2()
    .oidcClientRegistrationFlow(productKey.value, 'aaaaaa')
    .then((response) => {
      const data = response;
      responseResults.value = data;
      deviceName.value = data.client_id;
      deviceSecret.value = data.client_secret;
      // 客户端注册成功后，清理 access_token。防止下一步验证时，因携带了该 Token，导致验证失败。
      store.$reset();
    })
    .catch((error) => {
      responseResults.value = error;
    });
};

const onNewClientSignIn = () => {
  SecurityApiResources.getInstance()
    .oauth2()
    .clientCredentialsFlow(deviceName.value, deviceSecret.value, 'email')
    .then((response) => {
      const data = response as AccessTokenResponse;
      responseResults.value = data;
      deviceAccessToken.value = data.access_token;
    })
    .catch((error) => {
      responseResults.value = error;
    });
};
</script>
