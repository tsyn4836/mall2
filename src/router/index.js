import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/home',
    component: () => import('views/home'),
    children: [
      {
        name: 'home-product',
        path: 'product/:id',
        component: () => import('views/product')
      }
    ]
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('views/category')
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('views/cart/')
  },
  {
    name: 'personal',
    path: '/personal',
    component: () => import('views/personal/')
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('views/search/')
  },
  {
    path: '*',
    redirect: '/home'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
