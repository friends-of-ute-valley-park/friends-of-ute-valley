<template>
  <div class="relative px-4 sm:px-6 lg:px-8">
    <div class="text-lg max-w-prose mx-auto mb-6">
      <h1 class="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
        About Friends of Ute Valley Park
      </h1>
      <news class="prose lg:prose-xl">
        <nuxt-content :document="page" />
      </news>
    </div>
    <u-team />
  </div>
</template>

<script>
export default {
  async asyncData ({ $content, params, error }) {
    const page = await $content('about')
      .fetch()
      .catch(() => {
        error({ statusCode: 404, message: 'Page not found' })
      })

    return {
      page
    }
  }
}
</script>
