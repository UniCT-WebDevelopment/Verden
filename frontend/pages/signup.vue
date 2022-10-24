<template lang="pug">
  .mx-auto.max-w-7xl.py-6(class="sm:px-6 lg:px-8")
    .flex.min-h-full.items-center.justify-center.py-12.px-4(class="sm:px-6 lg:px-8")
      .w-full.max-w-md.space-y-8
        div
          h2.mt-6.text-center.text-3xl.font-bold.tracking-tight.text-gray-900(class="dark:text-white") Create a new account
          p.mt-2.text-center.text-sm.text-gray-600 Or 
            nuxt-link.font-medium.text-indigo-600(class="hover:text-indigo-500 dark:text-gray-100 dark:hover:text-white" to="/signin") signin
        form.mt-8.space-y-6(method="POST")
          input(type="hidden" name="remember" value="true")
          .-space-y-px.rounded-md.shadow-sm
            div
              label.sr-only(for="username") Username
              input#name.relative.block.w-full.appearance-none.rounded-none.rounded-t-md.border.border-gray-300.px-3.py-2.text-gray-900.placeholder-gray-500(
                name="name" type="text" autocomplete="name" required
                class="focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                :class="{'border-red-500 z-10' : errors.name }"
                placeholder="Your name" v-model="form.name"
              )
            div
              label.sr-only(for="email") Email
              input#email.relative.block.w-full.appearance-none.rounded-none.border.border-gray-300.px-3.py-2.text-gray-900.placeholder-gray-500(
                name="email" type="email" autocomplete="username" required
                class="focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm border-2"
                :class="{'border-red-500 z-10' : errors.email }"
                placeholder="Email" v-model="form.email"
              )
            div
              label.sr-only(for="username") Username
              input#username.relative.block.w-full.appearance-none.rounded-none.border.border-gray-300.px-3.py-2.text-gray-900.placeholder-gray-500(
                name="username" type="text" autocomplete="username" required
                class="focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                :class="{'border-red-500 z-10' : errors.username }"
                placeholder="Username" v-model="form.username"
              )
            div
              label.sr-only(for="password1") Password
              input#password.relative.block.w-full.appearance-none.rounded-none.border.border-gray-300.px-3.py-2.text-gray-900.placeholder-gray-500(
                name="password1" type="password" autocomplete="current-password" required
                class="focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                :class="{'border-red-500 z-10' : errors.password1 }"
                placeholder="Password" v-model="form.password1"
              )
            div
              label.sr-only(for="password2") Repeat password
              input#password.relative.block.w-full.appearance-none.rounded-none.rounded-b-md.border.border-gray-300.px-3.py-2.text-gray-900.placeholder-gray-500(
                name="password2" type="password" autocomplete="current-password" required
                class="focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                :class="{'border-red-500 z-10' : errors.password2 }"
                placeholder="Repeat password" v-model="form.password2"
              )
          div
            button.group.relative.flex.w-full.justify-center.rounded-md.border.border-transparent.bg-indigo-600.py-2.px-4.text-sm.font-medium.text-white(type="submit" class="hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="save")
              span.absolute.inset-y-0.left-0.flex.items-center.pl-3
                // Heroicon name: mini/lock-closed
                svg.h-5.w-5.text-indigo-500(class="group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor" aria-hidden="true")
                  path(fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd")
              | Sign up

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SignUpPage",
  layout: "default",
  head: {
    title: "Signup · Verden",
  },
  computed: {
    ...mapGetters("auth", ["isLogged"]),
  },
  created() {
    if (this.isLogged) window.location.href = "/";
  },
  data() {
    return {
      form: {},
      errors: {},
    };
  },
  methods: {
    save(event) {
      event.preventDefault();

      const f = this.form;
      if (!(f.email && f.username && f.password1 && f.password2)) {
        this.$toast.error("Every field is required");
        return;
      }
      this.errors = {};

      this.$store.dispatch("auth/signup", f).then((response) => {
        if (response.status != 201) {
          const err = response.data.error;
          this.$toast.error(err);

          if (err.indexOf("passwords") > 0) {
            this.$set(this.errors, "password1", true);
            this.$set(this.errors, "password2", true);
          }

          if (err.indexOf("password:") >= 0) {
            this.$set(this.errors, "password1", true);
          }

          if (err.indexOf("name:") >= 0) {
            this.$set(this.errors, "name", true);
          }

          if (err.indexOf("email:") >= 0) {
            this.$set(this.errors, "email", true);
          }

          if (err.indexOf("username") >= 0) {
            this.$set(this.errors, "username", true);
          }
        } else {
          this.$toast.success("User created!");
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
        }
      });
    },
  },
};
</script>
