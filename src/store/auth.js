export default {    
    state: {
        token: localStorage.getItem('token') || null,
    },

    actions: {
        SET_TOKEN(context, payload){
            localStorage.setItem('token', payload);
            context.commit('SET_TOKEN',payload)
        },

        LOG_OUT(context){
            localStorage.removeItem('token');
            context.commit('SET_TOKEN',null)
        }        
    },

    mutations: {
        SET_TOKEN(state, payload){
            state.token = payload
        }
    }
}