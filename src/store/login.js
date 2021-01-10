import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

export default {
	state: {
		invitationParameters: {}
	},
	mutations: {
		'SET_INVITATION_PARAMETERS'(state, payload) {
      	state.invitationParameters = payload;
    	}
	},
	// Z6t_hsUDTE
	actions: {
		'SEND_INVITATION_TOKEN'({ commit }, payload) {
			return axios
        .get(
          `http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/invitations/${payload}`
        )
        .then((response) => {
          console.log(response);
          commit("SET_INVITATION_PARAMETERS", response.data);
          return response;
        })
        .catch((error) => {
          throw error;
        });
    	}
	},
	getters: {
		GET_INVITATION_PARAMETERS(state) {
      	return state.invitationParameters;
    	}
	}
};