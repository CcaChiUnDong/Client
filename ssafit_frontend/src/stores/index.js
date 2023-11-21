import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import useAuthStore from "./module.js";

const persistedState = createPersistedState({
  paths: ["token", "id", "name", "email"],
});

export default new Vuex.Store({
  state: useAuthStore.state,
  getters: useAuthStore.getters,
  mutations: useAuthStore.mutations,
  actions: useAuthStore.actions,
  plugins: [persistedState],
});
