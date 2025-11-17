<template>
  <div class="container">
    <div class="loading" v-if="loading">加载中...</div>
    <div v-else>
      <div class="content" v-if="haveStorys">
        <dl v-for="item in storys" :key="item.id">
          <RouterLink to="/user/reading_" :currentStory="item">
            <dt>{{ item.title }}</dt>
            <dd>{{ item.story[30] }}...</dd>
          </RouterLink>
        </dl>
      </div>
      <div class="content" v-else>暂无文章</div>
      <div class="pages">
        <el-pagination
          v-model:page-size="pageSize"
          v-model:current-page="currentPage"
          v-model:total="totlePages"
          :pager-count="7"
          layout="prev, pager, next"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script setup name="more_reading" lang="ts">
interface story {
  id: number
  words: Array<string>
  title: string
  title_translation: string
  story: string
  translation: string
}
import { ref, reactive, onMounted } from 'vue'
import storyDB from '@/utils/storyDB'
import { RouterLink } from 'vue-router'
const storys: Array<story> = reactive([
  { id: 0, words: [], title: '', title_translation: '', story: '', translation: '' }
])
const pageSize = 20
const totlePages = ref(1)
const currentPage = ref(1)
const loading = ref(true)
const haveStorys = ref(false)
async function handleCurrentChange() {
  //拷贝
  const storysDB_content = await storyDB.getAllStorys()
  if (storysDB_content.length != 0) haveStorys.value = true
  Object.assign(storys, storysDB_content)
  totlePages.value = storysDB_content.length / pageSize + 1
  console.log('当前页：', currentPage.value)
}
onMounted(async () => {
  try {
    handleCurrentChange()
  } catch (error) {
    console.error('初始化失败', error)
  } finally {
    loading.value = false
  }
})
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 1%;
  display: flex;
  flex-direction: column;
}
.content {
  width: 100%;
  overflow-y: auto;
  flex: 1;
  margin-bottom: 10px;
}
.pages {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px 0;
}
</style>
