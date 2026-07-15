<template>
  <div>
    <h-label text="枚举项：" required></h-label>
    <v-container class="pa-0 mt-4">
      <v-row no-gutters v-for="(entry, index) in entries" :key="index">
        <v-col cols="5"
          ><v-text-field
            v-model="entry.key"
            density="compact"
            placeholder="编号如'0'"
            hide-details
            :rules="[(v: string) => !!v || '枚举条目不能为空']"
          ></v-text-field
        ></v-col>
        <v-col cols="1" align-self="center" class="text-center">~</v-col>
        <v-col cols="5"
          ><v-text-field
            v-model="entry.value"
            density="compact"
            placeholder="对该枚举项的描述"
            hide-details
            :rules="[(v: string) => !!v || '枚举条目描述不能为空']"
          ></v-text-field
        ></v-col>
        <v-col cols="1">
          <v-btn variant="text" v-if="isNotOnlyOneEntry()" text="删除" @click="removeEntry(index)"
        /></v-col>
      </v-row>
    </v-container>
    <h-tsl-button text="+ 添加条目" @click="addEntry" />
  </div>
</template>

<script setup lang="ts">
import type { Specification, EnumSpecs } from "@herodotus/api";

import { isEmpty } from "lodash-es";
import { HDictionarySelect } from "@/components/library/HDictionary";

import { HTslButton } from "../commons";

defineOptions({ name: "HEnumPanel", components: { HDictionarySelect, HTslButton } });

const model = defineModel<Specification<EnumSpecs>>({
  default: () => ({}) as Specification<EnumSpecs>,
});

// 内部维护的条目列表
interface Entry {
  key: string;
  value: string;
}
const entries = ref<Entry[]>([]);
// 防止循环同步的标志
let isSyncingFromModel = false;

// 将外部 Record 同步到内部 entries
const syncFromModel = (data: Record<string, string>) => {
  isSyncingFromModel = true;

  if (isEmpty(data)) {
    entries.value = [{ key: "", value: "" }];
  } else {
    // 将对象转为条目数组，过滤掉空 key
    const list: Entry[] = Object.entries(data)
      .filter(([k]) => !isEmpty(k))
      .map(([key, value]) => ({ key, value }));

    entries.value = list;
  }

  nextTick(() => {
    isSyncingFromModel = false;
  });
};

// 将内部 entries 同步到外部 model
const syncToModel = () => {
  if (isSyncingFromModel) return;

  // 过滤掉空 key 的条目，构建新对象（重复 key 时后者覆盖前者）
  const newObj: Record<string, string> = {};
  for (const entry of entries.value) {
    if (!isEmpty(entry.key)) {
      newObj[entry.key] = entry.value;
    }
  }

  // 仅当内容真正变化时才更新
  if (JSON.stringify(newObj) !== JSON.stringify(model.value.dataType.specs)) {
    model.value.dataType.specs = newObj;
  }
};

// 判断是否为唯一的空条目
const isNotOnlyOneEntry = () => {
  return entries.value.length !== 1;
};

// 添加新空条目
const addEntry = () => {
  entries.value.push({ key: "", value: "" });
};

// 删除指定条目
const removeEntry = (index: number) => {
  // 不允许删除唯一的空占位条目
  if (isNotOnlyOneEntry()) {
    entries.value.splice(index, 1);
  }
};

// 监听外部 model 的变化（深层），同步回内部 entries
watch(
  () => model.value.dataType.specs,
  (newValue) => {
    syncFromModel(newValue ?? {});
  },
  { deep: true, immediate: true },
);

// 监听内部 entries 变化，同步到外部 model
watch(
  entries,
  () => {
    syncToModel();
  },
  { deep: true },
);
</script>
