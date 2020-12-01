import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Main from '../components/Main.vue'
import Authorization from '../components/Authorization.vue'
import PlayerPage from '../components/PlayerPage.vue'
import PageLine from '../components/PageLine.vue'
import PageGoal from '../components/PageGoal.vue'
import Logout from '../components/Logout.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
	    name: 'Login',
	    component: Login
	},
	{
		path: '/main',
		name: 'Main',
		component: Main,
		meta: {
			requiresAuth: true
		}	
	},
	{
		path: '/authorization',
	    name: 'Authorization',
		component: Authorization,
	},
	{
		path: '/logout',
	    name: 'Logout',
	    component: Logout		
	},
	{
		path: '/page',
	    name: 'PlayerPage ',
	    component: PlayerPage 
	},
	{
		path: '/page/line',
	    name: 'PageLine',
	    component: PageLine
	},
	{
		path: '/page/goal',
	    name: 'PageGoal',
	    component: PageGoal
	}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
