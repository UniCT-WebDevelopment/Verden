<template lang="pug">
  .mx-auto.w-90p.py-6#modelpage(class="sm:px-6 lg:px-8 md:max-w-7xl")
    .grid.mb-10.justify-items-center.text-center(class="sm:flex sm:text-left dark:text-white" v-if="user.username")
      user-avatar(:data="user" big="1")
      .grid.p-0(class="sm:pl-7")
        h1.text-2xl.font-bold.self-end.flex(:title="user.username+' is an admin'") {{ user.name }} 
          svg(v-if="user.is_staff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#dc2626" class="ml-2 mt-1 w-6 h-6")
            path(fill-rule="evenodd" d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clip-rule="evenodd")

        h2.text-md.text-gray-500 @{{ user.username }}

    model-loading(v-if="isLoading")
    section(v-else)
      div(v-if="models.length > 0")
        h4.mb-1.text-lg(class="dark:text-white") My models
        .grid.grid-cols-1.gap-4(class="md:grid-cols-4")
          model-box-card(
            v-for="model in models"
            :key="model.id"
            :model="model"
          )
        pagination(:page="page" :pages="pages" v-if="count")
      h4.text-lg(v-else class="dark:text-white") No models found

</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";
import FilePreview from "@/components/FilePreview.vue";
import ModelLoading from "@/components/ModelLoading.vue";
import ModelBoxCard from "@/components/ModelBoxCard.vue";
import Pagination from "@/components/Pagination.vue";

import { mapGetters } from "vuex";

export default {
  name: "UserPageView",
  layout: "default",
  data() {
    return {
      id: 0,
      user: {},
      models: [],
      count: 0,
      page: 0,
      pages: 0,
    };
  },
  head() {
    return {
      title: this.user.username + " · Verden",
    };
  },
  components: {
    "user-avatar": UserAvatar,
    "file-preview": FilePreview,
    "model-loading": ModelLoading,
    "model-box-card": ModelBoxCard,
    pagination: Pagination,
  },
  computed: {
    ...mapGetters(["isLoading"]),
  },
  created() {
    this.id = this.$route.params.id;
    this.page = this.$route.query.page ?? 0;

    this.$store.dispatch("users/findById", this.id).then((response) => {
      if (response.status != 200) {
        window.location.href = "/";
      } else {
        this.user = response.data;
      }
    });

    this.$store
      .dispatch("users/findModels", { id: this.id, page: this.page })
      .then((response) => {
        if (response.status == 200) {
          this.models = response.data.results;
          this.count = response.data.count;
          this.pages = Math.ceil(this.count / 20);
        }
      });
  },
};
</script>
