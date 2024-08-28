import { ref, Ref } from 'vue';

import type { ConstantDictionary, AssetServerEntity } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';
import { useDictionary } from '/@/composables/constants';

export default function useServerDisplay() {
  const { getDictionary } = useDictionary();

  const serverDevice = ref([]) as Ref<ConstantDictionary[]>;

  const parseServerDevice = (item: AssetServerEntity) => {
    if (lodash.isEmpty(serverDevice.value)) {
      serverDevice.value = getDictionary('ServerDevice');
    }

    if (typeof item.deviceType == 'string') {
      return serverDevice.value[Number(item.deviceType)].label;
    } else {
      return item.deviceType;
    }
  };

  return {
    parseServerDevice,
  };
}
