<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold(class="dark:text-white") Create a new model
    p(class="dark:text-white") Fill all the required fieds to upload your 3D model into Verden!
    model-form
</template>

<script>
import ModelLoading from "@/components/ModelLoading.vue";
import ModelBoxCard from "@/components/ModelBoxCard.vue";
import ModelForm from "@/components/ModelForm.vue";

import { mapGetters } from "vuex";

export default {
  name: "CreateModelView",
  layout: "default",
  head: {
    title: "Create a new model · Verden",
  },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged"]),
  },
  created() {
    if (!this.isLogged) window.location.href = "/signin?ref=/create";
  },
};
</script>
