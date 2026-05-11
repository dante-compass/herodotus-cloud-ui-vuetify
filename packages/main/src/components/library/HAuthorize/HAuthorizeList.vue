<template>
  <v-card>
    <h-authorize-header @save="onSave()" @clear="onClear()"></h-authorize-header>
    <v-list lines="two" density="compact" selectable class="mx-2">
      <v-list-item v-for="(item, i) in selectedItems" :key="i" rounded="lg">
        <template v-if="httpMethod" #prepend>
          <h-http-method-avatar :method="getHttpMethod(item)"></h-http-method-avatar>
        </template>

        <v-list-item-title>{{ getTitle(item) }}</v-list-item-title>
        <v-list-item-subtitle v-if="prependSubtitle">
          {{ getSubtitle(item) }}
        </v-list-item-subtitle>
        <template #append>
          <v-avatar>
            <v-icon color="red" icon="mdi-delete" @click="onRemoveItem(item)"></v-icon>
          </v-avatar>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import type { AbstractSysEntity, HttpMethod } from "@herodotus/core";

import { findIndex, remove } from "lodash-es";

import HAuthorizeHeader from "./HAuthorizeHeader.vue";
import HHttpMethodAvatar from "./HHttpMethodAvatar.vue";

defineOptions({ name: "HAuthorizeList", components: { HAuthorizeHeader, HHttpMethodAvatar } });

interface Props {
  rowKey: string;
  prependTitle: string;
  prependSubtitle?: string;
  appendTitle?: string;
  appendSubtitle?: string;
  httpMethod?: boolean;
  httpMethodKey?: string;
}

const props = withDefaults(defineProps<Props>(), {
  httpMethod: false,
});

const emit = defineEmits<{
  save: [];
  clear: [];
}>();

const selectedItems = defineModel<Array<AbstractSysEntity>>({
  default: () => [],
  required: true,
});

const getValueProperty = (item: AbstractSysEntity, property: string) => {
  const attribute = property as keyof AbstractSysEntity;
  return item[attribute];
};

const getTitle = (item: AbstractSysEntity) => {
  let title = getValueProperty(item, props.prependTitle);
  if (props.appendTitle) {
    title += " -- " + getValueProperty(item, props.appendTitle);
  }

  return title;
};

const getSubtitle = (item: AbstractSysEntity) => {
  if (props.prependSubtitle) {
    let subtitle = getValueProperty(item, props.prependSubtitle);
    if (props.appendSubtitle) {
      subtitle += " -- " + getValueProperty(item, props.appendSubtitle);
    }

    return subtitle;
  } else {
    return "";
  }
};

const getHttpMethod = (item: AbstractSysEntity): HttpMethod => {
  if (props.httpMethodKey) {
    return getValueProperty(item, props.httpMethodKey) as HttpMethod;
  } else {
    return "GET";
  }
};

const onRemoveItem = (item: AbstractSysEntity) => {
  let index = findIndex(selectedItems.value, item);
  remove(selectedItems.value, index);
  selectedItems.value = selectedItems.value.filter((i) => {
    return getValueProperty(i, props.rowKey) != getValueProperty(item, props.rowKey);
  });
};

const onSave = () => {
  emit("save");
};

const onClear = () => {
  selectedItems.value = [];
};
</script>
