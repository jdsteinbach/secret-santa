import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import differenceInDays from 'date-fns/differenceInDays'

const LOCALSTORAGE_AUTH_KEY = 'authState'

const getDefaultAuth = () => ({
  isAuthenticated: false,
  isAdmin: false,
})

const getLocalAuth = () => {
  let authenticated = false
  let admin = false
  const authFromLocalStorage = localStorage.getItem(LOCALSTORAGE_AUTH_KEY)
  try {
    const authState = JSON.parse(authFromLocalStorage)

    const dateDiff = differenceInDays(authState?.date, new Date())
    if (dateDiff < -8) {
      localStorage.removeItem(LOCALSTORAGE_AUTH_KEY)
    } else {
      authenticated = authState?.authenticated ?? false
      admin = authState?.admin ?? false
    }
  } catch (e) {
    console.error(e)
  }
  return { authenticated, admin }
}

const setLocalAuth = (authenticated, admin) => {
  if (authenticated) {
    localStorage.setItem(
      LOCALSTORAGE_AUTH_KEY,
      JSON.stringify({
        authenticated,
        admin,
        date: new Date(),
      }),
    )
  } else {
    localStorage.removeItem(LOCALSTORAGE_AUTH_KEY)
  }
}

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const storedAuth = getLocalAuth() || getDefaultAuth()
  const isAuthenticated = ref(storedAuth.authenticated)
  const isAdmin = ref(storedAuth.admin)
  const tryAuthenticatingResult = ref('')

  const tryAuthenticating = async (pwd: string): void => {
    try {
      await fetch('/.netlify/functions/pwd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pwd }),
      })
        .then((response) => response.json())
        .then((response) => {
          const { authenticated = false, admin = false } = response

          isAuthenticated.value = authenticated
          isAdmin.value = admin

          if (authenticated) {
            setLocalAuth(authenticated, admin)

            router.push({
              name: 'home',
            })
          } else {
            tryAuthenticatingResult.value = 'Sorry, we were unable to log you in.'
          }
        })
    } catch (e) {
      console.error(e)
      isAuthenticated.value = false
      isdmin.value = false
      tryAuthenticatingResult.value = 'There was an error when you tried logging in.'
    }
  }

  const logout = () => {
    isAuthenticated.value = false
    isAdmin.value = false
    tryAuthenticatingResult.value = ''
    setLocalAuth(false)
    router.push({
      name: 'login',
    })
  }

  return { isAdmin, isAuthenticated, logout, tryAuthenticating, tryAuthenticatingResult }
})
