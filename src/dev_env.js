import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'

import axios from 'axios'



axios.defaults.baseURL = 'https://rest.apizza.net/mock/0ae54bb2f4f01b984a5c265147e48e3f/'
    
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')




