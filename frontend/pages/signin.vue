<template lang="pug">
  .mx-auto.max-w-7xl.py-6(class="sm:px-6 lg:px-8")
    .flex.min-h-full.items-center.justify-center.py-12.px-4(class="sm:px-6 lg:px-8")
      .w-full.max-w-md.space-y-8
        div
          h2.mt-6.text-center.text-3xl.font-bold.tracking-tight.text-gray-900(class="dark:text-white") Sign in
          p.mt-2.text-center.text-sm.text-gray-600 Or 
            nuxt-link.font-medium.text-indigo-600(class="hover:text-indigo-500 dark:text-gray-100 dark:hover:text-white" to="/signup") create a new account
        form.mt-8.space-y-6(method="POST")
          input(type="hidden" name="remember" value="true")
          .-space-y-px.rounded-md.shadow-sm
            div
              label.sr-only(for="username") Username
              input#username.relative.block.w-full.appearance-none.rounded-none.rounded-t-md.border.border-gray-300.px-3.py-2.text-gray-900.placeholder-gray-500(name="username" type="text" autocomplete="username" required class="focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Username" v-model="form.username")
            div
              label.sr-only(for="password") Password
              input#password.relative.block.w-full.appearance-none.rounded-none.rounded-b-md.border.border-gray-300.px-3.py-2.text-gray-900.placeholder-gray-500(name="password" type="password" autocomplete="current-password" required class="focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm" placeholder="Password" v-model="form.password")
          div
            button.group.relative.flex.w-full.justify-center.rounded-md.border.border-transparent.bg-indigo-600.py-2.px-4.text-sm.font-medium.text-white(type="submit" class="hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" @click="save")
              span.absolute.inset-y-0.left-0.flex.items-center.pl-3
                // Heroicon name: mini/lock-closed
                svg.h-5.w-5.text-indigo-500(class="group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 20 20" fill="currentColor" aria-hidden="true")
                  path(fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd")
              | Sign in

</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SignInPage",
  layout: "default",
  head: {
    title: "Signin · Verden",
  },
  computed: {
    ...mapGetters("auth", ["isLogged", "me"]),
  },
  created() {
    if (this.isLogged) window.location.href = "/";
  },
  data() {
    return {
      form: {},
    };
  },
  methods: {
    save(event) {
      const ref = this.$route.query["ref"];
      event.preventDefault();

      const f = this.form;
      if (!(f.username && f.password)) {
        this.$toast.error("Every field is required");
        return;
      }

      this.$store.dispatch("auth/login", f).then((response) => {
        if (response.status != 200) {
          this.$toast.error(response.data.error);
        } else {
          this.$toast.success("Logged successfully");
          setTimeout(() => {
            if (ref) {
              window.location.href = ref;
            } else {
              window.location.href = "/";
            }
          }, 1000);
        }
      });
    },
  },
};
</script>
