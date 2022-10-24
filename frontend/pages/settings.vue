<template lang="pug">
  .mx-auto.w-90p.py-6(class="sm:px-6 lg:px-8 md:max-w-7xl")
    h1.text-3xl.font-bold(class="dark:text-white") Settings
    p(class="dark:text-white") Change your informations

    form.mt-3(v-if="me")
      .overflow-hidden.shadow(class="sm:rounded-md")
        .space-y-6.bg-white.px-4.py-5(class="sm:p-6 dark:bg-gray-800")
          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white") Avatar
            span.text-green-500.text-xs(v-if="avatarChanged") Avatar changed. Reload this page and/or clear your browser cache.
            .mt-1.flex.items-center
              user-avatar(:data="me")
              input(type="file" hidden id="avatar" @change="editAvatar" accept="image/*")
              label(
                for="avatar" 
                class="ml-5 cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              ) Change
              button(
                type="button"
                class="ml-5 cursor-pointer rounded-md border border-red-600 flex bg-red-600 py-2 px-3 text-sm font-medium leading-4 text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                @click="deleteAvatar"
                v-if="me.avatar"
              )
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 mr-1">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                | Delete

          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="name") Name
            .mt-1
              input#name.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="name"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                placeholder="John Doe"
                v-model="form.name"
              )
          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="username") Username
            .mt-1
              input#email.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                name="username"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                placeholder="john"
                v-model="form.username"
              )
          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="email") Email
            .mt-1
              input#email.mt-1.block.w-full.rounded-md.border-gray-300.border-1.px-2.py-1(
                type="email"
                name="email"
                class="focus:border-green-500 focus:ring-green-500 sm:text-sm dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                placeholder="john@example.com"
                v-model="form.email"
              )

          div
            label.block.text-sm.font-medium.text-gray-700(class="dark:text-white" for="theme") Theme
            .mt-1
              select(
                class="cursor-pointer rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-600 dark:text-gray-50 dark:border-gray-700"
                v-model="$colorMode.preference"
              )
                option(value="light" :selected="$colorMode.preference == 'light'") Light
                option(value="dark" :selected="$colorMode.preference == 'dark'") Dark


        .py-3.px-4.text-right(class="sm:px-6")
          button.inline-flex.justify-center.rounded-md.border.border-transparent.bg-green-600.py-2.px-4.text-sm.font-medium.text-white.shadow-sm(
            type="submit"
            :class="{'hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2': true, 'opacity-25 cursor-default': isLoading}"
            :disabled="isLoading"
            :readonly="isLoading"
            @click="save"
          )
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" v-if="isLoading">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            | Save

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SettingsView",
  computed: {
    ...mapGetters(["isLoading"]),
    ...mapGetters("auth", ["isLogged", "me"]),
  },
  head: {
    title: "Settings · Verden",
  },
  data() {
    return {
      form: {},
      avatarChanged: false,
    };
  },
  created() {
    if (!this.isLogged) window.location.href = "/signin?ref=/settings";
  },
  watch: {
    me: function (value) {
      this.form = { ...value };
    },
  },
  methods: {
    editAvatar(event) {
      const file = event.target.files[0];
      this.$store
        .dispatch("users/editAvatar", { id: this.me.id, file })
        .then((response) => {
          if (response.status == 200) {
            this.$toast.success(`Avatar has been uploaded`);
            this.avatarChanged = true;
          } else {
            this.$toast.error(`Error uploading '${file.name}'`);
          }
        });
    },
    deleteAvatar() {
      this.$store.dispatch("users/deleteAvatar").then((response) => {
        if (response.status == 200) {
          this.$toast.success("Avatar has been removed");
          this.avatarChanged = true;
        } else {
          this.$toast.error("Error removing");
        }
      });
    },
    save(event) {
      const f = this.form;

      if (f.username && f.email) {
        this.$store.dispatch("users/editUser", f).then((response) => {
          if (response.status == 200) {
            this.$toast.success("User has been saved");
            setTimeout(() => {
              window.location.href = "/settings";
            }, 1000);
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
