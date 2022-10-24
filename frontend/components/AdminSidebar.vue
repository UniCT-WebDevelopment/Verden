<template lang="pug">
  ul.space-y-6.border-l.border-gray-300(class="dark:border-gray-800")
    li
      nuxt-link.block.border-l.pl-4.border-transparent.text-gray-700(
        :class="{'hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300': true, 'font-semibold hover:text-green-800 text-green-700 dark:text-green-400 dark:hover:text-green-500 border-green-500': page == 'admin'}"
        to="/admin"
      )
        | Users
    li
      nuxt-link.block.border-l.pl-4.border-transparent.text-gray-700(
        :class="{'hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300': true, 'font-semibold hover:text-green-800 text-green-700 dark:text-green-400 dark:hover:text-green-500 border-green-500': page == 'admin-models'}"
        to="/admin/models"
      )
        | Models
    li
      nuxt-link.block.border-l.pl-4.border-transparent.text-gray-700(
        :class="{'hover:border-gray-400 dark:hover:border-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300': true, 'font-semibold hover:text-green-800 text-green-700 dark:text-green-400 dark:hover:text-green-500 border-green-500': page == 'admin-reports'}"
        to="/admin/reports"
      )
        | Reports
</template>

<script>
export default {
  data() {
    return {
      page: "",
    };
  },
  created() {
    this.page = this.$route.name;
  },
};
</script>
