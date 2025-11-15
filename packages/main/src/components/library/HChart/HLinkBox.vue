<template>
  <v-card rounded="xl">
    <v-list lines="two">
      <v-list-item>
        <v-list-item-title class="text-h6">
          {{ description }}
        </v-list-item-title>
        <template #prepend>
          <v-avatar>
            <v-icon :icon="icon" :color="color"></v-icon>
          </v-avatar>
        </template>

        <template #append>
          <v-icon icon="$next" :color="color"></v-icon>
        </template>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
defineOptions({ name: 'HLinkBox' });

interface Props {
  description: string;
  icon: string;
  color: string;
  link: string;
}

defineProps<Props>();
</script>
