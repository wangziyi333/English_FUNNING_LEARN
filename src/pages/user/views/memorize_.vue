<template>
  <div class="container">
    <h1>趣味记忆法</h1>
    <p class="logic">通过联想记忆法快速记住单词含义</p>
    <div class="border_">
      <div class="left_"><span class="iconfont icon-brain-2-fill"></span></div>
      <div class="right_">
        <h2>单词：<span>Perseverance</span></h2>
        <p class="meaning">词义<span>坚持不懈，不屈不挠</span></p>
        <div class="skill">
          <p>
            <strong>记忆技巧：</strong
            ><span
              >想象一个“人（person）”在“严重（severe）”的困难面前“坚持（ance）”不放弃的场景。</span
            >
          </p>
        </div>
        <p class="example-sentence">
          例句：<span
            >His <strong>perseverance</strong> in the face of adversity was truly inspring.</span
          >
        </p>
      </div>
    </div>
    <div class="card">
      <strong>Perseverance</strong>
      <p>/发音/</p>
      <span class="iconfont icon-laba-xianxing"></span>
    </div>
    <div class="reading">
      <RouterLink to="/home/reading">
        <h3>阅读文章</h3>
      </RouterLink>
    </div>
  </div>
</template>
<script setup lang="ts" name="memorize_">
import { RouterLink } from 'vue-router'
</script>
<style scoped></style>
