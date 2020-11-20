import {
  addNewPlace,
  editThisPlace,
  getPlaces,
  removeThisPlace
} from "@/api/pagesRequests/places";
import {distanceFromPlace} from "@/components/utils/distanceFromPlace";

export default {
  namespaced: true,
  state: {
    places: [],
    currentPlace: {}
  },
  getters: {
    all: state => state.places,
    current: state => state.currentPlace
  },
  mutations: {
    setPlaces: (state, places) => {
      state.places = places;
    },
    setSortedPlaces: (state) => {
      state.places.forEach(place => place.distance = distanceFromPlace(
          place.latitude_deg,
          place.longitude_deg
      ));
      function compare(a, b) {
        if (Number(a.distance) < Number(b.distance)) {
          return -1;
        }
        if (Number(a.distance) > Number(b.distance)) {
          return 1;
        }
        return 0;
      }
      state.places.sort(compare);
    },
    addPlace: (state, place) => {
      state.places.push(place);
    },
    editPlace: (state, place) => {
      const index = state.places.findIndex(
        original => original.id === place.id
      );
      state.places.splice(index, 1, place);
    },
    removePlace: (state, place) => {
      const index = state.places.indexOf(place);
      state.places.splice(index, 1);
    },
    updateField: (state, { fieldName, updateValue }) => {
      state.currentPlace[fieldName] = updateValue;
    },
    currentPlace: (state, id) => {
      let place = state.places.find(r => r.id === id);
      place
        ? (state.currentPlace = place)
        : (state.currentPlace = {
            name: "",
            address: "",
            photo: "",
            to_hour: "",
            from_hour: ""
          });
    }
  },
  actions: {
    async setPlaces({ commit }) {
      commit("setPlaces", await getPlaces());
    },
    async addPlace({ commit }, params) {
      commit("addPlace", await addNewPlace(params));
    },
    async removePlace({ commit }, id) {
      commit("removePlace", await removeThisPlace(id));
    },
    async editPlace({ commit }, params) {
      commit("editPlace", await editThisPlace(params));
    },
    async currentPlace({ commit }, id) {
      commit("currentPlace", id);
    },
    async updateField({ commit }, { fieldName, updateValue }) {
      commit("updateField", { fieldName, updateValue });
    },
    async setSortedPlaces({ commit }) {
      commit("setSortedPlaces");
    }
  }
};
