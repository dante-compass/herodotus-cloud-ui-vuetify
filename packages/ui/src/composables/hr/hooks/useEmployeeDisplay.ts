import { ref, Ref } from 'vue';

import type { ConstantDictionary, SysEmployeeEntity } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';
import { useDictionary } from '/@/composables/constants';

export default function useEmployeeDisplay() {
  const { getDictionary } = useDictionary();

  const gender = ref([]) as Ref<ConstantDictionary[]>;
  const identity = ref([]) as Ref<ConstantDictionary[]>;

  const parseGender = (item: SysEmployeeEntity) => {
    if (lodash.isEmpty(gender.value)) {
      gender.value = getDictionary('Gender');
    }

    if (typeof item.gender == 'string') {
      return gender.value[Number(item.gender)].label;
    } else {
      return item.gender;
    }
  };

  const parseIdentity = (item: SysEmployeeEntity) => {
    if (lodash.isEmpty(identity.value)) {
      identity.value = getDictionary('Identity');
    }

    if (typeof item.identity == 'string') {
      return identity.value[Number(item.identity)].label;
    } else {
      return item.identity;
    }
  };

  return {
    parseGender,
    parseIdentity,
  };
}
