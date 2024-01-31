<script setup>
// import { useQuery } from '@trpc/vue'
const { $client: trpc } = useNuxtApp()

const props = defineProps({
  search: {
    type: String,
    required: true
  }
})

const recipeSearchResults = ref(null)
const isLoading = ref(false)
const isError = ref(false)
const error = ref(null)

const fetchRecipes = async () => {
  try {
    isLoading.value = true
    error.value = null
    recipeSearchResults.value = await trpc.recipes.getRecipes
      .useQuery({ search: props.search })
      .data

    console.log(recipeSearchResults.value)
  } catch (err) {
    isError.value = true
    error.value = err
  } finally {
    isLoading.value = false
  }
}

// const {
//   data: recipeSearchResults,
//   isLoading,
//   isError,
//   error
// } = await useQuery('getRecipes', () => ({ search: props.search }))
watch(() => props.search, fetchRecipes)
onMounted(fetchRecipes)

// watch(() => props.search, fetchRecipes, { immediate: true })

</script>

<template>
  <div class="flex justify-center">
    <div v-if="isLoading.value">
      Loading recipes...
    </div>
    <div v-else-if="isError.value">
      Error fetching recipes: {{ error.message }}
    </div>
    <div
      v-else-if="recipeSearchResults?.value?.recipes"
      class="flex gap-3 flex-wrap justify-center mt-4 -m-4"
    >
      <div
        v-for="recipe in recipeSearchResults.value.recipes"
        :key="recipe.resultItemID"
        class="flex items-center justify-between p-4 mt-4 bg-gray-700 bg-opacity-60 rounded-lg shadow-md dark:bg-gray-800 w-14 h-14"
      >
        <img
          :src="recipe.resultItemTexture"
          :alt="recipe.displayName"
          :title="recipe.displayName"
          class="w-full h-full"
        >
      </div>
    </div>
    <div v-else>
      No recipes found.
    </div>
  </div>
</template>
