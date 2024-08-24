import { ref, Ref } from 'vue';

import type { ConstantDictionary, AssetServerEntity } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';
import { useConstantsStore } from '/@/stores';

export default function useServerDisplay() {
  const constants = useConstantsStore();

  const serverDevice = ref([]) as Ref<ConstantDictionary[]>;

  const parseServerDevice = (item: AssetServerEntity) => {
    if (lodash.isEmpty(serverDevice.value)) {
      serverDevice.value = constants.getDictionary('ServerDevice');
    }

    if (typeof item.deviceType == 'number') {
      return serverDevice.value[item.deviceType].label;
    } else {
      return item.deviceType;
    }
  };

  return {
    parseServerDevice,
  };
}
