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
        @keyup="getRecipe"
      >
      <!-- <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Search
      </button> -->
    </div>
  </form>
  <div
    v-if="recipeSearchResults?.value"
    class="flex gap-3 flex-wrap justify-center mt-4 -m-4"
  >
    <div
      v-for="recipe in recipeSearchResults.value.recipes"
      :key="recipe.id"
      class="flex items-center justify-between p-4 mt-4 bg-gray-700 bg-opacity-60 rounded-lg shadow-md dark:bg-gray-800 w-14 h-14"
    >
      <img
        :src="recipe.result_item.texture"
        :alt="recipe.result_item.display_name"
        :title="recipe.result_item.display_name"
        class="w-full h-full"
      >
    </div>
  </div>
  <div v-else>
    no recipes
  </div>
</template>

<script setup>
const { $client: trpc } = useNuxtApp()

const recipeSearchInputVal = ref('')
const recipeSearchResults = ref(null)

const getRecipe = async () => {
  console.log(recipeSearchInputVal.value)
  recipeSearchResults.value = await trpc.recipes.getRecipes
    .useQuery({ search: recipeSearchInputVal.value })
    .data
}

</script>
