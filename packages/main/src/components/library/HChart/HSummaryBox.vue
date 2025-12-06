<template>
  <v-card rounded="xl">
    <v-list>
      <v-list-item>
        <v-list-item-title
          :class="['text-h4', `text-${color}`]"
          style="font-weight: 500; letter-spacing: 3px"
        >
          {{ numeric }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ description }}
        </v-list-item-subtitle>
        <template #append>
          <v-list-item-action>
            <v-icon :icon="icon" :color="color" size="60px"></v-icon>
          </v-list-item-action>
        </template>
      </v-list-item>
      <v-list-item>
        <v-progress-linear
          :color="color"
          height="10"
          :model-value="percent"
          striped
        ></v-progress-linear>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'HSummaryBox' });

interface Props {
  numeric?: string | number;
  percent?: number;
  description?: string;
  icon?: string;
  color?: string;
}

withDefaults(defineProps<Props>(), {
  color: '',
});
</script>
