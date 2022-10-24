export const state = () => ({
  users: [],
  count: 0,
});

export const getters = {
  users: (state) => {
    return state.users;
  },
  count: (state) => {
    return state.count;
  },
};

export const mutations = {
  saveUsers: (state, value) => {
    state.users = value.results;
    state.count = value.count;
  },
};

export const actions = {
  // Search user by `id`
  async findById({ commit }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        res.status = response.status;
        res.data = await response.json();
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Search user models
  async findModels({ commit }, data) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;
    const id = data.id;
    const page = data.page ? data.page : 0;

    await fetch(`${api}/v1/users/${id}/models?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        res.status = response.status;
        res.data = await response.json();
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Edit an user
  async editUser({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users/${payload.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        res.data = await response.json();
        res.status = response.status;
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Edit avatar
  // FIX: use the right endpoint with `payload.id`, not `me`
  async editAvatar({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    const body = new FormData();
    body.append("file", payload.file);

    await fetch(`${api}/v1/users/me/avatar`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
      body,
    })
      .then(async (response) => {
        res.data = await response.json();
        res.status = response.status;
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Delete the avatar
  async deleteAvatar({ commit, rootGetters }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users/${id ?? "me"}/avatar`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
    })
      .then(async (response) => {
        res.status = response.status;
        if (res.status != 200) res.data = await response.json();
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Get users
  async getUsers({ commit, rootGetters }, page) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/users?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
    })
      .then(async (response) => {
        res.status = response.status;
        res.data = await response.json();
        commit("saveUsers", res.data);
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });
  },
};
