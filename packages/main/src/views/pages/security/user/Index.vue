<template>
  <div>SysUser</div>
</template>

<script setup lang="ts">
defineOptions({ name: 'SysUser' });

const headers = ref([
  { key: 'username', align: 'center', title: '用户名' },
  { key: 'nickname', align: 'center', title: '昵称' },
  { key: 'description', align: 'center', title: '备注' },
  { key: 'reserved', align: 'center', title: '保留数据' },
  { key: 'status', align: 'center', title: '状态' },
  { key: 'actions', align: 'center', title: '操作' },
]);
</script>
