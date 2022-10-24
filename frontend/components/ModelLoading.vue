<template lang="pug">
  .grid.gap-4(class="sm:grid-cols-4")
    .model.shadow-xl.rounded-lg.bg-white.p-4.w-full.h-80.animate-pulse
      .image.bg-green-100.rounded-xl.w-full.h-48
      .space-y-3.mt-5
        .grid.grid-cols-3.gap-4
          .h-4.bg-green-100.rounded-xl.col-span-2
          .h-4.bg-green-100.rounded-xl.col-span-1
        .h-4.bg-green-100.rounded-xl

</template>

<script>
export default {
  name: "ModelLoading",
};
</script>
