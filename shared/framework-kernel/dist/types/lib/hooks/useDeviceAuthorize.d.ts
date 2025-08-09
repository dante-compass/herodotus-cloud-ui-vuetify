import { ShallowRef } from 'vue';
import { PingResponse } from '../../declarations';
export default function useDeviceAuthorize(clientId: ShallowRef<string>, clientSecret: ShallowRef<string>, deviceCode: ShallowRef<string>): {
    pullingResponse: ShallowRef<PingResponse[]>;
    successResponse: ShallowRef<{}, {}>;
    isFailed: ShallowRef<boolean, boolean>;
    isSuccess: ShallowRef<boolean, boolean>;
    schedule: () => void;
};
