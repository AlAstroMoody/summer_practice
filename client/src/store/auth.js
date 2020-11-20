import {authUser, registerUser} from "@/api/pagesRequests/users";

export default {
  namespaced: true,
  state: {
    token: {
      token: localStorage.getItem("token") || "",
      user: {
        pk: "",
        username: ""
      }
    },
    statusAuth: false,
    error: false
  },
  getters: {
    username: state => state.token.user.username,
    statusAuth: state => state.statusAuth,
    error: state => state.error,
    pk: state => state.token.user.pk,
  },
  mutations: {
    authUser: (state, token) => {
      state.token = token;
      state.statusAuth = true;
    },
    logout: state => {
      state.token = {
        token: "",
        user: {
          pk: "",
          username: ""
        }
      }
      state.statusAuth = false;
    },
    registerUser(state) {
      state.statusAuth = true;
      state.error = false
    },
    error(state, error) {
      state.statusAuth = false;
      state.error = error;
    }
  },
  actions: {
    async auth({commit}, user) {
      commit("authUser", await authUser(user));
    },
    async logout({commit}) {
      commit("logout");
      localStorage.removeItem("token");
    },
    async registerNewUser({commit}, user) {
      try {
        let response = await registerUser(user);
        commit("registerUser", response);
        commit("authUser", response);
      } catch (error) {
        commit("error", error.message);
      }
    }
  }
};
