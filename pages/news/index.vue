<template>
  <ul class="space-y-3 mx-4 sm:mx-0">
    <base-card v-for="newsItem in news" :key="newsItem.slug" :news="newsItem" can-be-wide />
  </ul>
</template>

<script>
export default {
  data () {
    return {
      news: []
    }
  },
  async fetch () {
    this.news = await this.$content('news').sortBy('publishedOn', 'desc').limit(50).fetch()
  },
  head: {
    title: 'News'
  }
}
</script>
