import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorization from '@/components/Authorization.vue'
import Logout from '@/components/Logout.vue'
import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'
import Calendar from '@/components/calendar/Calendar.vue'
import PageLine from '@/components/PageLine.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'Authorization',
		component: Authorization
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
		path: '/login',
		name: 'Login',
		component: Login
	},
	
	{
		path: '/line',
	    name: 'PageLine',
	    component: PageLine,
	    meta: {
			requiresAuth: true
		}
	},
	{
		path: '/calendar',
	    name: 'Calendar',
	    component: Calendar,
		meta: {
			requiresAuth: true
		}
	},
	{
		path: '/logout',
		name: 'Logout',
		component: Logout
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
