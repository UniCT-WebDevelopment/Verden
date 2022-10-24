export const state = () => ({
  warnings: [],
  count: 0,
});

export const getters = {
  warnings: (state) => {
    return state.warnings;
  },
  count: (state) => {
    return state.count;
  },
};

export const mutations = {
  saveWarnings: (state, value) => {
    state.warnings = value.results;
    state.count = value.count;
  },
};

export const actions = {
  // Get warnings
  async getWarnings({ commit, rootGetters }, page) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/warnings?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
    })
      .then(async (response) => {
        res.status = response.status;
        const data = await response.json();
        if (res.status == 200) {
          commit("saveWarnings", data);
        }
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });
  },
  // Find a warning by its id
  async findWarning({ commit, rootGetters }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/warnings/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
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
  // Filter warnings
  async filterWarnings({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;
    const page = payload.page ?? 0;
    delete payload.page;

    await fetch(`${api}/v1/warnings/filter?page=${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        res.status = response.status;
        const data = await response.json();
        if (res.status == 200) {
          commit("saveWarnings", data);
        }
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });
  },
  // Create a new warning
  async createWarning({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/warnings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
      body: JSON.stringify(payload),
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
  // Edit a warning
  async editWarning({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/warnings/${payload.id}`, {
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
  // Delete a warning
  async deleteWarning({ commit, rootGetters }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/warnings/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
    })
      .then(async (response) => {
        res.status = response.status;
        res.data = await response.text();
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
};
