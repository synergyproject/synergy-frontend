import Vue from 'vue';
import Vuex from 'vuex';
import line from './line.js';
import auth from './auth.js';
import games from './games.js';
import calendar from './calendar.js';
import user from './user.js';
import login from './login.js';
import coaches from './coaches.js';
import layout from './layout.js';

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        auth,
        games,
        line,
        calendar,
        user,
        login,
        coaches,
        layout
    },
});

