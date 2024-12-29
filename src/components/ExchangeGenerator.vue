<script setup lang="ts">
import { computed } from 'vue'
import { useExchangeStore } from '@/stores/exchange'
const exchange = useExchangeStore()

const nextYear = computed(() => exchange.latestExchange?.year + 1)

const lastAssignment = computed(() => exchange.latestExchange?.assignment)

const allKids = computed(() =>
  exchange.families.reduce((all, f) => {
    return [...all, ...f]
  }, []),
)

const prunedList = (kid, currentList) => {
  return allKids.value.filter((k) => {
    return (
      k !== kid &&
      !exchange.families.find((f) => f.includes(kid))?.includes(k) &&
      k !== lastAssignment.value[kid] &&
      !Object.values(currentList)?.includes(k)
    )
  })
}

const pickRandom = (arr) => {
  const index = Math.floor(Math.random() * arr.length)
  return arr[index]
}

const thisAssignment = computed(() => {
  let newAssignment = {}

  const createAssignments = () => {
    const createdAssignment = {}
    for (const kid in lastAssignment.value) {
      createdAssignment[kid] = pickRandom(prunedList(kid, createdAssignment))
    }
    return createdAssignment
  }

  newAssignment = createAssignments()
  let retries = 0

  while (
    Object.values(newAssignment).filter((x) => x).length < Object.keys(newAssignment).length &&
    retries < 30
  ) {
    newAssignment = createAssignments()
    retries++
  }
  return newAssignment
})

const copyJson = computed(() => () => {
  if (Object.keys(thisAssignment).length) {
    navigator.clipboard.writeText(JSON.stringify(thisAssignment.value, null, 2))
  } else {
    aler('No assignments available')
  }
})
</script>

<template>
  <h3>New Year: {{ nextYear }}</h3>
  <p v-if="exchange.loading">Loading...</p>
  <template v-else-if="Object.keys(thisAssignment).length">
    <ul>
      <li v-for="(recipient, giver) in thisAssignment" :key="`${giver}-${recipient}`">
        <i>{{ giver }}</i> is giving to <del>{{ lastAssignment[giver] }}</del
        >{{ ' ' }} <i>{{ recipient }}</i
        >.
      </li>
    </ul>
    <button @click="copyJson">Copy Assignments</button>
  </template>
  <p v-else>Calculating...</p>
</template>
