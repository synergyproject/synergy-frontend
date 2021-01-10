import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

export default {
	state: {
		invitationParameters: {},
		authorizationToken: '',
		statusCode: 0
	},
	mutations: {
		"SET_INVITATION_PARAMETERS"(state, payload) {
			state.invitationParameters = payload;
		},
		"SET_AUTHORIZATION_TOKEN"(state, payload) {
			state.authorizationToken = payload;
		},
		"SET_STATUS_CODE_FROM_SERVER"(state, payload) {
			state.statusCode = payload;
		}
	},
	actions: {
		'SEND_INVITATION_TOKEN'({ commit }, payload) {
			return axios
        .get(
          `http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/invitations/${payload}`
        )
        .then((response) => {
			  commit("SET_INVITATION_PARAMETERS", response.data);
			  commit("SET_AUTHORIZATION_TOKEN", response.headers.authorization);
			  commit("SET_STATUS_CODE_FROM_SERVER", response.status)
			  return response;
			})
			.catch((error) => {
				throw error;
			});
		},
		'SEND_DATA_TO_CREATE_ACCOUNT'({ commit, state }, payload) {
			return axios.post("http://ec2-3-127-40-46.eu-central-1.compute.amazonaws.com:8090/signup", payload, {
				headers: {
				  "Content-Type": "application/json",
				  Authorization: state.authorizationToken
				}
			})
			.then(response => {
				commit("SET_STATUS_CODE_FROM_SERVER", response.status)
				return response
			})
			.catch(error => {
				throw error;
			});
		}
	},
	getters: {
		"GET_INVITATION_PARAMETERS"(state) {
      		return state.invitationParameters;
		},
		"GET_AUTHORIZATION_TOKEN"(state) {
			return state.authorizationToken;
		},
		"GET_STATUS_CODE_FROM_SERVER"(state) {
			return state.statusCode;
		}
	}
};