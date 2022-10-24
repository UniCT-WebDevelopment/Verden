<template lang="pug">
  .shadow-sm.rounded-lg.bg-white.p-4.w-full.mb-5(class="dark:bg-gray-800" v-if="warnings.length")
    .relative.z-10(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="boxToResolve > 0")
      .fixed.inset-0.bg-gray-900.bg-opacity-90.transition-opacity
      .fixed.inset-0.z-10.overflow-y-auto
        .flex.min-h-full.items-end.justify-center.p-4.text-center(class="sm:items-center sm:p-0")
          .relative.transform.overflow-hidden.rounded-lg.bg-white.text-left.shadow-xl.transition-all(class="sm:my-8 sm:w-full sm:max-w-lg")
            .bg-white.px-4.pt-5.pb-4(class="sm:p-6 sm:pb-4")
              label.block.text-sm.font-medium.text-gray-700(for="admin_note") Add a note 
                span.text-gray-300 (Optional)
              .mt-1
                textarea#description.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                  name="warning_note" rows="3"
                  class="focus:border-green-500 focus:ring-green-500 sm:text-sm"
                  v-model="form.admin_note"
                )
            .bg-gray-50.px-4.py-3(class="sm:flex sm:flex-row-reverse sm:px-6")
              button.inline-flex.w-full.justify-center.rounded-md.border.border-transparent.bg-green-600.px-4.py-2.text-base.font-medium.text-white.shadow-sm(
                type="button"
                :class="{'hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm': true, 'opacity-25 cursor-default': isLoading}"
                :disabled="isLoading" :readonly="isLoading"
                @click="editWarning"
              )
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                | Save
              button.mt-3.inline-flex.w-full.justify-center.rounded-md.border.border-gray-300.bg-white.px-4.py-2.text-base.font-medium.text-gray-700.shadow-sm(
                type="button"
                class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="boxToResolve = 0"
              ) Cancel


    .flow-root
      .float-left
        h2.text-xl.font-bold(class="dark:text-white" v-if="me && me.is_staff") Reports 
        h2.text-xl.font-bold(class="dark:text-white" v-else) My reports
      .float-right.flex.cursor-pointer(class="dark:text-white" @click="expandList = !expandList")
        span {{ notResolved(warnings) }} not resolved
        svg(xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="ml-2 w-6 h-6")
          path(stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" v-if="!expandList")
          path(stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" v-else)

    ul(role="list" v-if="me && expandList")
      li.text-sm.rounded-md.border.border-gray-200.mt-3(class="dark:bg-gray-600 dark:text-white dark:border-gray-400" v-for="warning in warnings" :key="warning.id")
        .py-3.pl-3.pr-4(v-if="!me.is_staff")
          h3.flex.leading-6.mb-2.float-right
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            | {{ warning.created|moment("DD/MM/YYYY HH:mm") }}
          p {{ warning.note }}
        .py-3.pl-3.pr-4(v-else)
          h3.flex.leading-6.mt-1.float-right(class="sm:mb-2 sm:mt-0")
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            | {{ warning.created|moment("DD/MM/YYYY HH:mm") }}
          .block(class="sm:flex")
            .mr-3.float-left(style="flex-shrink: 0;" class="sm:float-none")
              user-avatar(:data="warning.user")
            p.leading-8.ml-2(class="sm:ml-0")
              nuxt-link.text-green-800(class="hover:text-green-700 dark:text-green-200 dark:hover:text-green-100" :to="'/user/'+warning.user.id")
                | @
                span.underline {{ warning.user.username }}
            p.leading-8.ml-0(class="sm:ml-5") {{ warning.note }}
            .pr-0.flow-root(class="sm:block sm:pr-3")
              button(
                class="float-right sm:float-none ml-5 cursor-pointer rounded-md border border-green-600 flex bg-green-600 py-2 px-3 text-xs font-medium leading-4 text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                v-if="!warning.resolved_by"
                @click="boxToResolve = warning.id"
              )
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-1 w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                | Resolve
        .bg-green-50.py-3.pl-3.pr-4(class="dark:bg-gray-500" v-if="warning.resolved_by")
          em Resolved by:
          h3.flex.leading-6.mb-2.float-right
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="mr-2 w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            | {{ warning.updated|moment("DD/MM/YYYY HH:mm") }}
          .block(class="sm:flex")
            .mr-3.float-left(style="flex-shrink: 0;" class="sm:float-none")
              user-avatar(:data="warning.resolved")
            p.leading-8.ml-2(class="sm:ml-0")
              nuxt-link.text-green-800(class="hover:text-green-700 dark:text-green-200 dark:hover:text-green-100" :to="'/user/'+warning.user.id")
                | @
                span.underline {{ warning.resolved.username }}
            p.leading-8.ml-0(class="sm:ml-5") {{ warning.admin_note }}
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

import { mapGetters } from "vuex";

export default {
  name: "ModelReportsList",
  props: ["model"],
  components: {
    "user-avatar": UserAvatar,
  },
  data() {
    return {
      boxToResolve: 0,
      form: { admin_note: "" },
      expandList: false,
    };
  },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["me"]),
    ...mapGetters("warnings", ["warnings"]),
  },
  mounted() {
    this.$store.dispatch("warnings/filterWarnings", { model_id: this.model });
  },
  methods: {
    notResolved(warnings) {
      return warnings.filter((x) => !x.resolved_by).length;
    },
    editWarning() {
      if (this.boxToResolve < 1) return;

      this.$store
        .dispatch("warnings/editWarning", {
          id: this.boxToResolve,
          admin_note: this.form.admin_note,
        })
        .then((response) => {
          if (response.status == 200) {
            this.$toast.success("Report saved");
            this.form.admin_note = "";
            this.boxToResolve = 0;
            this.$store.dispatch("warnings/filterWarnings", {
              model_id: this.model,
            });
          } else {
            this.$toast.error(response.data);
          }
        });
    },
  },
};
</script>
