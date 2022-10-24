<template lang="pug">
  .model.shadow-sm.rounded-lg.bg-white.p-4.w-full.h-80.duration-300(
    class="hover:ease-out hover:shadow-md dark:bg-gray-800 dark:text-white"
  )
    nuxt-link(:to="'/models/'+model.id")
      .image.bg-gray-900.rounded-xl.w-full.h-48.overflow-hidden
        file-preview(
          :path="model.uploads[0].filepath" 
          bg="#111827"
          v-if="model.uploads"
        )

    .space-y-3.mt-5
      h1.truncate.text-xl.font-medium 
        nuxt-link(:to="'/models/'+model.id" class="hover:underline") {{ model.name }}
      div
        .mr-3.float-left
          user-avatar(:data="model.author")
        p.leading-8.truncate
          nuxt-link.text-green-800(class="hover:text-green-700 dark:text-green-300 dark:hover:text-green-200" :to="'/user/'+model.author_id")
            | @
            span.underline {{ model.author.username }}

</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";
import FilePreview from "@/components/FilePreview.vue";

export default {
  name: "ModelBoxCard",
  props: ["model"],
  components: {
    "user-avatar": UserAvatar,
    "file-preview": FilePreview,
  },
  data() {
    return {
      baseAPI: "",
    };
  },
  created() {
    this.baseAPI = this.$config.api;
  },
};
</script>
