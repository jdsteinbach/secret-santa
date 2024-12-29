<script setup lang="ts">
import KidsAssignments from '@/components/KidsAssignments.vue'
import ExchangeGenerator from '@/components/ExchangeGenerator.vue'

import { computed } from 'vue'
import { useExchangeStore } from '@/stores/exchange'
const exchange = useExchangeStore()

const lastYear = computed(() => exchange.latestExchange?.year)
</script>

<template>
  <main>
    <h2>Generate New Exchange</h2>
    <details>
      <summary>
        <h3>Last Year: {{ lastYear }}</h3>
      </summary>
      <KidsAssignments />
    </details>
    <ExchangeGenerator />
  </main>
</template>

<style lang="scss" scoped>
summary {
  gap: 1ch;
  display: flex;
  align-items: center;

  &::before {
    display: inline-block;
    content: '▷';
    width: 1.5ch;
  }

  details[open] &::before {
    content: '▿';
  }
}
</style>
