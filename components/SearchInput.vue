<template>
  <form>
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
      <div class="absolute inset-y-0 left-1/4 flex items-center pl-3 pointer-events-none">
        <svg class="w-4 h-4 text-gray-300 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
        </svg>
      </div>
      <input
        id="default-search"
        v-model="recipeSearchInputVal"
        type="search"
        class="w-1/2 p-4 pl-10 text-sm border border-transparent rounded-lg bg-opacity-60 bg-gray-700 placeholder-gray-400 text-white focus:ring-blue-500 shadow-md"
        placeholder="Search Recipes..."
        required
        @keyup="() => $emit('search', recipeSearchInputVal)"
      >
    </div>
  </form>
</template>

<script setup>
defineEmits(['search'])
const recipeSearchInputVal = ref('')
</script>
