import { createRouter, createWebHashHistory } from 'vue-router'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import NewProduct from '../views/NewProduct.vue'
import NewCategory from '../views/NewCategory.vue'
import Orders from '../views/Orders.vue'
import OrderDetails from '../views/OrderDetails.vue'
import Products from '../views/Products.vue'


const routes = [
  
  {
    path: '/',
    name: 'Home',
    redirect: '/products'
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
    path: '/new-product',
    name: 'NewProduct',
    component: NewProduct
  },
  {
    path: '/new-category',
    name: 'NewCategory',
    component: NewCategory
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/orders/:id',
    name: 'OrderDetails',
    component: OrderDetails,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
