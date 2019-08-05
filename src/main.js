import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import '@/plugins/element'
import '@/assets/style/style.less'

Vue.config.productionTip = false

Vue.component('panel', resolve => {require(['@/components/common/panel.vue'], resolve)})
Vue.component('empty', resolve => {require(['@/components/common/empty.vue'], resolve)})
Vue.component('img-box', resolve => {require(['@/components/common/imgBox.vue'], resolve)})

Vue.directive('load-image', {
  bind: function (el, binding) {
    el.onerror = function () {
      el.src = require('@/assets/image/placeholder.png')
      el.classList = 'defaultImg'
    };
    el.src = binding.value
  },
  update: function (el, binding) {
    if (binding.value !== binding.oldValue) {
      el.src = binding.value
    }
  }
});

/* eslint-disable no-unused-vars */
const vm = new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')

export default vm
