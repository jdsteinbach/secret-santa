<script lang="ts" setup>
import { defineProps } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { RouterLink } from 'vue-router'

interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'App Title',
})

const auth = useAuthStore()
</script>

<template>
  <header>
    <h1>{{ title }}</h1>
    <button v-if="auth.isAuthenticated" type="button" @click.prevent="auth.logout">Logout</button>
    <RouterLink v-if="auth.isAdmin" to="new">New Exchange</RouterLink>
  </header>
</template>

<style lang="scss" scoped>
header {
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  display: grid;
  grid-template:
    'title logout' min-content
    'title generate' min-content /
    1fr auto;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
  border-bottom: 1px solid currentColor;
}

h1 {
  grid-area: title;
  line-height: 1.2;
}

button {
  grid-area: logout;
}

a {
  grid-area: generate;
}
</style>
