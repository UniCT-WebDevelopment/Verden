<template lang="pug">
  div
    nav.bg-green-800(class="dark:bg-gray-900")
      .mx-auto.max-w-7xl.px-2(class="sm:px-6 lg:px-8 dark:border-b-1 dark:border-green-300")
        .relative.flex.h-16.items-center.justify-between
          .absolute.inset-y-0.left-0.flex.items-center(class="sm:hidden")
            button.inline-flex.items-center.justify-center.rounded-md.p-2.text-gray-400(
              type="button" class="hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false"
              @click="boxInfo = !boxInfo"
            )
              span.sr-only Open main menu
              svg.block.h-6.w-6(xmlns="http://www.w3.org/2000/svg" fill="none" viewbox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true")
                path(stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5")
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" class="hidden w-6 h-6">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.547 4.505a8.25 8.25 0 1011.672 8.214l-.46-.46a2.252 2.252 0 01-.422-.586l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 01-1.384-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.279-2.132z" clip-rule="evenodd" />
              </svg>
          .flex.flex-1.items-center.justify-center(class="sm:items-stretch sm:justify-start")
            .flex.flex-shrink-0.items-center
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff" class="w-auto h-8">
                <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM8.547 4.505a8.25 8.25 0 1011.672 8.214l-.46-.46a2.252 2.252 0 01-.422-.586l-1.08-2.16a.414.414 0 00-.663-.107.827.827 0 01-.812.21l-1.273-.363a.89.89 0 00-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 01-1.81 1.025 1.055 1.055 0 01-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 01-1.384-2.46l.007-.042a2.25 2.25 0 01.29-.787l.09-.15a2.25 2.25 0 012.37-1.048l1.178.236a1.125 1.125 0 001.302-.795l.208-.73a1.125 1.125 0 00-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 01-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 01-1.458-1.137l1.279-2.132z" clip-rule="evenodd" />
              </svg>
            .hidden(class="sm:ml-6 sm:block")
              .flex.space-x-4
                nuxt-link.text-white.px-3.py-2.rounded-md.text-sm.font-medium(:class="[routeName == 'index' ? 'bg-green-900': 'text-gray-300']" to="/" aria-current="page") Home
          .absolute.inset-y-0.right-0.flex.items-center.pr-2(class="sm:static sm:inset-auto sm:ml-6 sm:pr-0" v-if="isLogged")
            nuxt-link.leading-6.text-white.px-3.py-2.rounded-md.text-sm.font-medium(:class="['hidden sm:flex', routeName == 'create-model' ? 'bg-green-900': 'text-gray-300']" to="/create" aria-current="page")
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              | Create
            .relative.ml-3
              div
                button#user-menu-button.flex.rounded-full.bg-green-800.text-sm(
                  type="button" class="focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800" aria-expanded="false" aria-haspopup="true"
                  @click="boxUserInfo = !boxUserInfo"
                )
                  span.sr-only Open user menu
                  user-avatar(:data="me")
              .absolute.right-0.z-10.mt-2.w-48.origin-top-right.rounded-md.bg-white.py-1.shadow-lg.ring-1.ring-black.ring-opacity-5(
                class="focus:outline-none dark:bg-gray-800" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1"
                v-if="boxUserInfo && me"
              )
                nuxt-link.flex.leading-6.block.px-4.py-2.text-sm.text-gray-700(class="dark:text-white sm:hidden" to="/create" role="menuitem" tabindex="-1")
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  | Create
                nuxt-link.flex.leading-6.block.px-4.py-2.text-sm.text-gray-700(class="dark:text-white" :to="'/user/'+me.id" role="menuitem" tabindex="-1")
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                  | Your Profile
                nuxt-link.flex.leading-6.block.px-4.py-2.text-sm.text-gray-700(class="dark:text-white" to="/admin" role="menuitem" tabindex="-1" v-if="me.is_staff")
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z" />
                  </svg>
                  | Admin
                nuxt-link.flex.leanding-6.block.px-4.py-2.text-sm.text-gray-700(class="dark:text-white" to="/settings" role="menuitem" tabindex="-1")
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  | Settings
                nuxt-link.flex.leading-6.block.px-4.py-2.text-sm.text-gray-700(class="dark:text-white" to="#" role="menuitem" tabindex="-1" @click="logout")
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  | Sign out
          .absolute.inset-y-0.right-0.flex.items-center.pr-2(class="sm:static sm:inset-auto sm:ml-6 sm:pr-0" v-else)
            nuxt-link(to="/signin")
              button.text-white.flex.leading-6
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                | Sign
      #mobile-menu(class="sm:hidden" v-if="boxInfo")
        .space-y-1.px-2.pt-2.pb-3
          nuxt-link.text-white.block.px-3.py-2.rounded-md.text-base.font-medium(:class="[routeName == 'index' ? 'bg-green-900': 'text-gray-300']" to="/" aria-current="page") Home

    header.bg-white.shadow(v-if="pageName")
      .mx-auto.max-w-7xl.py-6.px-4(class="sm:px-6 lg:px-8")
        h1.text-3xl.font-bold.tracking-tight.text-gray-900 {{ pageName }}
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "VHeader",
  props: ["pageName"],
  components: {
    "user-avatar": UserAvatar,
  },
  data() {
    return {
      boxInfo: false,
      boxUserInfo: false,
      routeName: "",
    };
  },
  computed: {
    ...mapGetters("auth", ["isLogged", "me"]),
  },
  created() {
    this.routeName = this.$route.name;
    if (this.isLogged) {
      this.$store.dispatch("auth/findMe");
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
      window.location.href = "/";
    },
  },
};
</script>
