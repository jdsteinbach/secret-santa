import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useExchangeStore = defineStore('exchange', () => {
  const isLoading = ref(true)
  const families = ref([])
  const latestExchange = ref({})
  const error = ref()

  const getExchanges = async (): void => {
    try {
      await fetch('/.netlify/functions/exchange', {
        method: 'GET',
      })
        .then((response) => response.json())
        .then((response) => {
          isLoading.value = false
          families.value = response.families

          const lastYearsExchange = response.assignments.reduce((acc, assignment) => {
            return parseInt(acc?.year, 10) > parseInt(assignment.year, 10) ? acc : assignment
          }, {})

          latestExchange.value = {
            ...lastYearsExchange,
            year: parseInt(lastYearsExchange.year, 10),
          }
        })
    } catch (e) {
      console.error(e)
      isLoading.value = true
      families.value = []
      assignments.value = []
      error.value = e
    }
  }

  if (isLoading.value) {
    getExchanges()
  }

  return { latestExchange, families, isLoading, error }
})
