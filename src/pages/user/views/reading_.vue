<template>
  <div class="container">
    <div class="content">
      <h2>{{ currentStory.title }}</h2>
      <p>{{ currentStory.story }}</p>
      <hr />
      <h2>{{ currentStory.title_translation }}</h2>
      <p>{{ currentStory.translation }}</p>
    </div>
  </div>
</template>
<script lang="ts" name="reading_" setup>
interface story {
  id: number
  words: string | Array<string>
  title: string
  title_translation: string
  story: string
  translation: string
}
import { useStoryStore } from '@/store/dataStore'
const currentStory: story = useStoryStore().currentStory
</script>
<style scoped></style>
