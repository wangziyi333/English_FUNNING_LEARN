<script setup lang="ts" name="app">
import dictionary from './data/dictionary_CET6.json'
import storys from './data/story.json'
const wordList = dictionary.words
</script>
<template>
  <router-view :words="wordList" :storys />
</template>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  text-decoration: none;
  font-size: 18px;
  font-family: Microsoft YaHei, Heiti SC, tahoma, arial, Hiragino Sans GB, '\5B5B\4F53', sans-serif;
}
#app {
  width: 100%;
  height: 100vh;
}
</style>
