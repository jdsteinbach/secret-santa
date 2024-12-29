<script setup lang="ts">
import { useExchangeStore } from '@/stores/exchange'
const exchange = useExchangeStore()
</script>

<template>
  <p v-if="exchange.isLoading">Loading...</p>
  <ul v-else>
    <li
      v-for="(recipient, giver) in exchange.latestExchange?.assignment"
      :key="`${giver}-${recipient}`"
    >
      <i>{{ giver }}</i> is giving to <i>{{ recipient }}</i
      >.
    </li>
  </ul>
</template>
