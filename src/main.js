// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Axios from 'axios'
import vueAxios from 'vue-axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 导入全局样式表
import './assets/css/global.css'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入弹框提示组件
import {Message} from 'element-ui'


Vue.use(ElementUI);
//配置请求的根路径
// Axios.defaults.baseURL = 'http://192.168.1.116:3000/users'
Vue.prototype.$http=Axios
Vue.use(vueAxios,Axios)
Vue.prototype.$message = Message
Vue.config.productionTip = false
// eslint-disable no-new 
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
