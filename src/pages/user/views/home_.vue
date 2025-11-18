<template>
  <div class="container">
    <div class="top">
      <h1>英语单词记忆之旅</h1>
      <p>通过趣味记忆和文章应用，轻松掌握英语词汇</p>
    </div>
    <div class="main">
      <span class="iconfont icon-peiwangyindao"></span>
      <h1>开启你的学习之旅</h1>
      <p>每天学习<span>10</span>个单词即可完成当日任务</p>
      <div class="study">
        <RouterLink to="/user/memorize"
          ><h2><span class="iconfont icon-ai23"></span>开始今日学习</h2>
        </RouterLink>
      </div>
      <!-- <div class="review">
        <RouterLink to="/user/review" :onclick="flag"
          ><h2><span class="iconfont icon-danxunhuan"></span>复习！</h2></RouterLink
        >
      </div> -->
      <div class="review" @click="handleReview">
        <h2><span class="iconfont icon-danxunhuan"></span>复习！</h2>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts" name="home_">
import { RouterLink, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import wordsDB from '@/utils/db'
import { onMounted } from 'vue'
// async function flag(event: Event) {
//   const reviewWords = await wordsDB.getTodayReviewWords()
//   if (reviewWords instanceof Array) {
//     if (reviewWords.length === 0) {
//       event.preventDefault()
//       ElMessage.error('当前没有需要复习的单词！')
//     }
//   } else {
//     console.log('从数据库获取的复习单词不是数组')
//   }
// }
const router = useRouter()
async function handleReview() {
  try {
    const reviewWords = await wordsDB.getTodayReviewWords()
    if (reviewWords instanceof Array) {
      if (reviewWords.length === 0) {
        ElMessage.error('当前没有需要复习的单词！')
        return // 直接返回，不进行跳转
      } else {
        // 有复习单词时进行跳转
        router.push('/user/review')
      }
    } else {
      console.log('从数据库获取的复习单词不是数组')
      ElMessage.error('数据加载失败，请重试！')
    }
  } catch (error) {
    console.error('检查复习单词失败', error)
    ElMessage.error('检查复习单词失败，请重试！')
  }
}
onMounted(async () => {
  try {
    await wordsDB.init()
  } catch (error) {
    console.error('初始化单词数据库失败', error)
  }
})
</script>
<style scoped>
.container {
  padding-left: 5%;
  padding-top: 1%;
}
.top h1 {
  margin-bottom: 1%;
  font-size: 35px;
  color: #4483ef;
}
.top p {
  font-size: 20px;
  color: #5e616c;
}
.main {
  margin-top: 3%;
  text-align: center;
}
.main .icon-peiwangyindao {
  font-size: 90px;
  color: #4483ef;
}
.main > h1 {
  margin-top: 1.5%;
  margin-bottom: 1%;
  color: #1c2a39;
  font-size: 25px;
}
.main > p {
  color: #464d4d;
  font-size: 20px;
  margin-bottom: 3%;
}
.main .study,
.main .review {
  /* margin-bottom: 28px; */
  width: 50%;
  height: 10%;
  border-radius: 20px;
  box-shadow: 2px 3px 3px 3px rgb(227, 224, 224);
  margin: 1% auto;
  line-height: 420%;
  transition: all 0.3s;
  cursor: pointer;
}
.main .icon-danxunhuan,
.main .icon-ai23 {
  font-size: larger;
  margin-right: 2%;
}
.main .study {
  background-color: #4783f6;
}
.main .study h2 {
  font-size: 20px;
  color: #fff;
}
.main .review h2 {
  font-size: 20px;
  color: black;
}
.main .review {
  background-color: #f6be1e;
}
.main .study:hover {
  background-color: #3165eb;
  width: 51%;
}
.main .review:hover {
  background-color: #f4ac0d;
  width: 51%;
}
</style>
