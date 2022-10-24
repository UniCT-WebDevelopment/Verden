<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold(class="dark:text-white") Reports
    .relative.z-10(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="boxEditWarning > 0")
      .fixed.inset-0.bg-gray-900.bg-opacity-90.transition-opacity
      .fixed.inset-0.z-10.overflow-y-auto
        .flex.min-h-full.items-end.justify-center.p-4.text-center(class="sm:items-center sm:p-0")
          .relative.transform.overflow-hidden.rounded-lg.bg-white.text-left.shadow-xl.transition-all(
            class="sm:my-8 sm:w-full sm:max-w-lg dark:bg-gray-800"
          )
            h3.text-xl.font-bold.text-center.p-5(class="dark:text-white") Edit warning
            form.m-3
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="model") Model
                .mt-1
                  input#model.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="model"
                    class="focus:border-green-500 opacity-25 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    v-model="form.model_id"
                    readonly
                    disabled
                  )
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="note") Note
                .mt-1
                  input#note.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="note"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    v-model="form.note"
                  )
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="is_resolved") Is it resolved?
                .mt-1.flow-root
                  input#is_resolved.form-check-input.h-4.w-4.border.border-gray-300.rounded-sm.bg-white.transition.duration-200.mt-1.align-top.bg-no-repeat.bg-center.bg-contain.float-left.mr-2.cursor-pointer(
                    class="checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
                    type="checkbox" name="is_resolved" v-model="form.resolved_by" :value="me.id"
                  )
              .mb-5(v-if="form.resolved_by || form.is_resolved")
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="admin_note") Admin note
                .mt-1
                  input#admin_note.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="admin_note"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    v-model="form.admin_note"
                  )

            .bg-gray-50.px-4.py-3(class="sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700")
              button.inline-flex.w-full.justify-center.rounded-md.border.border-transparent.bg-green-600.px-4.py-2.text-base.font-medium.text-white.shadow-sm(
                type="button"
                :class="{'hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm': true, 'opacity-25 cursor-default': isLoading}"
                :disabled="isLoading"
                :readonly="isLoading"
                @click="saveWarning"
              )
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                | Save
              button.mt-3.inline-flex.w-full.justify-center.rounded-md.border.border-gray-300.bg-white.px-4.py-2.text-base.font-medium.text-gray-700.shadow-sm(
                type="button"
                class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="boxEditWarning = 0"
              ) Cancel
    .relative.z-10(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="boxDeleteReport > 0")
      .fixed.inset-0.bg-gray-900.bg-opacity-90.transition-opacity
      .fixed.inset-0.z-10.overflow-y-auto
        .flex.min-h-full.items-end.justify-center.p-4.text-center(class="sm:items-center sm:p-0")
          .relative.transform.overflow-hidden.rounded-lg.bg-white.text-left.shadow-xl.transition-all(class="sm:my-8 sm:w-full sm:max-w-lg")
            .bg-white.px-4.pt-5.pb-4(class="sm:p-6 sm:pb-4")
              div(class="sm:flex sm:items-start")
                .mx-auto.flex.h-12.w-12.flex-shrink-0.items-center.justify-center.rounded-full.bg-red-100(class="sm:mx-0 sm:h-10 sm:w-10")
                  svg.h-6.w-6.text-red-600(xmlns="http://www.w3.org/2000/svg", fill="none", viewbox="0 0 24 24", stroke-width="1.5", stroke="currentColor", aria-hidden="true")
                    path(stroke-linecap="round", stroke-linejoin="round", d="M12 10.5v3.75m-9.303 3.376C1.83 19.126 2.914 21 4.645 21h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.501-3.032-1.501-3.898 0L2.697 17.626zM12 17.25h.007v.008H12v-.008z")
                .mt-3.text-center(class="sm:mt-0 sm:ml-4 sm:text-left")
                  h3#modal-title.text-lg.font-medium.leading-6.text-gray-900 Are you sure?
                  .mt-2
                    p.text-sm.text-gray-500 This action cannot be undone.
            .bg-gray-50.px-4.py-3(class="sm:flex sm:flex-row-reverse sm:px-6")
              button.inline-flex.w-full.justify-center.rounded-md.border.border-transparent.bg-red-600.px-4.py-2.text-base.font-medium.text-white.shadow-sm(
                type="button"
                :class="{'hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm': true, 'opacity-25 cursor-default': isLoading}"
                :disabled="isLoading"
                :readonly="isLoading"
                @click="deleteReport"
              )
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                | Yes, confirm
              button.mt-3.inline-flex.w-full.justify-center.rounded-md.border.border-gray-300.bg-white.px-4.py-2.text-base.font-medium.text-gray-700.shadow-sm(
                type="button"
                class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="boxDeleteReport = 0"
              ) Cancel
    .flex.flex-col.grid-cols-6.mt-3(class="sm:grid")
      div
        admin-sidebar
      section#tables.col-span-5
        input#notResolved.form-check-input.h-4.w-4.border.border-gray-300.rounded-sm.bg-white.transition.duration-200.mt-1.align-top.bg-no-repeat.bg-center.bg-contain.float-left.mr-2.cursor-pointer(
          class="checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
          type="checkbox"
          name="notResolved"
          v-model="notResolved"
          @change="filter"
        )
        label.form-check-label.inline-block.text-gray-800(class="dark:text-white" for="notResolved")
          | Show only not resolved reports

        v-table(
          :keys="['id', 'model_id', 'created', 'updated', 'user', 'resolved', 'note', 'admin_note']"
          :fields="warnings"
          :deleterow="openModal"
          :editrow="openEditModal"
        )
        pagination(:page="page" :pages="pages" v-if="count" path="/admin/reports")
</template>

<script>
import { mapGetters } from "vuex";

import AdminSidebar from "@/components/AdminSidebar.vue";
import Pagination from "@/components/Pagination.vue";
import VTable from "@/components/VTable.vue";

export default {
  name: "AdminView",
  head: { title: "Reports · Verden" },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged", "me"]),
    ...mapGetters("warnings", ["warnings", "count"]),
  },
  data() {
    return {
      page: 0,
      pages: 0,
      notResolved: false,
      boxDeleteReport: 0,
      boxEditWarning: 0,
      form: {},
    };
  },
  components: {
    AdminSidebar,
    pagination: Pagination,
    "v-table": VTable,
  },
  async mounted() {
    await this.$store.dispatch("auth/findMe");

    if (!(this.isLogged && this.me && this.me.is_staff)) {
      window.location.href = "/";
    }

    this.page = this.$route.query.page ?? 0;
    this.notResolved = Object.keys(this.$route.query).includes("not_resolved");

    // FIX: pagination for filtered warnings
    if (this.notResolved) {
      this.$store
        .dispatch("warnings/filterWarnings", { page: this.page })
        .then(() => {
          this.pages = Math.ceil(this.count / 20);
        });
    } else {
      this.$store.dispatch("warnings/getWarnings", this.page).then(() => {
        this.pages = Math.ceil(this.count / 20);
      });
    }
  },
  methods: {
    openEditModal(id) {
      this.$store.dispatch("warnings/findWarning", id).then((response) => {
        this.boxEditWarning = id;
        this.form = response.data;
      });
    },
    filter() {
      if (this.notResolved) {
        window.location.href =
          "/admin/reports?page=" + this.page + "&not_resolved";
      } else {
        window.location.href = "/admin/reports?page=" + this.page;
      }
    },
    saveWarning() {
      if (!this.form.resolved_by) this.form.resolved_by = 0;
      else this.form.resolved_by = this.me.id;

      this.$store
        .dispatch("warnings/editWarning", { ...this.form })
        .then((response) => {
          if (response.status == 200) {
            this.$toast.success("Report saved");
            if (this.notResolved) {
              this.$store
                .dispatch("warnings/filterWarnings", { page: this.page })
                .then(() => {
                  this.pages = Math.ceil(this.count / 20);
                });
            } else {
              this.$store
                .dispatch("warnings/getWarnings", this.page)
                .then(() => {
                  this.pages = Math.ceil(this.count / 20);
                });
            }

            this.boxEditWarning = 0;
          } else {
            this.$toast.error(response.data);
          }
        });
    },
    openModal(id) {
      this.boxDeleteReport = id;
    },
    deleteReport() {
      if (this.boxDeleteReport) {
        this.$store
          .dispatch("warnings/deleteWarning", this.boxDeleteReport)
          .then((response) => {
            if (response.status == 204) {
              if (this.notResolved) {
                this.$store
                  .dispatch("warnings/filterWarnings", { page: this.page })
                  .then(() => {
                    this.pages = Math.ceil(this.count / 20);
                  });
              } else {
                this.$store
                  .dispatch("warnings/getWarnings", this.page)
                  .then(() => {
                    this.pages = Math.ceil(this.count / 20);
                  });
              }
              this.$toast.success("Report deleted!");
              this.boxDeleteReport = 0;
            } else {
              this.$toast.error(response.data);
            }
          });
      }
    },
  },
};
</script>
