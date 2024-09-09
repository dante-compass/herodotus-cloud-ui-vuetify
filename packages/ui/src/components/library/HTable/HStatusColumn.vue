<template>
  <h-dense-icon-button :color="color" :icon="icon" :tooltip="tooltip"></h-dense-icon-button>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, reactive, watch } from 'vue';
import type { Dictionary } from '/@/lib/declarations';

import { CONSTANTS, useDictionaryStore } from '/@/composables/constants';

import HDenseIconButton from './HDenseIconButton.vue';
import { lodash } from '/@/lib/utils';

export default defineComponent({
  name: 'HStatusColumn',

  components: {
    HDenseIconButton
  },

  props: {
    type: { type: String, defalut: '0', required: true }
  },

  setup(props) {
    const state = reactive({
      items: [] as Array<Dictionary>
    });

    const { getDictionary } = useDictionaryStore();

    const initialize = () => {
      if (lodash.isEmpty(state.items)) {
        state.items = getDictionary('DataItemStatus');
      }
    };

    onMounted(() => {
      initialize();
    });

    watch(
      () => props.type,
      () => {
        initialize();
      },
      { immediate: true }
    );

    const color = computed(() => {
      return CONSTANTS.DATA_ITEM_STATUS[Number(props.type)].color;
    });

    const icon = computed(() => {
      return CONSTANTS.DATA_ITEM_STATUS[Number(props.type)].icon;
    });

    const tooltip = computed(() => {
      if (!lodash.isEmpty(state.items)) {
        return state.items[Number(props.type)].label;
      } else {
        return '';
      }
    });

    return {
      color,
      icon,
      tooltip
    };
  }
});
</script>
