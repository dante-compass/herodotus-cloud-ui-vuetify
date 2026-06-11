<template>
  <v-row>
    <v-col>
      <h-testing-card title="填入设备信息:" subtitle="根据页面提示，输入对应信息">
        <v-form ref="form">
          <v-text-field
            v-model="productKey"
            label="Product Key"
            :rules="[(v) => !!v || '请输入 Product Key']"
            required
          ></v-text-field>
          <v-text-field
            v-model="deviceName"
            label="Device Name"
            :rules="[(v) => !!v || '请输入 Device Name']"
            required
          ></v-text-field>
          <v-text-field
            v-model="clientId"
            label="Client Id（可选，默认使用 productKey.deviceName）"
            required
            hint="(注：此处为设备clientId，并非mqttClientId)"
          ></v-text-field>
          <v-text-field
            v-model="deviceSecret"
            label="Product Secret Or Device Secret"
            :rules="[(v) => !!v || '请输入 Device Secret']"
            required
          ></v-text-field>
        </v-form>
        <v-select v-model="method" :items="['hmacmd5', 'hmacsha1', 'hmacsha256']" label="Method"></v-select>

        <v-select v-model="authType" :items="['register', 'regnwl']" label="AuthType" clearable></v-select>
        <v-text-field
          v-model="timestamp"
          label="Timestamp"
          append-inner-icon="mdi-autorenew"
          @click:append-inner="onRenewTimestamp()"
        ></v-text-field>
        <v-text-field
          v-model="random"
          label="Random"
          append-inner-icon="mdi-autorenew"
          @click:append-inner="onRenewRandom()"
        ></v-text-field>

        <v-btn color="purple" text="计算" variant="flat" size="large" width="200px" @click="onSignature"></v-btn>
      </h-testing-card>
      <h-testing-card title="计算结果:" class="mt-4">
        <v-text-field v-model="mqttClientId" label="Mqtt Client Id" readonly></v-text-field>
        <v-text-field v-model="mqttUsername" label="Mqtt Username" readonly></v-text-field>
        <v-text-field v-model="mqttPassword" label="Mqtt Password" readonly></v-text-field>
      </h-testing-card>
    </v-col>
    <v-col></v-col>
  </v-row>
</template>

<script setup lang="ts">
import { HmacMD5, HmacSHA1, HmacSHA256, enc } from "crypto-js";
import { customAlphabet } from "nanoid";
import { isEmpty, assignIn, get } from "lodash-es";

import { HTestingCard } from "../../components";

defineOptions({ name: "HMqttSignature", components: { HTestingCard } });

const form = ref();

const productKey = shallowRef("apktestadd");
const deviceName = shallowRef("");
const deviceSecret = shallowRef("9f3026f4beddf8d29f3026f4beddf8d2");
const clientId = shallowRef("");
const method = shallowRef("hmacmd5");
const authType = shallowRef();
const timestamp = shallowRef("");
const random = shallowRef("");

const mqttClientId = shallowRef("");
const mqttUsername = shallowRef("");
const mqttPassword = shallowRef("");

const getClientId = () => {
  if (!isEmpty(clientId.value)) {
    return clientId.value;
  } else {
    return productKey.value + "." + deviceName.value;
  }
};

const createMqttClientId = () => {
  let result = `${getClientId()}|securemode=2,signmethod=${method.value}`;

  if (!isEmpty(timestamp.value)) {
    result += `,timestamp=${timestamp.value}`;
  }

  if (!isEmpty(random.value)) {
    result += `,random=${random.value}`;
  }

  if (!isEmpty(authType.value)) {
    result += `,authType=${authType.value}`;
  }

  result += "|";
  return result;
};

const createMqttUsername = () => {
  return deviceName.value + "&" + productKey.value;
};

const createMqttPassword = () => {
  const options = {
    productKey: productKey.value,
    deviceName: deviceName.value,
    clientId: getClientId(),
  };

  if (timestamp.value) {
    assignIn(options, { timestamp: timestamp.value });
  }

  let keys = Object.keys(options).sort();
  let content = "";
  for (const key of keys) {
    content += key + get(options, key);
  }

  let hash;
  switch (method.value) {
    case "hmacsha1":
      hash = HmacSHA1(content, deviceSecret.value);
      break;
    case "hmacsha256":
      hash = HmacSHA256(content, deviceSecret.value);
      break;
    default:
      hash = HmacMD5(content, deviceSecret.value);
      break;
  }

  return hash.toString(enc.Hex);
};

const onRenewTimestamp = () => {
  timestamp.value = new Date().getTime().toString();
};

const onRenewRandom = () => {
  const result = customAlphabet("0123456789", 6);
  random.value = result();
};

const onSignature = async () => {
  const { valid } = await form.value.validate();
  if (valid) {
    mqttClientId.value = createMqttClientId();
    mqttUsername.value = createMqttUsername();
    mqttPassword.value = createMqttPassword();
  }
};
</script>
