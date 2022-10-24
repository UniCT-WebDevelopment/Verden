<template lang="pug">
  .mx-auto.w-90p.py-6#modelpage(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold(class="dark:text-white") Edit {{ model.name }}
    nuxt-link.mt-3.mb-5.block.flex(:to="'/models/'+model.id" class="hover:underline dark:text-white")
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      | Back to model page
    model-form(:data="model" v-if="model.id")
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ModelEditView",
  layout: "default",
  data() {
    return {
      model: {},
    };
  },
  head() {
    return {
      title: "Edit " + this.model.name + " · Verden",
    };
  },
  components: {},
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged", "me"]),
  },
  async created() {
    this.id = this.$route.params.id;
    this.baseAPI = this.$config.api;

    if (!this.isLogged) {
      window.location.href = "/models/" + this.id;
    } else {
      await this.$store.dispatch("auth/findMe");
      this.$store.dispatch("models/findModel", this.id).then((response) => {
        if (response.status != 200) {
          window.location.href = "/models";
        } else {
          if (!(response.data.author_id == this.me.id || this.me.is_staff)) {
            window.location.href = "/models/" + this.id;
          } else {
            this.model = response.data;
          }
        }
      });
    }
  },
  methods: {},
};
</script>
