<template>
  <div v-if="hasUpcomingVolunteerEvent" class="mb-2">
    <div class="bg-teal-900">
      <div class="p-2 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex-1 flex items-center">
            <span class="flex p-1 rounded-lg bg-teal-800">
              <MegaphoneIcon class="h-6 w-6 text-white" />
            </span>
            <p class="ml-3 text-teal-50 text-sm font-medium">
              Upcoming volunteer
              <span class="font-semibold">{{ eventDates }}!</span>
              <span class="inline-block sm:ml-2 sm:inline-block">
                <a href="/volunteer" class="text-teal-200 font-bold underline"> Learn More <span aria-hidden="true">&rarr;</span> </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mb-2">
    <div class="bg-green-900">
      <div class="p-2 mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex-1 flex items-center">
            <span class="flex p-1 rounded-lg bg-green-800">
              <BellIcon class="w-6 h-6 text-white" />
            </span>
            <p class="ml-3 text-green-50 text-sm font-medium">
              {{ leavenotrace[0].text }}
              <span class="inline-block sm:ml-2 sm:inline-block">
                <a :href="leavenotrace[0].link" class="text-green-200 font-bold underline"> Learn More <span aria-hidden="true">&rarr;</span> </a>
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, PropType } from 'vue';
import { MegaphoneIcon, BellIcon } from '@heroicons/vue/24/outline/esm/index.js';

interface Event {
  date: Date;
}

const props = defineProps({
  events: {
    type: Array as PropType<Array<Event>>,
    default: () => [],
  },
});
const leavenotrace = [
  {
    text: 'Reminder! Dogs must be leashed in Ute Valley Park at all times.  Find a nearby off-leash park.',
    link: '/leavenotrace/dogs',
  },
];

const hasUpcomingVolunteerEvent = computed(() => {
  if (props.events === undefined) return false;
  return props.events.length > 0;
});

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
});
</script>
