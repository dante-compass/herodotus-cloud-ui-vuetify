<template>
  <h-error-layout>
    <icon-service-error height="80vh" width="100%" />
  </h-error-layout>
</template>

<script lang="ts" setup>
import IconServiceError from '~icons/herodotus/service-error';

defineOptions({ name: 'ServiceError', components: { IconServiceError } });
</script>
