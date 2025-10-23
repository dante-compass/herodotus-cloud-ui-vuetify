<template>
  <h-error-layout>
    <icon-no-permission height="80vh" width="100%" />
  </h-error-layout>
</template>

<script lang="ts" setup>
import IconHerodotusNoPermission from '~icons/herodotus/no-permission';

defineOptions({ name: 'NoPermission', components: { IconHerodotusNoPermission } });
</script>
