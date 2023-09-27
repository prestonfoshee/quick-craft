<script setup>
const { $client } = useNuxtApp()

const hello = await $client.hello.useQuery({ text: 'client' })
// const prismaTest = await $client.prismaTest.useQuery()

const prismaTestData = ref(null)
const prismaTest = async () => {
  prismaTestData.value = await $client.prismaTest.useQuery()
  console.log(prismaTestData.value)
}
function clearTest () {
  prismaTestData.value = null
}
</script>

<template>
  <div>
    <div>
      <!-- As `superjson` is already pre-configured, we can use `time` as a `Date` object without further deserialization 🎉 -->
      tRPC Data: "{{ hello.data.value?.greeting }}" send at "{{ hello.data.value?.time.toLocaleDateString('en-EN') }}".
    </div>
    <div>
      <button @click="prismaTest">
        Get Prisma Test Data
      </button>
      <button @click="clearTest">
        Clear Prisma Test Data
      </button>
      <div>{{ prismaTestData?.data.example.details }}</div>
      <!-- Prisma Data: "{{ prismaTest.data.value?.example?.details }}" -->
    </div>
  </div>
</template>
