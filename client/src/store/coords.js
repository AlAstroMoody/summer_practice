export default {
  namespaced: true,
  state: {
    coordinate: {
      latitude: false,
      longitude: false
    }
  },
  getters: {
    latitude: state => state.coordinate.latitude,
    longitude: state => state.coordinate.longitude,
  },
  mutations: {
    setCoordinates(state, payload) {
      state.coordinate = payload;
    }
  },
  actions: {
    async findCoordinates({ commit }, payload) {
      commit("setCoordinates", payload);
    }
  }
};
