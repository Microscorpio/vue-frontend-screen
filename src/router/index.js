import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
    component: resolve => require(['@/layout/layout'], resolve),
    children: [
      {
        path: 'index',
        name: 'index',
        component: resolve => require(['@/views/index/index'], resolve),
        meta: {
          title: ''
        }
      }
    ]
  }
]

const router = new VueRouter({routes})

router.beforeResolve((to, from, next) => {
  to.matched.some(record => {
    if (record.meta) {
      if (record.meta.title) {
        document.title = record.meta.title
      }
    }
  })
  next()
})

export default router