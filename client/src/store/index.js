import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

import {
  getPlaces,
  addNewPlace,
  removeThisPlace,
  editThisPlace,
  getPlacesThisOwner,
  getPlace
} from "../api/pagesRequests/places";
import {
  addNewDish,
  removeThisDish,
  editThisDish,
  getOurDishes
} from "../api/pagesRequests/dishes";
import {
  addNewIngredient,
  getIngredients
} from "../api/pagesRequests/ingredients";
import { authUser, registerUser } from "../api/pagesRequests/users";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    places: [],
    dishes: [],
    token: {
      token: localStorage.getItem("token") || "",
      user: {
        pk: "",
        username: ""
      }
    },
    statusAuth: false,
    coordinate: {
      latitude: false,
      longitude: false
    },
    place: {}
  },
  mutations: {
    SET_PLACES: (state, places) => {
      state.places = places;
    },
    ADD_PLACE: (state, place) => {
      state.places.push(place);
    },
    EDIT_PLACE: (state, place) => {
      const index = state.places.findIndex(
        original => original.id === place.id
      );
      state.places.splice(index, 1, place);
    },
    REMOVE_PLACE: (state, place) => {
      const index = state.places.indexOf(place);
      state.places.splice(index, 1);
    },
    SET_DISHES: (state, dishes) => {
      state.dishes = dishes;
    },
    ADD_DISH: (state, dish) => {
      state.dishes.push(dish);
    },
    EDIT_DISH: (state, dish) => {
      const index = state.dishes.findIndex(original => original.id === dish.id);
      state.dishes.splice(index, 1, dish);
    },
    REMOVE_DISH: (state, dish) => {
      const index = state.dishes.indexOf(dish);
      state.dishes.splice(index, 1);
    },
    SET_INGREDIENTS: (state, ingredients) => {
      state.ingredients = ingredients;
    },
    ADD_INGREDIENT: (state, ingredient) => {
      state.ingredients.push(ingredient);
    },
    AUTH_USER: (state, token) => {
      state.token = token;
      state.statusAuth = true;
    },
    LOGOUT: state => {
      state.token.token = "";
      state.token.user.username = "";
      state.token.user.pk = "";
      state.statusAuth = false;
      state.places = [];
      state.dishes = [];
      state.coordinate.latitude = false;
      state.coordinate.longitude = false;
    },
    REGISTER_USER(state) {
      state.statusAuth = true;
    },
    ERROR(state) {
      state.statusAuth = false;
    },
    SET_COORDINATES(state, data) {
      state.coordinate = data;
    },
    CURRENT_PLACE(state, place) {
      state.place = place;
    }
  },
  actions: {
    async getListPlaces({ commit }) {
      commit("SET_PLACES", await getPlaces());
    },
    async getMyPlaces({ commit }, id) {
      commit("SET_PLACES", await getPlacesThisOwner(id));
    },
    async addPlace({ commit }, params) {
      commit("ADD_PLACE", await addNewPlace(params));
    },
    async removePlace({ commit }, id) {
      commit("REMOVE_PLACE", await removeThisPlace(id));
    },
    async editPlace({ commit }, params) {
      commit("EDIT_PLACE", await editThisPlace(params));
    },
    async addDish({ commit }, params) {
      commit("ADD_DISH", await addNewDish(params));
    },
    async getDishesThisPlace({ commit }, id) {
      commit("SET_DISHES", await getOurDishes(id));
    },
    async removeDish({ commit }, id) {
      commit("REMOVE_DISH", await removeThisDish(id));
    },
    async editDish({ commit }, params) {
      commit("EDIT_DISH", await editThisDish(params));
    },
    async getListIngredients({ commit }) {
      commit("SET_INGREDIENTS", await getIngredients());
    },
    async addIngredient({ commit }, params) {
      commit("ADD_INGREDIENT", await addNewIngredient(params));
    },
    async auth({ commit }, user) {
      commit("AUTH_USER", await authUser(user));
    },
    async logout({ commit }) {
      commit("LOGOUT");
      localStorage.removeItem("token");
    },
    async registerNewUser({ commit }, user) {
      try {
        commit("REGISTER_USER", await registerUser(user));
        commit("AUTH_USER", await authUser(user));
      } catch {
        commit("ERROR");
      }
    },
    async findCoordinates({ commit }, data) {
      commit("SET_COORDINATES", data);
    },
    async getCurrentPlace({ commit }, id) {
      commit("CURRENT_PLACE", await getPlace(id));
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});
