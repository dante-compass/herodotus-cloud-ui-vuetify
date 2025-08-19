import { Ref } from 'vue';
import { PingResponse } from '../../declarations';
export default function useDeviceAuthorize(deviceCode: string, clientId: '', clientSecret: ''): {
    pullingResponse: Ref<PingResponse[], PingResponse[]>;
    successResponse: import('vue').ShallowRef<{}, {}>;
    isFailed: import('vue').ShallowRef<boolean, boolean>;
    isSuccess: import('vue').ShallowRef<boolean, boolean>;
    schedule: () => void;
    clear: () => void;
    slowDown: () => void;
};
