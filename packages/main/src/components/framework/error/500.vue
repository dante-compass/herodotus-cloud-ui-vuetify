<template>
  <h-error-layout>
    <icon-herodotus-service-error height="80vh" width="100%" />
  </h-error-layout>
</template>

<script lang="ts" setup>
import IconHerodotusServiceError from '~icons/herodotus/service-error';

defineOptions({ name: 'ServiceError', components: { IconHerodotusServiceError } });
</script>
