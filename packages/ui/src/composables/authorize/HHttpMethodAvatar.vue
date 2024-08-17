<template>
  <q-item-section avatar>
    <q-avatar :color="color(method)" text-color="white" :icon="icon(method)"></q-avatar>
  </q-item-section>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

import type { HttpMethod } from '/@/lib/declarations';

import { useDisplayElement } from '/@/hooks';
import { Constants } from '/@/lib/definitions';

export default defineComponent({
  name: 'HHttpMethodAvatar',

  props: {
    method: { type: String as PropType<HttpMethod>, required: true },
  },

  setup() {
    const { icon, color } = useDisplayElement(Constants.HTTP_METHOD_STYLE_GROUP);

    return {
      color,
      icon,
    };
  },
});
</script>
