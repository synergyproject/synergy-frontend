import '@/assets/styles/app.scss';
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueTheMask from 'vue-the-mask'

Vue.config.productionTip = false
Vue.use(VueTheMask)

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    
    if (!store.state.auth.token) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
