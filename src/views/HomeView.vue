<script setup lang="ts">
import KidsAssignments from '@/components/KidsAssignments.vue'

import { computed } from 'vue'
import { useExchangeStore } from '@/stores/exchange'
const exchange = useExchangeStore()

const lastYear = computed(() => exchange.latestExchange?.year)
</script>

<template>
  <main>
    <h2>Sibs' & SiLs' Exchange</h2>
    <p><b>Price:</b> $30</p>
    <p>Assignments and wishlists are at <a href="https://www.elfster.com/a/log-in/">Elfster</a>.</p>
    <h2>Kids' Exchange</h2>
    <p><b>Price:</b> $15-20</p>
    <p>
      Kids' details are available in our shared
      <a
        href="https://docs.google.com/spreadsheets/d/1UnfHgAiZ8Waj10gLY9APzmPkFhl5o7i8W0UaMODb9IM/edit"
        >Google sheet</a
      >.
    </p>
    <h3>{{ lastYear }} Exchange</h3>
    <KidsAssignments />
  </main>
</template>
