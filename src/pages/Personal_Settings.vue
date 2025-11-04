<template><div class="ps_body"></div></template>
<script lang="ts" name="Console" setup>
import { useNameStore } from '@/store/nameStore'
const { sys_settings, Breadcrumbs, prs_settings } = useNameStore()
Breadcrumbs[0] = sys_settings
Breadcrumbs[1] = prs_settings
</script>
<style scoped>
.ps_body {
  display: flex;
  height: 100%;
  background-color: #fff;
}
</style>
