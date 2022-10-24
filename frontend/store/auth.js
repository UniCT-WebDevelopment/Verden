export const state = () => ({
  token: localStorage.getItem("access_token") || null,
  user: null,
});

export const getters = {
  accessToken: (state) => {
    return state.token;
  },
  isLogged: (state) => {
    return state.token != null;
  },
  me: (state) => {
    return state.user;
  },
};

export const mutations = {
  saveAccessToken: (state, value) => {
    localStorage.setItem("access_token", value);
    state.token = value;
  },
  // Remove access_token and credentials from the browser data
  logout: (state) => {
    localStorage.removeItem("access_token");
    state.token = null;
    state.user = null;
  },
  // Save user's informations from the endpoint `/me`
  saveUserInfo: (state, data) => {
    state.user = data;
  },
};

export const actions = {
  // Make the login and then save the credentials.
  async login({ commit }, credentials) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then(async (response) => {
        res.data = await response.json();
        res.status = response.status;
        if (res.status == 200) {
          commit("saveAccessToken", res.data.access_token);
        } else {
          commit("logout");
        }
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Make a signup request and then returns a dictionary with response
  // status and response data
  async signup({ commit }, credentials) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then(async (response) => {
        res.data = await response.json();
        res.status = response.status;

        if (res.status == 201) {
          commit("saveAccessToken", res.data.access_token);
        }
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Search my info
  async findMe({ commit, getters }) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getters.accessToken}`,
      },
    })
      .then(async (response) => {
        if (response.status == 200) {
          res.data = await response.json();

          commit("saveUserInfo", res.data);
        } else {
          commit("logout");
        }
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  logout({ commit }) {
    commit("logout");
  },
};
