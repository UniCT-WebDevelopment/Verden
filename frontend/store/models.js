export const state = () => ({
  models: [],
  count: 0,
});

export const getters = {
  models: (state) => {
    return state.models;
  },
  count: (state) => {
    return state.count;
  },
};

export const mutations = {
  // Save results and count
  saveModels: (state, value) => {
    state.models = value.results;
    state.count = value.count;
  },
};

export const actions = {
  // Get models usign `page`
  async getModels({ commit }, page) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    page = page ? page : 0;

    await fetch(`${api}/v1/models?page=${page}`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (response) => {
        res.data = await response.json();
        res.status = response.status;
        if (res.status == 200) {
          commit("saveModels", res.data);
        }
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Filter models
  async filter({ commit }, data) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    const page = data.page ? data.page : 0;

    await fetch(`${api}/v1/models/filter?page=${page}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ q: data.q }),
    })
      .then(async (response) => {
        res.data = await response.json();
        res.status = response.status;
        if (res.status == 200) {
          commit("saveModels", res.data);
        }
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Find a model by its id
  async findModel({ commit }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/models/${id}`, {
      headers: {
        "Content-Type": "application/json",
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
  // Create a new model
  async createModel({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/models`, {
      method: "POST",
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
  // Delete a model
  async deleteModel({ commit, rootGetters }, id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/models/${id}`, {
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
  // Edit a model
  async editModel({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/models/${payload.id}`, {
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
  // Create a model upload
  async upload({ commit, rootGetters }, payload) {
    commit("loadingStatus", true, { root: true });
    let status = 400;
    let api = this.$config.api;

    const form = new FormData();
    form.append("file", payload.file);

    await fetch(`${api}/v1/models/${payload.id}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
      body: form,
    })
      .then(async (response) => {
        status = response.status;
      })
      .catch((e) => {
        status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return status;
  },
  // Delete a model upload
  async deleteUpload({ commit, rootGetters }, data) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/models/${data.id}/upload/${data.uid}`, {
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
  // Add like to a model
  async addLike({ commit, rootGetters }, model_id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/models/${model_id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
    })
      .then(async (response) => {
        res.status = response.status;
        if (res.status != 201) {
          res.data = await response.json();
        }
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
  // Remove a like from a model
  async removeLike({ commit, rootGetters }, model_id) {
    commit("loadingStatus", true, { root: true });
    let res = { status: 0, data: null };
    let api = this.$config.api;

    await fetch(`${api}/v1/models/${model_id}/like`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${rootGetters["auth/accessToken"]}`,
      },
    })
      .then(async (response) => {
        res.status = response.status;
        if (res.status != 204) {
          res.data = await response.json();
        }
      })
      .catch((e) => {
        res.status = e.status;
      });

    commit("loadingStatus", false, { root: true });

    return res;
  },
};
