import type { ShallowRef } from 'vue';
import type { PingResponse } from '@/declarations';

import { shallowRef } from 'vue';

import { SecurityApiResources } from '../api';

export default function useDeviceAuthorize(
  clientId: ShallowRef<string>,
  clientSecret: ShallowRef<string>,
  deviceCode: ShallowRef<string>,
) {
  const handler = shallowRef(0);
  const interval = shallowRef(5);
  const isSuccess = shallowRef(false);
  const isFailed = shallowRef(false);
  const successResponse = shallowRef({});
  const pullingResponse = shallowRef([]) as ShallowRef<Array<PingResponse>>;

  const message = (text: string, isSuccess = false) => {
    const id = pullingResponse.value.length + 1;
    if (!isSuccess) {
      pullingResponse.value.push({ id: id, icon: 'mdi-alert-circle', color: 'error', text: text });
    } else {
      pullingResponse.value.push({ id: id, icon: 'mdi-information', color: 'green', text: text });
    }
  };

  const pulling = (status: string) => {
    if (status === 'authorization_pending') {
      message('Authorization pending, continuing to poll...');
    } else if (status === 'slow_down') {
      message('Slowing down...');
      slowDown();
    } else if (status === 'token_expired') {
      message('Token expired, stopping...');
      clear();
      isFailed.value = true;
    } else if (status === 'access_denied') {
      message('Access denied, stopping...');
      clear();
      isFailed.value = true;
    }
  };

  const process = () => {
    SecurityApiResources.getInstance()
      .oauth2()
      .deviceCodeFlow(clientId.value, clientSecret.value, deviceCode.value)
      .then((response) => {
        message('Authorization successful', true);
        clear();
        isSuccess.value = true;
        successResponse.value = response.data;
      })
      .catch((error) => {
        const data = error.response.data;
        pulling(data.error);
      });
  };

  const schedule = () => {
    handler.value = window.setInterval(process, interval.value * 1000);
  };

  const clear = () => {
    window.clearInterval(handler.value);
  };

  const slowDown = () => {
    interval.value += 5;
    clear();
    schedule();
  };

  return {
    pullingResponse,
    successResponse,
    isFailed,
    isSuccess,
    schedule,
  };
}
