<template>
  <h-error-layout>
    <icon-not-found height="80vh" width="100%" />
  </h-error-layout>
</template>

<script lang="ts" setup>
import IconNotFound from '~icons/herodotus/not-found';

defineOptions({ name: 'NotFound', components: { IconNotFound } });
</script>
