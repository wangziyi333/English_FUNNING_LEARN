<template><div class="ss_body"></div></template>
<script lang="ts" name="Console" setup>
import { useNameStore } from '@/store/nameStore'
const { Breadcrumbs, sys_settings } = useNameStore()
Breadcrumbs[0] = sys_settings
Breadcrumbs[1] = sys_settings
</script>
<style scoped>
.ss_body {
  display: flex;
  height: 100%;
  background-color: #fff;
}
</style>
