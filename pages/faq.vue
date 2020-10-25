<template>
  <div class="bg-white">
    <div class="max-w-screen-xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
      <h2 class="text-3xl leading-9 font-extrabold text-gray-900">
        Frequently asked questions
      </h2>

      <div class="mt-6 border-t border-gray-200 pt-10">
        <dl class="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:grid-rows-2 md:col-gap-8 md:row-gap-12">
          <div v-for="(faq, i) in faqs" :key="i" class="space-y-2">
            <dt class="text-lg leading-6 font-medium text-gray-900" v-text="faq.question" />
            <!-- eslint-disable-next-line vue/no-v-html -->
            <dd class="text-base leading-6 text-gray-500" v-html="faq.answer" />
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      faqs: [
        {
          question: 'What are the park hours?',
          answer: 'The park is open between 6AM and 8PM'
        },
        {
          question: 'Where can I park my car?',
          answer: 'Parking is available at the parking lot on vindicator as well as the lot by I-25.'
        },
        {
          question: 'Can I host a wedding/reception/large event here?',
          answer: 'Unfortunately no, we do not have the facilities or staff to handle large events.'
        },
        {
          question: 'Are there bathroom facilities available?',
          answer: 'There is a portable bathroom available at the vindicator parking lot.'
        },
        {
          question: 'I saw a rattlesnack. What should I do?',
          answer: 'Ute Valley Park is a open space and wildlife lives there. Stay calm, back away and do not aggitate it. Please stay on the trails!'
        },
        {
          question: 'How do I get involved with Ute Valley Park?',
          answer: 'Please see our <nuxt-link class="font-semibold text-indigo-600 no-underline" to="volunteer">volunteer</nuxt-link> page.'
        }
      ]
    }
  }
}
</script>
