<template lang="pug">
  .mt-10
    nav(aria-label="Pagination")
      ul.flex.list-style-none.items-center.justify-center
        li.page-item(:class="{'cursor-not-allowed opacity-20 page-item disabled': page < 1}")
          nuxt-link.page-link.relative.block.py-1.px-3.rounded.border-0.bg-transparent.outline-none.transition-all.duration-300.rounded.text-gray-800(
            :to="(page == 0) ? '#' : (path ?? '/')+'?page='+incrPage(-1)"
            class="hover:text-gray-800 hover:bg-gray-200 focus:shadow-none dark:text-white"
          )
            span.sr-only Previous
            svg.h-5.w-5(xmlns="http://www.w3.org/2000/svg", viewbox="0 0 20 20", fill="currentColor", aria-hidden="true")
              path(fill-rule="evenodd", d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z", clip-rule="evenodd")
        li.page-item(v-for="i in pages")
          nuxt-link.page-link.relative.block.py-1.px-3.rounded.border-0.bg-transparent.outline-none.transition-all.duration-300.rounded.text-gray-800(
            :to="(path ?? '/')+'?page='+(i-1)" aria-current="page"
            :class="{'hover:text-gray-800 hover:bg-gray-200 focus:shadow-none dark:text-white': true, 'bg-green-500 text-green-50 hover:text-green-50': page == (i-1)}"
          ) {{ i-1 }}
        li.page-item(:class="{'cursor-not-allowed opacity-20 page-item disabled': page == pages-1}")
          nuxt-link.page-link.relative.block.py-1.px-3.rounded.border-0.bg-transparent.outline-none.transition-all.duration-300.rounded.text-gray-800(
            :to="(page == (pages-1)) ? '#' : (path ?? '/')+'?page='+incrPage(1)"
            class="hover:text-gray-800 hover:bg-gray-200 focus:shadow-none dark:text-white"
          )
            span.sr-only Next
            svg.h-5.w-5(xmlns="http://www.w3.org/2000/svg", viewbox="0 0 20 20", fill="currentColor", aria-hidden="true")
              path(fill-rule="evenodd", d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z", clip-rule="evenodd")
  </template>

<script>
export default {
  name: "Pagination",
  props: ["page", "pages", "path"],
  methods: {
    incrPage(value) {
      return Number(this.page) + value;
    },
  },
};
</script>
