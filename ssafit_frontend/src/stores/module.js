import axios from "axios";
import router from "../router";

const state = {
  token: null,
  id: null,
  name: null,
  email: null,
  name: null,
};

const getters = {
  token: (state) => state.token,
  id: (state) => state.id,
  email: (state) => state.email,
  name: (state) => state.name,
};

const mutations = {
  login(state, item) {
    state.token = item.headers["accesstoken"];
    state.id = item.data["id"];
    state.email = item.data["email"];
    state.name = item.data["name"];
  },
  logout(state) {
    state.token = null;
    state.id = null;
    state.email = null;
    state.name = null;
  },
};

const actions = {
  login({ commit }, { email, password }) {
    const params = {
      email: email,
      password: password,
    };
    axios
      .post("http://localhost:8080/login", JSON.stringify(params), {
        headers: { "content-type": "application/json" },
      })
      .then((res) => {
        alert("정보가 확인되었습니다.\n환영합니다!");
        commit("login", res);
        router.push({ name: "home" });
      })
      .catch((e) => {
        console.log(e);
        alert("로그인 요청에 문제가 발생했습니다.");
      });
  },
  logout({ commit }) {
    commit("logout");
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
