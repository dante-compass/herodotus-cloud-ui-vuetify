<template>
  <h-error-layout>
    <icon-herodotus-not-found height="80vh" width="100%" />
  </h-error-layout>
</template>

<script lang="ts" setup>
import IconHerodotusNotFound from '~icons/herodotus/not-found';

defineOptions({ name: 'NotFound', components: { IconHerodotusNotFound } });
</script>
