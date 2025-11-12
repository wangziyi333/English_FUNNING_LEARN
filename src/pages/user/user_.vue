<template>
  <div class="body-container">
    <div class="common-layout border">
      <el-container>
        <el-header height="60px"><Use_userBanner /></el-header>
        <el-container>
          <el-aside width="22vw"><Use_userAside /></el-aside>
          <el-main><RouterView /></el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>
<script lang="ts" name="user_" setup>
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { RouterView } from 'vue-router'
// import { ElMessage, ElMessageBox } from 'element-plus'
import Use_userAside from '@/components/Use_userAside.vue'
import Use_userBanner from '@/components/Use_userBanner.vue'

// const router = useRouter()
const userInfo = ref({})

onMounted(() => {
  // 获取用户信息
  const info = localStorage.getItem('userInfo')
  if (info) {
    userInfo.value = JSON.parse(info)
  }
})

// const handleLogout = async () => {
//   try {
//     await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
//       confirmButtonText: '确定',
//       cancelButtonText: '取消',
//       type: 'warning'
//     })
//     // 清除本地存储
//     localStorage.clear()
//     // 跳转到登录页
//     router.push('/login')
//     ElMessage.success('已退出登录')
//   } catch {
//     // 点击取消
//   }
// }
</script>
<style scoped>
.body-container {
  background-color: #e3e3e3;
  height: 100vh;
  padding: 50px;
}
.border {
  height: 100%;
  border-radius: 20px;
  background-color: #fff;
}
</style>
