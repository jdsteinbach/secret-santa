import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/new',
      name: 'new',
      // route level code-splitting
      component: () => import('../views/GeneratorView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const { isAuthenticated } = useAuthStore()

  if (!isAuthenticated && to.name !== 'login') {
    return {
      name: 'login',
    }
  } else if (isAuthenticated && to.name === 'login') {
    return {
      name: 'home',
    }
  }
})
export default router
