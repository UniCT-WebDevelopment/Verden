<template>
  <div
    :class="
      $colorMode.preference == 'light' || $colorMode.preference == 'system'
        ? 'light'
        : 'dark'
    "
  >
    <VHeader />
    <main>
      <Nuxt />
    </main>
  </div>
</template>
