import Vue from 'vue'
import App from './App.vue'
import router from './router'
import "./base/common.styl"
import './plugins/element.js'
import http from './plugins/axios.js'

Vue.config.productionTip = false
Vue.prototype.$http = http
new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
