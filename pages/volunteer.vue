<template>
  <div class="bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="bg-gradient-to-r from-green-400 to-teal-600 shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-4">
        <div class="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20">
          <div class="lg:self-center">
            <h2 class="text-3xl font-extrabold text-white sm:text-4xl">
              <span class="block">Ready to help?</span>
              <span class="block text-teal-900">Volunteer to help improve Ute Valley Park</span>
            </h2>
            <p class="mt-4 text-lg leading-6 text-green-50">
              Looking for a great workout? Meet wonderful people, get dirty, get fit and improve Ute Valley Park – all at the same time!
            </p>
          </div>
        </div>
        <div class="-mt-6 aspect-w-5 aspect-h-3 md:aspect-w-2 md:aspect-h-1">
          <img src="~/assets/volunteer-2.jpg" class="transform translate-x-6 translate-y-6 rounded-md object-cover object-left-top sm:translate-x-16 lg:translate-y-20" alt="Volunteers raking mulch">
        </div>
      </div>
    </div>

    <div class="bg-gradient-to-b from-green-50 via-white to-white">
      <div class="max-w-screen-xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <volunteer-banner is-expanded />
        <div class="pb-16 xl:flex xl:items-center xl:justify-between">
          <div>
            <h2 class="text-4xl font-extrabold sm:text-5xl sm:leading-none sm:tracking-tight">
              <span class="text-green-900">Learn More </span>
            </h2>
            <p class="mt-4 text-lg text-gray-500">
              Meet your trail crew leader at the Pinon Valley Park (west) entrance to Ute Valley Park.
              The meeting location can change, so please check the FUVP <a href="https://www.facebook.com/FriendsOfUteValleyPark/" class="text-green-600 font-semibold no-underline">Facebook</a> page for updates.
              Any cancellations due to weather will also be posted on <a href="https://www.facebook.com/FriendsOfUteValleyPark/" class="text-green-600 font-semibold no-underline">Facebook</a>.
            </p>
          </div>
        </div>
        <div class="border-t border-gray-200 pt-16 xl:grid xl:grid-cols-3 xl:gap-x-8">
          <div>
            <img src="~/assets/volunteer-3.jpg" class="object-cover rounded-lg shadow">
          </div>
          <div class="mt-4 sm:mt-8 md:mt-10 md:grid md:grid-cols-2 md:gap-x-8 xl:mt-0 xl:col-span-2">
            <ul class="divide-y divide-gray-200">
              <li class="py-4 flex space-x-3 md:py-0 md:pb-4">
                <svg
                  class="flex-shrink-0 h-6 w-6 text-green-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-base text-gray-500">Volunteer days: the 1st and 3rd Wednesday of every month, 5:30 – 7:30 p.m. April through September.</span>
              </li>
              <li class="py-4 flex space-x-3">
                <svg
                  class="flex-shrink-0 h-6 w-6 text-green-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-base text-gray-500">Crew leaders schedule additional volunteer days. Check the FUVP <a href="https://www.facebook.com/FriendsOfUteValleyPark/" class="text-green-600 font-semibold no-underline">Facebook</a> page for volunteer opportunities, meeting locations and updates.</span>
              </li>
            </ul>
            <ul class="border-t border-gray-200 divide-y divide-gray-200 md:border-t-0">
              <li class="py-4 flex space-x-3 md:border-t-0 md:py-0 md:pb-4">
                <svg
                  class="flex-shrink-0 h-6 w-6 text-green-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-base text-gray-500">Volunteer and get a free water bottle and T-shirt! After 4 hours of volunteer work you’ll receive a Friends of Ute Valley Park logo t-shirt and water bottle. <span class="text-grey-600 text-sm">Limit 1 water bottle and t-shirt per volunteer. </span></span>
              </li>
              <li class="py-4 flex space-x-3">
                <svg
                  class="flex-shrink-0 h-6 w-6 text-green-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-base text-gray-500">All tools provided</span>
              </li>
              <li class="py-4 flex space-x-3">
                <svg
                  class="flex-shrink-0 h-6 w-6 text-green-600"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-base text-gray-500">Please wear closed toed shoes</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <contact-form default-option="Volunteer">
      <template #title>
        Contact us for more information!
      </template>
      <template #subtitle>
        Help make Ute Valley Park better by volunteering.
      </template>
    </contact-form>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Volunteer'
  }
}
</script>
