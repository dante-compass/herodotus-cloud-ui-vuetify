<template>
  <v-snackbar v-model="showBar" :timeout="2000" location="center center" color="primary" v-bind="$attrs">
    <v-container>
      <v-row align-content="center" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">文件下载 {{ `${progress}%` }}</v-col>
        <v-col cols="6">
          <v-progress-linear
            :model-value="progress"
            chunk-width="4"
            color="purple"
            height="15"
            rounded="lg"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </v-snackbar>
</template>

<script setup lang="ts">
import { VSnackbar, VContainer, VRow, VCol, VProgressLinear } from 'vuetify/components';

defineOptions({ name: 'HDownloadProgress', components: { VSnackbar, VContainer, VRow, VCol, VProgressLinear } });

interface Props {
  progress: number;
}

defineProps<Props>();

const showBar = defineModel<boolean>({
  required: true,
});
</script>
