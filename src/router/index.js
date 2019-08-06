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
        component: resolve => require(['@/views/page/index'], resolve),
        meta: {
          title: '智慧数据大屏 大屏展示_1'
        }
      },
      {
        path: 'index2',
        name: 'index2',
        component: resolve => require(['@/views/page2/index'], resolve),
        meta: {
          title: '智慧数据大屏 大屏展示_2'
        }
      },
      {
        path: 'index3',
        name: 'index3',
        component: resolve => require(['@/views/page3/index'], resolve),
        meta: {
          title: '智慧数据大屏 大屏展示_3'
        }
      },
      {
        path: 'index4',
        name: 'index4',
        component: resolve => require(['@/views/page4/index'], resolve),
        meta: {
          title: '智慧数据大屏 大屏展示_4'
        }
      },
      {
        path: 'index5',
        name: 'index5',
        component: resolve => require(['@/views/page5/index'], resolve),
        meta: {
          title: '智慧数据大屏 大屏展示_5'
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