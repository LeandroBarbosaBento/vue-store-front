import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Orders from '../views/Orders.vue'
import Products from '../views/Products.vue'


const routes = [
  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
