<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
const router = useRouter()

const password = ref('')

const tryAuth = () => {
  auth.tryAuthenticating(password.value)
  password.value = ''
  if (auth.isAuthenticated) {
    router.push({
      name: 'home',
    })
  }
}
</script>

<template>
  <form @submit.prevent="tryAuth">
    <label for="password">Enter the password to view personalized content.</label>
    <input
      type="password"
      id="password"
      v-model="password"
      :aria-describedby="auth.tryAuthenticatingResult ? 'field-error' : ''"
    />
    <p id="field-error" v-if="auth.tryAuthenticatingResult">{{ auth.tryAuthenticatingResult }}</p>
    <button :disabled="password === ''">Submit</button>
  </form>
</template>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  font-size: 1.25rem;

  * {
    font-size: inherit;
  }
}
</style>
