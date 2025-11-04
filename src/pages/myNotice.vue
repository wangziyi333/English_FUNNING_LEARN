<template><div class="nt_body"></div></template>
<script lang="ts" name="Console" setup>
import { useNameStore } from '@/store/nameStore'
const { notice, Breadcrumbs, data_management } = useNameStore()
Breadcrumbs[0] = notice
Breadcrumbs[1] = data_management
</script>
<style scoped>
.nt_body {
  display: flex;
  height: 100%;
  background-color: #fff;
}
</style>
