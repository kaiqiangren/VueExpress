import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: resolve => require(['@/pages/index'], resolve)
    },
    {
      path: '/three',
      name: 'three',
      component: resolve => require(['@/pages/three'], resolve)
    },
    {
      path: '/canvas',
      name: 'canvas',
      component: resolve => require(['@/pages/canvas'], resolve)
    },
    {
      path: '/chartTest',
      name: 'chartTest',
      component: resolve => require(['@/pages/chartTest'], resolve)
    },
    {
      path: '/navMenu',
      name: 'navMenu',
      component: resolve => require(['@/pages/navMenu'], resolve)
    }
  ]
})
