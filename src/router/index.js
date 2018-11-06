import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user'
import rolt from '@/views/rolt'
import roltList from '@/views/roltList'
import goods from '@/views/goods'
import params from '@/views/params'
import categories from '@/views/categories'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: User
        },
        {
          name: 'roles',
          path: '/roles',
          component: rolt
        },
        {
          name: 'rights',
          path: '/rights',
          component: roltList
        },
        {
          name: 'goods',
          path: 'goods',
          component: goods
        },
        {
          name: 'params',
          path: 'params',
          component: params
        },
        {
          name: 'categories',
          path: 'categories',
          component: categories
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  if(to.name === 'login'){
    next()
  } else {
    const token = sessionStorage.getItem('token')
    if (!token) {
      // Message.warning('请先登录')
      router.push({name: 'login'})
      return
    } else {
    next()
  }
  }
})
export default router
