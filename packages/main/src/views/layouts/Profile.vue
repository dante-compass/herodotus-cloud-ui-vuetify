<template>
  <profile-default-layout></profile-default-layout>
</template>

<script lang="ts" setup>
import { ProfileDefaultLayout } from '@/components/layouts';

defineOptions({
  name: 'ProfileLayout',
  components: { ProfileDefaultLayout },
});
</script>
