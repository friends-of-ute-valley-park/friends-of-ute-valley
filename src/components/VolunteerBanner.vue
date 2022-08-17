<template>
  <div class="mb-8" v-if="hasUpcomingVolunteerEvent">
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="p-2 rounded-lg bg-teal-700 shadow-lg sm:p-3">
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-teal-800">
              <SpeakerphoneIcon class="h-6 w-6 text-white" />
            </span>
            <p class="ml-3 font-medium text-white">
              Upcoming volunteer
              <span class="font-semibold">{{ eventDates }}!</span>
              <span class="block sm:ml-2 sm:inline-block">
                <a href="/volunteer" class="text-white font-bold underline"> Learn More <span
                    aria-hidden="true">&rarr;</span> </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
      <div class="p-2 rounded-lg bg-green-700 shadow-lg sm:p-3">
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex-1 flex items-center">
            <span class="flex p-2 rounded-lg bg-green-800">
              <BellIcon class="w-8 h-8 text-white" />
            </span>
            <p class="ml-3 font-medium text-white">
              {{ leavenotrace[0].text }}
              <span class="block sm:ml-2 sm:inline-block">
                <a :href="leavenotrace[0].link" class="text-white font-bold underline"> Learn More <span
                    aria-hidden="true">&rarr;</span> </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/// <reference path="../../node_modules/astro/dist/types/@types/astro.d.ts" />
import { computed } from "vue"
import { endOfDay, isFuture } from 'date-fns'
import { SpeakerphoneIcon, BellIcon } from '@heroicons/vue/outline/esm/index.js'

const props = defineProps({
  events: {
    type: Array<Record<string, any>>
  }
})
const leavenotrace = [
  {
    text: 'Reminder! Dogs must be leashed in Ute Valley Park at all times.  Find a nearby off-leash park.',
    link: '/leavenotrace/dogs'
  },
]

const hasUpcomingVolunteerEvent = computed(() => {
  if (props.events === undefined) return false;
  const anyEvents = props.events.length > 0;
  if (!anyEvents) return false;

  for (const event of props.events) {
    if (isFuture(endOfDay(new Date(event.date)))) return true;
  }
  return false;
})

const eventDates = computed(() => {
  if (props.events === undefined) {
    return;
  }

  let dateString = 'day' + (props.events.length > 1 ? 's' : '') + ' on ';

  dateString += [...props.events]
    .sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    })
    .map((item) => {
      return new Intl.DateTimeFormat('en-US').format(new Date(item.date));
    })
    .join(' and ');
  return dateString;
})
</script>
