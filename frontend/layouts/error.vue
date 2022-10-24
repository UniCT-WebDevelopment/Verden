<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    section
      h1.text-3xl.font-bold(class="dark:text-white") Error 40(1|4)
        span.text-red-500.text-sm *
        | . Oh no, you shall not pass!
      a.cursor-pointer(class="dark:text-white hover:underline" @click="goback") Go back to your path!

      .mt-32.text-center
        img.block.mx-auto(class="w-2/4" src="../assets/404.jpg")
        span.text-red-500 * it's not a regex, I swear
</template>

<script>
export default {
  head: { title: "Error · Verden" },
  methods: {
    goback() {
      window.history.back();
    },
  },
};
</script>
