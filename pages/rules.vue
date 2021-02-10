<template>
  <div class="relative px-4 sm:px-6 lg:px-8">
    <div class="text-lg max-w-prose mx-auto mb-6">
      <h1 class="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        City of Colorado Springs Park <span class="text-green-700">Rules</span>
      </h1>
      <p class="text-2xl text-gray-700 font-semibold">
        The city of
        <a href="https://coloradosprings.gov/parks/page/park-hours-and-rules?mlid=3191" class="text-green-600 font-semibold no-underline">
          Colorado Springs Parks and Rec Department</a> is responsible for maintaining and enforcing rules across all city parks.
      </p>
      <div class="prose lg:prose">
        <nuxt-content :document="page" />
      </div>
    </div>
    <leave-no-trace />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    const page = await $content('rules')
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      page
    }
  },
  head: {
    title: 'Rules'
  }
}
</script>
