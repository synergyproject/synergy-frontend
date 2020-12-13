import Vue from 'vue'
import VueRouter from 'vue-router'
import Authorization from '@/components/Authorization.vue'
import Logout from '@/components/Logout.vue'
import Login from '@/components/Login.vue'
import Main from '@/components/Main.vue'
import Calendar from '@/components/calendar/Calendar.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
<<<<<<< HEAD
	    name: 'Authorization',
		component: Authorization
=======
		name: 'Login',
		component: Login
>>>>>>> 25da6fad6f59821bca55929a6cd4b722f2465413
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
<<<<<<< HEAD
		path: '/login',
	    name: 'Login',
	    component: Login
	},
	{
		path: '/logout',
	    name: 'Logout',
	    component: Logout		
	},
	{
		path: '/calendar',
	    name: 'Calendar',
	    component: Calendar,
		meta: {
			requiresAuth: true
		}		
=======
		path: '/authorization',
		name: 'Authorization',
		component: Authorization,
	},
	{
		path: '/logout',
		name: 'Logout',
		component: Logout
>>>>>>> 25da6fad6f59821bca55929a6cd4b722f2465413
	}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
