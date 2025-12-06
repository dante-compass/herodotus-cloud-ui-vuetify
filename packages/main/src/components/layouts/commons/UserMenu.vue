<template>
  <v-menu eager location="bottom end">
    <template v-slot:activator="{ props }">
      <v-btn icon v-bind="props">
        <v-avatar>
          <v-img :src="avatar"></v-img>
        </v-avatar>
      </v-btn>
    </template>
    <v-card border rounded="lg" width="280">
      <v-img
        color="surface-light"
        content-class="d-flex align-start justify-end pa-2"
        cover
        flat
        height="88"
        rounded="0"
      ></v-img>
      <div class="text-center mt-n9 mb-4">
        <div>
          <v-avatar
            v-ripple
            :class="['border-md border-opacity-100 border-surface-light']"
            color="surface"
            size="72"
          >
            <v-img :src="avatar"></v-img>
          </v-avatar>
          <div class="text-h6 mt-2">
            {{ username }}
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <slot></slot>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
defineOptions({ name: 'UserMenu' });

interface Props {
  avatar: string;
  username?: string;
}

withDefaults(defineProps<Props>(), {
  username: 'Guest',
});
</script>
