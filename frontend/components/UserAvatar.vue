<template lang="pug">
  div(v-if="data")
    img.h-8.w-8.rounded-full(
      :class="{'h-32 w-32 sm:h-48 sm:w-48': big}"
      v-if="data.avatar" :src="baseAPI+''+data.avatar" alt="Avatar"
    )
    img.h-8.w-8.rounded-full(
      :class="{'h-32 w-32 sm:h-48 sm:w-48': big}"
      :src="'https://ui-avatars.com/api/?size='+(big?192:32)+'&name='+(data.name || data.username[0])"
      v-else 
    )
    span.h-8.w-8.rounded-full.bg-gray-100.text-center.pt-1.block(
      :class="{'h-48 w-48': big}"
      v-else
    ) {{ data.username[0] }}
</template>

<script>
export default {
  name: "UserAvatar",
  props: ["data", "big"],
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
