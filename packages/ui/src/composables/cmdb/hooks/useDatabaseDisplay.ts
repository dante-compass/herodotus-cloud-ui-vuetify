import { ref, Ref } from 'vue';

import type { ConstantDictionary, DatabaseInstanceEntity } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';
import { useConstantsStore } from '/@/stores';

export default function useDatabaseDisplay() {
  const constants = useConstantsStore();

  const database = ref([]) as Ref<ConstantDictionary[]>;

  const parseDatabase = (item: DatabaseInstanceEntity) => {
    if (lodash.isEmpty(database.value)) {
      database.value = constants.getDictionary('database');
    }

    if (typeof item.dbType == 'number') {
      return database.value[item.dbType].text;
    } else {
      return item.dbType;
    }
  };

  return {
    parseDatabase,
  };
}
