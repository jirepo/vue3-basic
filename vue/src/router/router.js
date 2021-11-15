import { createWebHistory, createRouter } from 'vue-router';
import UserHome from '@/components/c15/UserHome.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/components/c15/Home.vue'), // 동적 import
  },
  {
    path: '/login/:id',
    name: 'Login',
    component: () => import('@/components/c15/Login.vue'), // 동적 import
  },
  {
    path: '/user/:id',
    name: 'User',
    component: () => import('@/components/c15/User.vue'),
    children: [
      {
        path: '',
        component: () => import('@/components/c15/UserHome.vue')
      },
      {
        path: 'profile',
        component: () => import('@/components/c15/Profile.vue')
      },
      {
        path: 'posts',
        component: () => import('@/components/c15/Posts.vue')
      }
    ]
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

