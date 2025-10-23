<template>
  <v-container fluid>
    <router-view v-slot="{ Component, route }">
      <transition
        appear
        mode="out-in"
        :duration="500"
        enter-active-class="animate__animated animate__fadeIn"
        leave-active-class="animate__animated animate__fadeOut"
      >
        <component :is="Component" :key="route" />
      </transition>
    </router-view>
  </v-container>
</template>

<script lang="ts" setup>
defineOptions({ name: 'HAppContainer' });
</script>
