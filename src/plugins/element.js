import Vue from 'vue';
import 'element-ui/lib/theme-chalk/index.css';
import {
  Dialog,
  Checkbox,
  Message,
  Table,
  TableColumn
} from 'element-ui';

Vue.use(Dialog)
Vue.use(Checkbox)
Vue.use(Table)
Vue.use(TableColumn)
Vue.prototype.$message = Message
