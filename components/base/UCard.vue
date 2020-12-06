<template>
  <div class="flex flex-col rounded-lg shadow-lg overflow-hidden">
    <div class="flex-shrink-0">
      <img class="h-48 w-full object-cover" :src="news.coverImage" alt="">
    </div>
    <div class="flex-1 bg-white p-6 flex flex-col justify-between">
      <div class="flex-1">
        <nuxt-link :to="'/news/' + news.slug" class="block">
          <h3 class="mt-2 text-xl leading-7 font-semibold text-gray-900">
            {{ news.title }}
          </h3>
          <p class="mt-3 text-base leading-6 text-gray-500">
            {{ news.previewText }}
          </p>
        </nuxt-link>
      </div>
      <div class="mt-6 flex items-center">
        <div>
          <p class="text-sm leading-5 font-medium text-gray-900" />
          <div class="flex text-sm leading-5 text-gray-500">
            <time datetime="2020-03-16">
              {{ publishedOn }}
            </time>
            <span class="mx-1">
              &middot;
            </span>
            <span>
              {{ news.readingTime }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  computed: {
    publishedOn () {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      return new Intl.DateTimeFormat('en-US', options).format(new Date(this.news.publishedOn))
    }
  }
}
</script>
