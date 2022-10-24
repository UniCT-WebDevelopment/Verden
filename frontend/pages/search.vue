<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold(class="dark:text-white") Results for: {{ q }}
    model-loading(v-if="isLoading")
    section(v-else)
      form.my-5.flex(action="/search")
        input.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1.mr-2(
          name="q"
          class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
          placeholder="Type some text to find the best models..."
          :value="q"
        )
        button.inline-flex.justify-center.rounded-md.border.border-transparent.bg-green-600.py-2.px-4.text-sm.font-medium.text-white.shadow-sm(
          type="submit"
          class="hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        )
          | Explore
      .grid.grid-cols-1.gap-4(class="md:grid-cols-4")
        model-box-card(
          v-for="model in models"
          :key="model.id"
          :model="model"
        )
      pagination(:page="page" :pages="pages" v-if="count")
</template>

<script>
import ModelLoading from "@/components/ModelLoading.vue";
import ModelBoxCard from "@/components/ModelBoxCard.vue";
import Pagination from "@/components/Pagination.vue";

import { mapGetters } from "vuex";

export default {
  name: "SearchPage",
  layout: "default",
  head() {
    return {
      title: this.q + " · Verden",
    };
  },
  data() {
    return {
      q: "",
      page: 0,
      pages: 0,
    };
  },
  components: {
    "model-loading": ModelLoading,
    "model-box-card": ModelBoxCard,
    pagination: Pagination,
  },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged"]),
    ...mapGetters("models", ["models", "count"]),
  },
  created() {
    this.q = this.$route.query["q"];
    this.page = this.$route.query.page ?? 0;
    this.$store
      .dispatch("models/filter", { q: this.q, page: this.page })
      .then(() => {
        this.pages = Math.ceil(this.count / 20);
      });
  },
};
</script>
