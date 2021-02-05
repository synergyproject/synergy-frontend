export default {
    state: {
        //для заблюривания левой части при вызове модалок
        primaryBlur: false
    },
    
    getters: {
        "GET_PRIMARY_BLUR" (state) {
            return state.primaryBlur;
        }
    },

    mutations: {
        "SET_PRIMARY_BLUR" (state, payload) {
            state.primaryBlur = payload;
        }
    }
}