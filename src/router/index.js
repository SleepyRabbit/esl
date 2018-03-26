import Vue from 'vue'
import Router from 'vue-router'
import upload from '@/components/upload'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'upload',
      component: upload
    }
  ]
})
