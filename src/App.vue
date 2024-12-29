<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from './components/AppHeader.vue'
</script>

<template>
  <AppHeader title="Secret Santa Exchange" />
  <router-view />
</template>

<style lang="scss" scoped>
#app {
  margin: 1rem auto;
  max-width: 75ch;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
