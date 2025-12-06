import { useRouter } from 'vue-router';

import { useAuthenticationStore, usePasskey, useCryptoStore } from '@herodotus/framework';
import { toast } from '@herodotus/core';

import { DEAULT_ROUTER_LINK } from '@/configurations';

export default function useSignIn() {
  const isSubmitDisabled = shallowRef(false);
  const errorMessage = shallowRef('');
  const hasError = shallowRef(false);

  const router = useRouter();
  const { authenticator } = usePasskey();
  const authentication = useAuthenticationStore();
  const crypto = useCryptoStore();

  /**
   * 禁用操作。
   * 1. 因为 open api 接口会校验 clientId 和 clientSecret，如果这两个值错误或者数据库初始化异常，那么没有必要允许登录
   * 2. 如果没有获取到 Session，那么登录时前后端加密也会出错。
   */
  const isDisabled = computed(() => {
    return crypto.sessionId ? false : true;
  });

  const isSubmittingProtected = computed(() => {
    return isDisabled.value || isSubmitDisabled.value;
  });

  const passwordSignIn = async (username: string, password: string) => {
    isSubmitDisabled.value = true;

    authentication
      .signIn(username, password)
      .then((response) => {
        if (response) {
          isSubmitDisabled.value = false;
          toast.success('欢迎回来！');
          router.replace({
            path: DEAULT_ROUTER_LINK.home.path,
          });
        }
      })
      .catch((error) => {
        isSubmitDisabled.value = false;
        if (error.message) {
          errorMessage.value = error.message;
          hasError.value = true;
        }
      });
  };

  const smsSignIn = async (mobile: string, verificationCode: string) => {
    isSubmitDisabled.value = true;

    authentication
      .smsSignIn(mobile, verificationCode)
      .then((response) => {
        if (response) {
          isSubmitDisabled.value = false;
          toast.success('欢迎回来！');
          router.replace({
            path: DEAULT_ROUTER_LINK.home.path,
          });
        }
      })
      .catch((error) => {
        isSubmitDisabled.value = false;
        if (error.message) {
          errorMessage.value = error.message;
          hasError.value = true;
        }
      });
  };

  const passkeySignIn = () => {
    isSubmitDisabled.value = true;

    authenticator()
      .then((response) => {
        if (response) {
          isSubmitDisabled.value = false;
          toast.success('欢迎回来！');
          router.push({
            path: DEAULT_ROUTER_LINK.home.path,
          });
        }
      })
      .catch((error) => {
        isSubmitDisabled.value = false;
        if (error.message) {
          errorMessage.value = error.message;
          hasError.value = true;
        }
      });
  };

  const prompt = computed(() => {
    return authentication.remainTimes !== 0 && hasError.value;
  });

  const promptMessage = computed(() => {
    return '您还有【' + authentication.remainTimes + '】次尝试机会，之后将会锁定该账户';
  });

  const onResetError = () => {
    errorMessage.value = '';
    hasError.value = false;
  };

  return {
    isSubmittingProtected,
    errorMessage,
    hasError,
    passwordSignIn,
    smsSignIn,
    passkeySignIn,
    prompt,
    promptMessage,
    onResetError,
  };
}
