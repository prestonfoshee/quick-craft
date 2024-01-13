<script setup>
import SearchInput from './SearchInput.vue'
import JumbotronTagline from './JumbotronTagline.vue'
import JumbotronTitle from './JumbotronTitle.vue'

</script>

<template>
  <div class="flex justify-center">
    <section>
      <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <JumbotronTitle />
        <JumbotronTagline />
        <SearchInput />
      </div>
    </section>
  </div>
</template>
