import { ref, Ref } from 'vue';

import type { ConstantDictionary, DatabaseInstanceEntity } from '/@/lib/declarations';

import { lodash } from '/@/lib/utils';
import { useDictionary } from '/@/composables/constants';

export default function useDatabaseDisplay() {
  const { getDictionary } = useDictionary();

  const database = ref([]) as Ref<ConstantDictionary[]>;

  const parseDatabase = (item: DatabaseInstanceEntity) => {
    if (lodash.isEmpty(database.value)) {
      database.value = getDictionary('Database');
    }

    if (typeof item.dbType == 'string') {
      return database.value[Number(item.dbType)].label;
    } else {
      return item.dbType;
    }
  };

  return {
    parseDatabase,
  };
}
