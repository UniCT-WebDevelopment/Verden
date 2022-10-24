<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold(class="dark:text-white") Users
    .relative.z-10(aria-labelledby="modal-title", role="dialog", aria-modal="true" v-if="boxEditUser > 0")
      .fixed.inset-0.bg-gray-900.bg-opacity-90.transition-opacity
      .fixed.inset-0.z-10.overflow-y-auto
        .flex.min-h-full.items-end.justify-center.p-4.text-center(class="sm:items-center sm:p-0")
          .relative.transform.overflow-hidden.rounded-lg.bg-white.text-left.shadow-xl.transition-all(
            class="sm:my-8 sm:w-full sm:max-w-lg dark:bg-gray-800"
          )
            h3.text-xl.font-bold.text-center.p-5(class="dark:text-white") Edit user
            form.m-3
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="name") Name
                .mt-1
                  input#name.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="name"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    placeholder="John Doe"
                    v-model="form.name"
                  )
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="username") Username
                .mt-1
                  input#email.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    name="username"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    placeholder="john"
                    v-model="form.username"
                  )
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="email") Email
                .mt-1
                  input#email.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                    type="email"
                    name="email"
                    class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                    placeholder="john@example.com"
                    v-model="form.email"
                  )
              .mb-5
                label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="is_staff") Staffer
                .mt-1.flow-root
                  input#is_staff.form-check-input.h-4.w-4.border.border-gray-300.rounded-sm.bg-white.transition.duration-200.mt-1.align-top.bg-no-repeat.bg-center.bg-contain.float-left.mr-2.cursor-pointer(
                    class="checked:bg-blue-600 checked:border-blue-600 focus:outline-none"
                    type="checkbox" name="is_staff" v-model="form.is_staff"
                  )

            .bg-gray-50.px-4.py-3(class="sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700")
              button.inline-flex.w-full.justify-center.rounded-md.border.border-transparent.bg-green-600.px-4.py-2.text-base.font-medium.text-white.shadow-sm(
                type="button"
                :class="{'hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm': true, 'opacity-25 cursor-default': isLoading}"
                :disabled="isLoading"
                :readonly="isLoading"
                @click="saveUser"
              )
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                | Save
              button.mt-3.inline-flex.w-full.justify-center.rounded-md.border.border-gray-300.bg-white.px-4.py-2.text-base.font-medium.text-gray-700.shadow-sm(
                type="button"
                class="hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                @click="boxEditUser = 0"
              ) Cancel
    .flex.flex-col.grid-cols-6.mt-3(class="sm:grid")
      div
        admin-sidebar
      section#tables.col-span-5
        v-table(
          :keys="['id', 'avatar', 'username', 'email', 'is_staff', 'name']"
          :fields="users"
          path="/user/"
          :editrow="openEditModal"
        )
        pagination(:page="page" :pages="pages" v-if="count" path="/admin")
</template>

<script>
import { mapGetters } from "vuex";

import AdminSidebar from "@/components/AdminSidebar.vue";
import Pagination from "@/components/Pagination.vue";
import VTable from "@/components/VTable.vue";

export default {
  name: "AdminView",
  head: { title: "Admin panel · Verden" },
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged", "me"]),
    ...mapGetters("users", ["users", "count"]),
  },
  data() {
    return {
      page: 0,
      pages: 0,
      boxEditUser: 0,
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
    this.$store.dispatch("users/getUsers", this.page).then(() => {
      this.pages = Math.ceil(this.count / 20);
    });
  },
  methods: {
    openEditModal(id) {
      this.$store.dispatch("users/findById", id).then((response) => {
        this.boxEditUser = id;
        this.form = response.data;
      });
    },
    saveUser(event) {
      const f = this.form;

      if (f.username && f.email) {
        this.$store.dispatch("users/editUser", f).then((response) => {
          if (response.status == 200) {
            this.$toast.success("User has been saved");

            this.$store.dispatch("users/getUsers", this.page).then(() => {
              this.pages = Math.ceil(this.count / 20);
            });

            this.boxEditUser = 0;
          } else {
            this.$toast.error(response.data.error);
          }
        });
      }
      event.preventDefault();
    },
  },
};
</script>
