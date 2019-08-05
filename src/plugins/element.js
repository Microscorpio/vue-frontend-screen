import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Dialog,
  Checkbox,
  Message
} from 'element-ui';

Vue.use(Dialog)
Vue.use(Checkbox)
Vue.prototype.$message = Message
