<template>
  <v-row>
    <v-col>
      <h-testing-content-card title="获取设备认证信息" subtitle="使用 OAuth2 DeviceFlow 需要先获取设备信息">
        <v-text-field v-model="productKey" label="Product Key" required></v-text-field>
        <v-text-field v-model="deviceName" label="Device Name" required></v-text-field>
        <v-text-field v-model="deviceSecret" label="Device Secret" required></v-text-field>
        <v-btn
          color="purple"
          text="获取信息"
          variant="flat"
          size="large"
          width="200px"
          @click="onDeviceAuthorization"
        ></v-btn>
      </h-testing-content-card>
      <h-testing-content-card title="获取设备结果" subtitle="显示 User Code 等信息则表示获取设备信息成功" class="mt-4">
        <v-text-field v-model="userCode" label="User Code" disabled></v-text-field>
        <v-text-field v-model="deviceCode" label="Device Code" disabled></v-text-field>
      </h-testing-content-card>
    </v-col>
    <v-col>
      <h-testing-content-card title="设备校验结果" subtitle="轮询服务端直到从响应结果中可以获取到 Access Token">
        <v-btn
          color="purple"
          text="打开验证页面"
          variant="flat"
          size="large"
          width="200px"
          :href="verificationUri"
          target="_blank"
        ></v-btn>
        <v-btn
          color="purple"
          text="开始测试"
          variant="flat"
          size="large"
          width="200px"
          class="ml-4"
          @click="onDeviceVerificationStart"
        ></v-btn>
        <v-btn
          color="purple"
          text="暂停"
          variant="flat"
          size="large"
          width="200px"
          class="ml-4"
          @click="onDeviceVerificationStop"
        ></v-btn>
      </h-testing-content-card>
      <v-card class="mt-4">
        <v-card-title class="pb-5 font-weight-black">轮询响应结果：</v-card-title>
        <v-timeline side="end">
          <v-timeline-item v-for="item in pullingResponse" :key="item.id" :dot-color="item.color" size="small">
            <v-alert :color="item.color" :icon="item.icon" :value="true">
              {{ item.text }}
            </v-alert>
          </v-timeline-item>
        </v-timeline>
      </v-card>
    </v-col>
    <v-col>
      <h-testing-http-response v-model="responseResults"></h-testing-http-response>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import type { JSONDataType } from "@/composables/declarations";
import type { DeviceAuthorizationResponse } from "@herodotus/core";

import { BuildInScopeEnum, ContentTypeEnum } from "@herodotus/core";
import { SecurityApiResources, useDeviceAuthorize } from "@herodotus/framework";

import { HTesingContentCard, HTestingHttpResponse, HTestingHttpResponseLayout } from "../../components";

defineOptions({
  name: "HDeviceActivation",
  components: { HTesingContentCard, HTestingHttpResponse, HTestingHttpResponseLayout },
});

const responseResults = ref({}) as Ref<JSONDataType>;

const productKey = shallowRef("apktestadd");
const deviceName = shallowRef("aaaaaa");
const deviceSecret = shallowRef("qZi8pyTKfcDNmjWxCz3ajPqj01nxRE7DBgmirargzMibv2C7f82JYFHyIwREj_IC");

const clientId = computed(() => {
  return productKey.value + "." + deviceName.value;
});

const userCode = shallowRef("");
const deviceCode = shallowRef("");
const verificationUriComplete = shallowRef("");
const verificationUri = shallowRef("");
const expiresIn = shallowRef(0);

/**
 * 获取 "initial" Access token
 */
const onDeviceAuthorization = () => {
  SecurityApiResources.getInstance()
    .oauth2()
    .deviceAuthorizationFlow(clientId.value, deviceSecret.value, BuildInScopeEnum.CLIENT_CREATE, {
      contentType: ContentTypeEnum.URL_ENCODED,
      withToken: false,
    })
    .then((response) => {
      const data = response as DeviceAuthorizationResponse;
      responseResults.value = JSON.parse(JSON.stringify(data));
      userCode.value = data.user_code;
      deviceCode.value = data.device_code;
      verificationUriComplete.value = data.verification_uri_complete;
      verificationUri.value = data.verification_uri;
      expiresIn.value = data.expires_in;
    })
    .catch((error) => {
      responseResults.value = error;
    });
};

const { schedule, pullingResponse, isFailed, isSuccess, successResponse, clear } = useDeviceAuthorize(
  deviceCode,
  clientId,
  deviceSecret,
);

const onDeviceVerificationStart = () => {
  schedule();
};

const onDeviceVerificationStop = () => {
  clear();
};

watch(
  pullingResponse.value,
  (newValue) => {
    console.log(newValue);
  },
  { deep: true },
);

watch(isFailed, (newValue) => {
  if (newValue) {
    console.log("failed");
  }
});

watch(isSuccess, (newValue) => {
  if (newValue) {
    console.log("success");
  }
});
</script>
