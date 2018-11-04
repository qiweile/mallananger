import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/login'
import Home from '@/views/home'
import User from '@/views/user'
import rolt from '@/views/rolt'
import roltList from '@/views/roltList'

Vue.use(Router)

export default new Router({
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
          name: 'rolt',
          path: '/rolt',
          component: rolt
        },
        {
          name: 'right',
          path: '/right',
          component: roltList
        }
      ]
    }
  ]
})
